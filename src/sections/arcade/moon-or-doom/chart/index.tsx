import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import dayjs from "dayjs";
import { useDebounceFn, useThrottleEffect } from "ahooks";
import { numberFormatter } from "@/utils/number-formatter";

interface PricePoint {
    time: Date;
    price: number;
}

const PRICE_STEP = 0.5;
export default function Chart({ bet, list = [], betList = [], handleBet, betLoading, userBet, winObj, allTimePrice }: { bet: number, list: any[], betList: any[], handleBet: (bet: any) => void, betLoading: boolean, userBet: any, winObj: any, allTimePrice: any }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const chartGroupRef = useRef<SVGGElement>(null);
    const xAxisRef = useRef<SVGSVGElement>(null);
    const yAxisRef = useRef<SVGSVGElement>(null);
    const [translation, setTranslation] = useState<{ x: number; y: number } | null>(null);
    const translationRef = useRef<{ x: number; y: number } | null>(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [chartContainerHeight, setChartContainerHeight] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);
    const isDraggingRef = useRef(false);
    const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
    const lastPriceRef = useRef<number | null>(null);
    const dragEndTimeRef = useRef<number>(Date.now());
    const previousPathLengthRef = useRef<number | null>(null);
    const previousPointRef = useRef<{ x: number; y: number; t: number } | null>(null);
    const previousLabelPositionRef = useRef<{ x: number; y: number; t: number } | null>(null);
    const configRef = useRef<any>(null);
    const betRef = useRef<any>(null);
    const userBetRef = useRef<any>(null);
    const winObjRef = useRef<any>({});
    const isScrollRef = useRef(false);

    const [gridNumber, setGridNumber] = useState(16);

    const gridCellSize = useMemo(() => {
        const chartGroup = d3.select(chartGroupRef.current);
        const futureGrid = chartGroup.select('.future-grid');
        if (futureGrid.size() > 0) {
            futureGrid.selectAll('rect').remove();
            chartGroup.select('.future-grid').selectAll('.' + 'bet-text').remove();
            chartGroup.select('.future-grid').selectAll('.' + 'bet-number').remove();
        }

        let _gridCellSize = containerSize.width / gridNumber;
        

        return Math.max(60, _gridCellSize);
    }, [containerSize, gridNumber]);

    const handleWheel = useCallback((event: WheelEvent) => {
        event.preventDefault();
        const delta = event.deltaY > 0 ? 1 : -1;
       
        isScrollRef.current = true;

        const newY = (translationRef.current?.y ?? 0) + delta * gridCellSize;

        const minY = Math.min(0, -(configRef.current?.plotHeight - configRef.current?.viewportHeight));
        const finalY = Math.max(minY, Math.min(0, newY));

        updateTranslation({
            x: translationRef.current?.x ?? 0,
            y: finalY,
        })


    }, [gridCellSize]);

    const { run: debouncedHandleWheel } = useDebounceFn(handleWheel, {
        wait: 100,
    });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('wheel', debouncedHandleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', debouncedHandleWheel);
        };
    }, [debouncedHandleWheel]);


    useEffect(() => {
        userBetRef.current = userBet;
    }, [userBet]);

    useEffect(() => {
        winObjRef.current = winObj;
    }, [winObj]);

    const updateTranslation = (tr: { x: number; y: number }) => {
        translationRef.current = tr;
        setTranslation(tr);
    };

    const updateSize = () => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setContainerSize({ width: rect.width, height: rect.height });
        }
    };

    const { run: debouncedUpdateSize } = useDebounceFn(updateSize, {
        wait: 150,
    });

    useEffect(() => {
        updateSize();
        window.addEventListener('resize', debouncedUpdateSize);
        return () => {
            window.removeEventListener('resize', debouncedUpdateSize);
        };
    }, [debouncedUpdateSize]);

    useEffect(() => {
        const updateChartContainerHeight = () => {
            if (containerRef.current) {
                const height = containerRef.current.getBoundingClientRect().height;
                setChartContainerHeight(height);
            }
        };

        updateChartContainerHeight();
        window.addEventListener('resize', updateChartContainerHeight);
        return () => window.removeEventListener('resize', updateChartContainerHeight);
    }, []);

    const [startTime, setStartTime] = useState(() => {
        const now = dayjs().subtract(2, 'minute');
        const seconds = Math.floor(now.second() / 10) * 10;
        return now.second(seconds).millisecond(0);
    });

    const [endTime, setEndTime] = useState(dayjs().add(5, 'minute').second(0).millisecond(0));

    useEffect(() => {
        const timer = setInterval(() => {
            setEndTime(dayjs(configRef.current?.endTime).add(60, 'second'));
        }, 60 * 1000);
        return () => clearInterval(timer);
    }, []);

    const config = useMemo(() => {
        const viewportWidth = containerSize.width || 800;
        const viewportHeight = containerSize.height || 500;

        // const gridCellSize = (chartContainerHeight) / 16;
        // const gridCellSize = (viewportWidth) / 13;
        const pixelsPerSecond = gridCellSize / 5;
        const pixelsPerUnit = gridCellSize / PRICE_STEP;

        const timeRange = endTime.diff(startTime, 'second');
        const chartWidth = timeRange * pixelsPerSecond;

        const chartHeight = PRICE_STEP * 16 * pixelsPerUnit;

        const marginLeft = 0;
        const marginRight = 0;
        const marginTop = 0;
        const marginBottom = 0;

        const plotWidth = chartWidth;
        const plotHeight = chartHeight;

        const svgWidth = plotWidth;
        const svgHeight = plotHeight;

        const lastPrice = list.length > 0 ? Number(list[list.length - 1].price) : 0;
        let priceMin = 0;
        let priceMax = 0;
        if (configRef.current && lastPrice > configRef.current.priceMin && lastPrice < configRef.current.priceMax) {
            priceMin = configRef.current.priceMin;
            priceMax = configRef.current.priceMax;
        } else {
            priceMin = Math.floor((lastPrice - PRICE_STEP * 8));
            priceMax = priceMin + PRICE_STEP * 16;
        }

        return {
            viewportWidth,
            viewportHeight,
            chartWidth,
            chartHeight,
            marginLeft,
            marginRight,
            marginTop,
            marginBottom,
            plotWidth,
            plotHeight,
            svgWidth,
            svgHeight,
            startTime,
            endTime,
            priceMin,
            priceMax,
            gridCellSize,
            disabled: list.length === 0,
        };
    }, [containerSize, startTime, endTime, list, chartContainerHeight, gridCellSize]);

    const initialHistoricalData = useMemo(() => {
        const data: PricePoint[] = [];
        list.forEach(item => {
            data.push({
                time: dayjs(item.time).toDate(),
                price: Number(item.price),
            })
        })

        if (list.length > 0) {
            lastPriceRef.current = Number(list[list.length - 1].price);
        }
        return data;
    }, [list]);

    useEffect(() => {
        if (!containerRef.current || !svgRef.current || !chartGroupRef.current || configRef.current?.disabled) return;
        if (translationRef.current === null) return;

        const chartGroup = d3.select(chartGroupRef.current);


        const hasStaticElements = !chartGroup.select('.drag-background').empty() &&
            !chartGroup.select('.grid').empty();

        if (!hasStaticElements || !isInitialized) {
            chartGroup.select('.future-grid').remove();

            const xScale = d3.scaleTime()
                .domain([configRef.current?.startTime.toDate(), configRef.current?.endTime.toDate()])
                .range([0, configRef.current?.plotWidth]);

            const yScale = d3.scaleLinear()
                .domain([configRef.current?.priceMin, configRef.current?.priceMax])
                .range([config.plotHeight, 0]);


            const initNow = dayjs().add(5, 'second');
            const futureGridGroup = chartGroup.append('g').attr('class', 'future-grid');

            futureGridGroup.append('g')
                .style('display', 'none')
                .style('pointer-events', 'none')
                .attr('class', 'shot-icon')
                .append('path')
                .attr('d', 'M20.0371 0C20.8069 0 21.4373 0.719787 21.4375 1.59961V2.78223C25.5402 3.10292 29.3924 4.88316 32.2959 7.7998C33.8833 9.37856 35.1468 11.2531 36.0137 13.3174C36.7151 14.9973 37.151 16.7761 37.3076 18.5898H38.4404C39.3003 18.5899 40 19.2202 40 19.9902C39.9995 20.1362 39.9765 20.2813 39.9307 20.4199C39.7907 20.9748 39.2805 21.3944 38.6807 21.3945H37.3027C37.1728 23.282 36.7181 25.1124 35.9883 26.8623C35.1196 28.9255 33.8572 30.7999 32.2715 32.3799C30.6937 33.9673 28.82 35.2305 26.7568 36.0977C25.0623 36.8055 23.2675 37.244 21.4375 37.3975V38.375C21.4436 38.6553 21.3782 38.9324 21.248 39.1807C21.1178 39.429 20.9265 39.6406 20.6924 39.7949C20.4925 39.9248 20.2577 39.9999 20.0029 40C19.3931 40 18.8781 39.5651 18.748 38.9902C18.6831 38.8003 18.6426 38.5952 18.6426 38.3828V37.3828C14.5234 37.0713 10.6535 35.2885 7.73926 32.3604C6.13955 30.7655 4.89735 28.9176 4.02246 26.8428C3.29255 25.0978 2.8569 23.277 2.71191 21.3945H1.60938C1.51462 21.3945 1.41986 21.3851 1.33008 21.3701H1.29492C1.04717 21.3725 0.803866 21.3028 0.594727 21.1699C0.385653 21.0371 0.21931 20.8464 0.116211 20.6211C0.0131834 20.3959 -0.0224439 20.1454 0.0136719 19.9004C0.0498219 19.6553 0.156606 19.4262 0.320312 19.2402C0.468026 19.0388 0.66136 18.8754 0.884766 18.7637C1.10812 18.652 1.3548 18.595 1.60449 18.5977H2.72168C2.86838 16.7814 3.30563 15 4.0166 13.3223C5.7812 9.15711 9.09556 5.84044 13.2588 4.07227C14.9713 3.35517 16.787 2.91487 18.6377 2.76758V1.59961C18.6379 0.719973 19.2675 0.000304008 20.0371 0ZM21.502 7.76953C21.502 8.68186 20.8527 9.43233 20.0605 9.43262C19.2681 9.43262 18.6182 8.68453 18.6182 7.76953V5C15.1402 5.32259 11.8816 6.84306 9.40039 9.30176C6.91922 11.7605 5.36928 15.0053 5.01465 18.4805H8.0791C8.94381 18.4805 9.65111 19.1348 9.65137 19.9346C9.65137 20.7345 8.94396 21.3896 8.0791 21.3896H5.00391C5.33322 24.8887 6.87407 28.1638 9.35938 30.6484C11.8446 33.133 15.1195 34.6719 18.6182 35V32.0947C18.6183 31.1824 19.2657 30.4326 20.0605 30.4326C20.8527 30.4329 21.5018 31.18 21.502 32.0947V34.9902C24.9799 34.641 28.2289 33.0933 30.6914 30.6123C33.1539 28.1312 34.6775 24.8705 35.001 21.3896H31.8838C30.9989 21.3896 30.2793 20.7346 30.2793 19.9346C30.2796 19.1348 31.0041 18.4805 31.8838 18.4805H34.9912C34.6387 15.0238 33.104 11.7939 30.6465 9.33789C28.189 6.88196 24.9584 5.34996 21.502 5V7.76953ZM19.79 15C21.0596 15 22.2771 15.5045 23.1748 16.4023C24.0724 17.3001 24.577 18.5175 24.5771 19.7871C24.5771 21.0568 24.0725 22.275 23.1748 23.1729C22.2771 24.0706 21.0596 24.5752 19.79 24.5752C18.5205 24.5752 17.303 24.0706 16.4053 23.1729C15.5076 22.275 15.0029 21.0568 15.0029 19.7871C15.003 18.5175 15.5076 17.3001 16.4053 16.4023C17.303 15.5045 18.5205 15 19.79 15ZM19.79 17.6621C19.2272 17.6621 18.6871 17.8861 18.2891 18.2842C17.8912 18.6822 17.668 19.2223 17.668 19.7852C17.668 20.348 17.8911 20.8881 18.2891 21.2861C18.6871 21.6842 19.2272 21.9072 19.79 21.9072C20.3529 21.9072 20.893 21.6842 21.291 21.2861C21.689 20.8881 21.9121 20.348 21.9121 19.7852C21.9121 19.2223 21.6889 18.6822 21.291 18.2842C20.893 17.8861 20.3529 17.6621 19.79 17.6621Z')
                .attr('fill', '#31FFA6')
                .style('pointer-events', 'none')

            let gridTime = configRef.current?.startTime;
            while (gridTime.isBefore(configRef.current?.endTime)) {
                const nextGridTime = gridTime.add(5, 'second');
                const x1 = Math.max(0, xScale(gridTime.toDate()));
                const x2 = Math.min(configRef.current?.plotWidth, xScale(nextGridTime.toDate()));

                if (x1 < configRef.current?.plotWidth && x2 > 0) {
                    const isPast = gridTime.isBefore(initNow);

                    for (let price = configRef.current?.priceMin; price < configRef.current?.priceMax; price += PRICE_STEP) {
                        const y1 = yScale(price);
                        const y2 = yScale(price + PRICE_STEP);

                        createGridRect(futureGridGroup as any, x1, x2, y1, y2, gridTime, price, isPast, !isPast);
                    }
                }

                gridTime = nextGridTime;
            }

            setIsInitialized(true);
        }

        const currentTranslation = translationRef.current || { x: 0, y: 0 };
        chartGroup.attr('transform', `translate(${currentTranslation.x}, ${currentTranslation.y})`);

        if (chartGroup.select('.line-group').empty()) {
            chartGroup.append('g').attr('class', 'line-group');
        }
        if (chartGroup.select('.point-group').empty()) {
            chartGroup.append('g').attr('class', 'point-group');
        }

        return () => {
            if (clickTimerRef.current) {
                clearTimeout(clickTimerRef.current);
                clickTimerRef.current = null;
            }
        };
    }, [isInitialized]);

    useEffect(() => {
        configRef.current = config;
    }, [config]);

    useEffect(() => {
        if (betList.length > 0) {
            const betObj: any = {}
            betList.forEach(bet => {
                bet.bets.forEach((betItem: any) => {
                    betObj[bet.start_time + '-' + betItem.min_price] = betItem.multiplier;
                });
            });
            betRef.current = betObj;
        }
    }, [betList]);

    const createGridRect = (
        futureGridGroup: d3.Selection<d3.BaseType, unknown, null, undefined>,
        x1: number,
        x2: number,
        y1: number,
        y2: number,
        gridTime: dayjs.Dayjs,
        price: number,
        isPast: boolean,
        includeMousedown?: boolean
    ) => {
        const baseOpacity = isPast ? 0.08 : 0.25;
        const strokeOpacity = isPast ? 0.15 : 0.4;

        const rect = futureGridGroup.append('rect')
            .attr('x', x1)
            .attr('y', y2)
            .attr('width', x2 - x1)
            .attr('height', y1 - y2)
            .attr('rx', 8)
            .attr('ry', 8)
            .attr('fill', `rgba(131, 110, 249, ${baseOpacity})`)
            .attr('stroke', `rgba(131, 110, 249, ${strokeOpacity})`)
            .attr('stroke-width', 1)
            .attr('cursor', 'pointer')
            .style('pointer-events', 'all');

        (rect.node() as any).__gridTime__ = gridTime.format('HH:mm:ss');
        (rect.node() as any).__gridPrice__ = price;
        (rect.node() as any).__isPast__ = isPast;


        rect
            .on('mouseenter', function (event) {
                const isPastRect = (this as any).__isPast__;
                const gridTime = (this as any).__gridTime__;
                const price = (this as any).__gridPrice__;

                const [hours, minutes, seconds] = gridTime.split(':').map(Number);
                const fullGridTime = dayjs(configRef.current?.startTime)
                    .hour(hours)
                    .minute(minutes)
                    .second(seconds)
                    .millisecond(0);

                d3.select(this).attr('data-key', gridTime + '-' + (price));
                const betMultiplier = betRef.current?.[fullGridTime.valueOf() + '-' + (price)];
                const userBet = userBetRef.current?.[fullGridTime.valueOf() + '-' + (price)];

                if (!isDraggingRef.current && !isPastRect && betMultiplier > 0 && !userBet) {
                    const elem = event.currentTarget as SVGRectElement;
                    if (betMultiplier && !userBet) {
                        d3.select(elem)
                            .attr('fill', `#000000`)
                            .attr('stroke', `#31FFA6`);

                        showShotIcon(this as SVGRectElement);

                        (rect.node() as any).__isHover__ = true;
                    }
                } else {
                    d3.select('.shot-icon').style('display', 'none');
                    (rect.node() as any).__isHover__ = false;
                }
            })
            .on('mouseleave', function (event) {
                const isPastRect = (this as any).__isPast__;
                (rect.node() as any).__isHover__ = false;
                const price = (this as any).__gridPrice__;
                const gridTime = (this as any).__gridTime__;

                const [hours, minutes, seconds] = gridTime.split(':').map(Number);
                const fullGridTime = dayjs(configRef.current?.startTime)
                    .hour(hours)
                    .minute(minutes)
                    .second(seconds)
                    .millisecond(0);

                if (isPastRect) return;

                if (betRef.current?.[fullGridTime.valueOf() + '-' + (price)]) {
                    const elem = event.currentTarget as SVGRectElement;
                    const baseFill = 0.25;
                    const baseStroke = 0.4;
                    d3.select(elem)
                        .attr('fill', `rgba(131, 110, 249, ${baseFill})`)
                        .attr('stroke', `rgba(131, 110, 249, ${baseStroke})`);
                }
            });

        if (includeMousedown) {
            rect.attr('data-mousedown', 'true');
            rect.on('mousedown', function (event) {
                const isPastRect = (this as any).__isPast__;
                const gridTime = (this as any).__gridTime__;
                const price = (this as any).__gridPrice__;

                const [hours, minutes, seconds] = gridTime.split(':').map(Number);
                const fullGridTime = dayjs(configRef.current?.startTime)
                    .hour(hours)
                    .minute(minutes)
                    .second(seconds)
                    .millisecond(0);
                const betMultiplier = betRef.current?.[fullGridTime.valueOf() + '-' + (price)];


                if (!isPastRect && betMultiplier > 0) {
                    handleBet({
                        minPrice: (price).toString(),
                        multiplier: betMultiplier.toString(),
                        startTime: fullGridTime.valueOf()
                    })
                }
            });
        }

        return rect;
    };

    const showShotIcon = (rectElement: SVGRectElement) => {
        const x1 = Number(d3.select(rectElement).attr('x'));
        const x2 = Number(d3.select(rectElement).attr('x')) + configRef.current?.gridCellSize;
        const y1 = Number(d3.select(rectElement).attr('y'));
        const y2 = Number(d3.select(rectElement).attr('y')) + configRef.current?.gridCellSize;
        const centerX = x1 + (x2 - x1 - 40) / 2;
        const centerY = y2 + (y1 - y2 - 40) / 2;
        const shotIcon = d3.select('.shot-icon');
        shotIcon
            .attr('transform', `translate(${centerX}, ${centerY})`)
            .style('display', null);

        const node = shotIcon.node();
        if (node && (node as any).parentNode) {
            (node as any).parentNode.appendChild(node);
        }
    };

    useEffect(() => {
        if (!chartGroupRef.current || !translation || configRef.current?.disabled) return;
        const chartGroup = d3.select(chartGroupRef.current);
        chartGroup.attr('transform', `translate(${translation.x}, ${translation.y})`)
            // .transition()
            // .duration(300)
            // .ease(d3.easeCubicOut)
            // .attr('transform', `translate(${translation.x}, ${translation.y})`);
    }, [translation]);

    useThrottleEffect(() => {
        if (!containerRef.current || !xAxisRef.current || !yAxisRef.current || configRef.current?.disabled) return;
        if (translation === null) return;

        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        const xAxisSVG = xAxisRef.current;
        const yAxisSVG = yAxisRef.current;

        if (!xAxisSVG || !yAxisSVG) return;

        const xAxisGroup = d3.select(xAxisSVG);
        const yAxisGroup = d3.select(yAxisSVG);

        xAxisGroup.selectAll("*").remove();
        yAxisGroup.selectAll("*").remove();

        const currentTranslation = (isDraggingRef.current && translationRef.current)
            ? translationRef.current
            : (translation || { x: 0, y: 0 });
        const visibleXStart = -currentTranslation.x;
        const visibleXEnd = visibleXStart + containerRect.width;
        const visibleYStart = -currentTranslation.y;
        const visibleYEnd = visibleYStart + containerRect.height;

        const xScale = d3.scaleTime()
            .domain([configRef.current?.startTime.toDate(), configRef.current?.endTime.toDate()])
            .range([0, configRef.current?.plotWidth]);

        const yScale = d3.scaleLinear()
            .domain([configRef.current?.priceMin, configRef.current?.priceMax])
            .range([configRef.current?.plotHeight, 0]);

        const xAxisTicks = [];
        let time = configRef.current?.startTime;
        while (time.isBefore(configRef.current?.endTime)) {
            const xPos = xScale(time.toDate());
            if (xPos >= visibleXStart - 100 && xPos <= visibleXEnd + 100) {
                xAxisTicks.push({ time: time.toDate(), x: xPos });
            }
            time = time.add(5, 'second');
        }

        xAxisGroup.selectAll('.tick')
            .data(xAxisTicks)
            .enter()
            .append('text')
            .attr('class', 'tick')
            .attr('x', d => {
                const chartX = d.x + currentTranslation.x;
                return chartX;
            })
            .attr('y', 10)
            .attr('fill', '#ffffff')
            .attr('font-size', '10px')
            .attr('text-anchor', 'middle')
            .text(d => dayjs(d.time).format('HH:mm:ss'));

        const yAxisTicks = [];
        for (let price = configRef.current?.priceMin; price <= configRef.current?.priceMax; price += PRICE_STEP) {
            const yPos = yScale(price);
            if (yPos >= visibleYStart - 50 && yPos <= visibleYEnd + 50) {
                yAxisTicks.push({ price, y: yPos });
            }
        }

        yAxisGroup.selectAll('.tick')
            .data(yAxisTicks)
            .enter()
            .append('text')
            .attr('class', 'tick')
            .attr('x', 10)
            .attr('y', d => {
                const chartY = d.y + currentTranslation.y;
                return chartY + 5;
            })
            .attr('fill', '#ffffff')
            .attr('font-size', '10px')
            .attr('text-anchor', 'start')
            .text(d => numberFormatter(d.price, 1, true));

    }, [translation, containerSize], {
        wait: 50,
    });

    useThrottleEffect(() => {
        if (!chartGroupRef.current || !initialHistoricalData.length) return;
        if (translationRef.current === null) return;

        const chartGroup = d3.select(chartGroupRef.current);

        const xScale = d3.scaleTime()
            .domain([configRef.current?.startTime.toDate(), configRef.current?.endTime.toDate()])
            .range([0, configRef.current?.plotWidth]);

        const yScale = d3.scaleLinear()
            .domain([configRef.current?.priceMin, configRef.current?.priceMax])
            .range([configRef.current?.plotHeight, 0]);

        const lineGroup = chartGroup.select('.line-group');
        const pointGroup = chartGroup.select('.point-group');

        const now = dayjs().add(5, 'second');

        const pastData = initialHistoricalData

        if (pastData.length > 0) {
            const line = d3.line<PricePoint>()
                .x(d => xScale(d.time))
                .y(d => yScale(d.price))
                .curve(d3.curveMonotoneX);

            const pathData = line(pastData);

            if (pathData) {
                const pathSelection = lineGroup.selectAll<SVGPathElement, PricePoint[]>('path.line-path')
                    .data([pastData]);

                pathSelection.enter()
                    .append('path')
                    .attr('class', 'line-path')
                    .attr('fill', 'none')
                    .attr('stroke', '#836EF9')
                    .attr('stroke-width', 1)
                    .style('pointer-events', 'none')
                    .merge(pathSelection)
                    .attr('d', pathData)
                    .each(function () {
                        try {
                            const pathEl = this as SVGPathElement;
                            const newLength = pathEl.getTotalLength();
                            const prevLength = previousPathLengthRef.current ?? newLength;
                            if (newLength > prevLength + 0.5) {
                                d3.select(pathEl)
                                    .attr('stroke-dasharray', newLength)
                                    .attr('stroke-dashoffset', newLength - prevLength)
                                    .transition()
                                    .duration(500)
                                    .ease(d3.easeCubicOut)
                                    .attr('stroke-dashoffset', 0);
                            }
                            previousPathLengthRef.current = newLength;
                        } catch (_) {
                            previousPathLengthRef.current = null;
                        }
                    });

                pathSelection.exit().remove();
            }

            const lastPoint = pastData[pastData.length - 1];
            const pointX = xScale(lastPoint.time);
            const pointY = yScale(lastPoint.price);

            const pointData = [{ cx: pointX, cy: pointY, r: 18, fill: '#836EF9', opacity: 0.3 },
            { cx: pointX, cy: pointY, r: 12, fill: '#836EF9', opacity: 0.5 },
            { cx: pointX, cy: pointY, r: 9, fill: '#ffffff', opacity: 1 }];

            const circleSelection = pointGroup.selectAll<SVGCircleElement, typeof pointData[0]>('circle')
                .data(pointData, (d, i) => `circle-${i}`);

            const prevInfo = previousPointRef.current;
            const enterSel = circleSelection.enter()
                .append('circle')
                .attr('fill', d => d.fill)
                .attr('r', d => d.r)
                .attr('opacity', d => d.opacity)
                .attr('cx', d => (prevInfo ? prevInfo.x : d.cx))
                .attr('cy', d => (prevInfo ? prevInfo.y : d.cy));

            const mergedSel = enterSel.merge(circleSelection as any);

            const isNewPoint = (() => {
                const t = dayjs(lastPoint.time).valueOf();
                const prev = previousPointRef.current;
                const prevT = prev?.t ?? null;
                return prevT === null || t !== prevT;
            })();

            mergedSel
                .attr('r', d => d.r)
                .attr('opacity', d => d.opacity);

            mergedSel
                .transition()
                .duration(isNewPoint ? 500 : 400)
                .ease(d3.easeCubicOut)
                .attr('cx', d => d.cx)
                .attr('cy', d => d.cy);

            circleSelection.exit().remove();

            previousPointRef.current = { x: pointX, y: pointY, t: dayjs(lastPoint.time).valueOf() };

            const priceText = `$${lastPoint.price.toFixed(2)}`;
            const labelPadding = 8;
            const labelHeight = 24;
            const labelOffsetX = 24;

            let labelGroup = pointGroup.select<SVGGElement>('g.price-label');
            const prevLabelInfo = previousLabelPositionRef.current;
            const isNewLabelPoint = (() => {
                const t = dayjs(lastPoint.time).valueOf();
                const prevT = prevLabelInfo?.t ?? null;
                return prevT === null || t !== prevT;
            })();

            if (labelGroup.empty()) {
                labelGroup = pointGroup.append<SVGGElement>('g')
                    .attr('class', 'price-label');

                labelGroup.append('rect')
                    .attr('class', 'price-label-bg')
                    .attr('rx', 6)
                    .attr('ry', 6)
                    .attr('fill', '#836EF9');

                labelGroup.append('text')
                    .attr('class', 'price-label-text')
                    .attr('fill', '#ffffff')
                    .attr('font-size', '14px')
                    .attr('font-weight', '500')
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'middle');

                if (prevLabelInfo) {
                    labelGroup.attr('transform', `translate(${prevLabelInfo.x}, ${prevLabelInfo.y})`);
                } else {
                    labelGroup.attr('transform', `translate(${pointX + labelOffsetX}, ${pointY})`);
                }
            }

            labelGroup
                .transition()
                .duration(isNewLabelPoint ? 500 : 400)
                .ease(d3.easeCubicOut)
                .attr('transform', `translate(${pointX + labelOffsetX}, ${pointY})`);

            previousLabelPositionRef.current = {
                x: pointX + labelOffsetX,
                y: pointY,
                t: dayjs(lastPoint.time).valueOf()
            };

            const labelText = labelGroup.select('.price-label-text')
                .text(priceText);

            const textBBox = (labelText.node() as SVGTextElement)?.getBBox();
            const labelWidth = textBBox && textBBox.width > 0 ? textBBox.width + labelPadding * 2 : 100;

            labelGroup.select('.price-label-bg')
                .attr('x', -labelPadding)
                .attr('y', -labelHeight / 2)
                .attr('width', labelWidth)
                .attr('height', labelHeight);

            labelGroup.select('.price-label-text')
                .attr('x', labelWidth / 2 - labelPadding);
        } else {
            lineGroup.selectAll("*").remove();
            pointGroup.selectAll("*").remove();
        }

        const futureGridGroup = chartGroup.select('.future-grid');
        const allRects = futureGridGroup.selectAll('rect');

        let realNow = dayjs().subtract(120, 'second');
        const seconds = Math.floor(realNow.second() / 10) * 10;
        realNow = realNow.second(seconds).millisecond(0);

        let lastExistingTime: dayjs.Dayjs | null = realNow;
        if (allRects.size() > 0 && configRef.current) {
            const lastRect = allRects.nodes()[allRects.size() - 1] as any;
            const gridTimeStr = lastRect.__gridTime__;
            if (gridTimeStr) {
                const [hours, minutes, seconds] = gridTimeStr.split(':').map(Number);
                lastExistingTime = dayjs(configRef.current.startTime)
                    .hour(hours)
                    .minute(minutes)
                    .second(seconds)
                    .millisecond(0);
            }
        }

        if (lastExistingTime && configRef.current && lastExistingTime.isBefore(configRef.current.endTime)) {
            let gridTime = lastExistingTime.add(5, 'second');
            while (gridTime.isBefore(configRef.current.endTime)) {
                const nextGridTime = gridTime.add(5, 'second');
                const x1 = Math.max(0, xScale(gridTime.toDate()));
                const x2 = Math.min(configRef.current.plotWidth, xScale(nextGridTime.toDate()));

                if (x1 < configRef.current.plotWidth && x2 > 0) {
                    const isPast = gridTime.isBefore(now) || gridTime.isSame(now, 'second');

                    for (let price = configRef.current.priceMin; price <= configRef.current.priceMax; price += PRICE_STEP) {
                        const y1 = yScale(price);
                        const y2 = yScale(price + PRICE_STEP);

                        createGridRect(futureGridGroup, x1, x2, y1, y2, gridTime, price, isPast, !isPast);
                    }
                }

                gridTime = nextGridTime;
            }
        }

        const futureGridRectsForCleanup = chartGroup.select('.future-grid').selectAll('rect');
        futureGridRectsForCleanup.each(function () {
            const gridTimeStr = (this as any).__gridTime__;
            const gridPrice = (this as any).__gridPrice__;
            const beforeCleanTime = dayjs().subtract(60, 'second');
            if (gridTimeStr && beforeCleanTime) {
                const [hours, minutes, seconds] = gridTimeStr.split(':').map(Number);
                const fullGridTime = dayjs(configRef.current.startTime)
                    .hour(hours)
                    .minute(minutes)
                    .second(seconds)
                    .millisecond(0);

                if (beforeCleanTime.isAfter(fullGridTime)) {
                    const key = fullGridTime.valueOf() + '-' + gridPrice;
                    const className = ('bet-text-' + key).replace('.', '-');

                    const betText = chartGroup.select('.future-grid').select('.' + className);
                    if (!betText.empty()) {
                        betText.remove();
                    }

                    const betNumber = chartGroup.select('.future-grid').select('.' + className + '-bet-number');
                    if (!betNumber.empty()) {
                        betNumber.remove();
                    }

                    d3.select(this).remove();
                }
            }
        });

        const futureGridRects = chartGroup.select('.future-grid').selectAll('rect');
        chartGroup.select('.future-grid').selectAll('.' + 'bet-text').remove();
        chartGroup.select('.future-grid').selectAll('.' + 'bet-number').remove();
        chartGroup.select('.future-grid').selectAll('rect').style('opacity', 1).style('fill', null);

        futureGridRects.each(function () {
            const gridTimeStr = (this as any).__gridTime__;
            let gridPrice = (this as any).__gridPrice__;
            const isHover = (this as any).__isHover__;

            const rectY1 = Number(d3.select(this).attr('y'));
            if (!isNaN(rectY1)) {
                const calculatedPrice = yScale.invert(rectY1);
                const alignedPrice = Math.floor(calculatedPrice / PRICE_STEP) * PRICE_STEP;
                gridPrice = alignedPrice - PRICE_STEP;
                (this as any).__gridPrice__ = gridPrice;
            }

            if (gridTimeStr) {
                const [hours, minutes, seconds] = gridTimeStr.split(':').map(Number);
                const fullGridTime = dayjs(configRef.current?.startTime)
                    .hour(hours)
                    .minute(minutes)
                    .second(seconds)
                    .millisecond(0);

                const isPast = fullGridTime.isBefore(now) || fullGridTime.isSame(now, 'second');

                const key = fullGridTime.valueOf() + '-' + gridPrice;
                const className = ('bet-text-' + key).replace('.', '-');
                let betText: any = chartGroup.select('.future-grid').select('.' + className);
                const betMultiplier = betRef.current?.[key] ?? 0;

                let baseOpacity = 0.25;
                let strokeOpacity = 0.4;

                if (isPast || !betMultiplier) {
                    baseOpacity = 0.08;
                    strokeOpacity = 0.15;
                }

                // console.log('betText', fullGridTime, key, betText.empty(), betMultiplier);

                if (isHover && !isPast && betMultiplier > 0) {
                    d3.select(this)
                        .attr('fill', `#000000`)
                        .attr('stroke', `#31FFA6`);

                    showShotIcon(this as SVGRectElement);
                } else {
                    if (allTimePrice[fullGridTime.valueOf() + '-' + gridPrice]) {
                        d3.select(this)
                            .attr('fill', `rgba(131, 110, 249, ${baseOpacity})`)
                            .attr('stroke', `rgba(255, 153, 0, 1)`)
                            .attr('filter', 'url(#glow-orange)');
                    } else {
                        d3.select(this)
                            .attr('filter', 'none')
                            .attr('fill', `rgba(131, 110, 249, ${baseOpacity})`)
                            .attr('stroke', `rgba(131, 110, 249, ${strokeOpacity})`);
                    }
                }

                if (betText.empty() && betMultiplier > 0) {
                    const padding = 8;
                    betText = chartGroup.select('.future-grid').append<SVGTextElement>('text')
                        .attr('class', className + ' bet-text')
                        .attr('x', Number(d3.select(this).attr('x')) + configRef.current?.gridCellSize - padding)
                        .attr('y', Number(d3.select(this).attr('y')) + configRef.current?.gridCellSize - padding)
                        .attr('fill', '#fff')
                        .attr('font-size', '12px')
                        .attr('font-weight', '500')
                        .attr('text-anchor', 'end')
                } 

                if (betMultiplier > 0 && !betText.empty() && (!isPast || userBetRef.current?.[key])) {
                    betText.text(betMultiplier + 'x');
                }

                let betNumber: any = chartGroup.select('.future-grid').select('.' + className + '-bet-number');

                if (betNumber.empty() && userBetRef.current?.[key]) {
                    betNumber = chartGroup.select('.future-grid').append<SVGTextElement>('text')
                        .attr('class', className + '-bet-number bet-number')
                        .attr('x', Number(d3.select(this).attr('x')) + configRef.current?.gridCellSize / 2)
                        .attr('y', Number(d3.select(this).attr('y')) + configRef.current?.gridCellSize / 2)
                        .attr('fill', '#000')
                        .attr('font-size', '12px')
                        .attr('font-weight', '500')
                        .attr('text-anchor', 'middle')
                        .text(userBetRef.current?.[key]?.betAmount + ' MON');

                    d3.select(this).style('fill', '#31FFA6');

                    if (!betText.empty()) {
                        betText.style('fill', '#000');
                    }
                }

                if (!betNumber.empty() && isPast) {
                    const now = dayjs().subtract(5, 'second');
                    if (now.isAfter(fullGridTime)) {
                        betText.style('opacity', 0.5).style('fill', '#000');
                        betNumber.style('opacity', 0.5);
                        d3.select(this).style('opacity', 0.5).style('fill', '#727D97');
                    }

                    if (winObjRef.current?.[key]) {
                        d3.select(this).style('fill', '#31FFA6');
                    }
                }

                (this as any).__isPast__ = isPast;
            }
        });

    }, [initialHistoricalData], {
        wait: 500
    });

    useEffect(() => {
        if (isInitialized || !containerRef.current || !initialHistoricalData.length || configRef.current?.disabled) return;
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        const viewportWidth = containerRect.width;
        const viewportHeight = containerRect.height;
        const pastData = initialHistoricalData
        if (pastData.length === 0) {
            setIsInitialized(true);
            updateTranslation({ x: 0, y: 0 });
            return;
        }
        const lastPoint = pastData[pastData.length - 1];
        const xScale = d3.scaleTime()
            .domain([configRef.current?.startTime.toDate(), configRef.current?.endTime.toDate()])
            .range([0, configRef.current?.plotWidth]);
        const yScale = d3.scaleLinear()
            .domain([configRef.current?.priceMin, configRef.current?.priceMax])
            .range([configRef.current?.plotHeight, 0]);
        const currentPointX = xScale(lastPoint.time);
        const currentPointY = yScale(lastPoint.price);
        const centerX = viewportWidth / 2;
        const centerY = viewportHeight / 2;
        const initialX = centerX - currentPointX;
        const initialY = centerY - currentPointY;
        const maxX = 0;
        const minX = Math.min(0, -(configRef.current?.plotWidth - viewportWidth));
        const maxY = 0;
        const minY = Math.min(0, -(configRef.current?.plotHeight - viewportHeight));
        const finalX = Math.max(minX, Math.min(maxX, initialX));
        const finalY = Math.max(minY, Math.min(maxY, initialY));
        const initialTranslation = { x: finalX, y: finalY };
        updateTranslation(initialTranslation);
        setIsInitialized(true);
    }, [initialHistoricalData, isInitialized, containerSize]);

    useEffect(() => {
        const shouldBlock = isDraggingRef.current || (Date.now() - dragEndTimeRef.current < 500);
        if (shouldBlock) return;

        if (!isInitialized || !containerRef.current || configRef.current?.disabled || !chartGroupRef.current) return;

        const animate = () => {
            if (window) {

            }

            const container = containerRef.current;
            if (!container) return;
            const viewportWidth = container.getBoundingClientRect().width;
            const viewportHeight = container.getBoundingClientRect().height;
            const now = dayjs();
            const xScale = d3.scaleTime()
                .domain([configRef.current?.startTime.toDate(), configRef.current?.endTime.toDate()])
                .range([0, configRef.current?.plotWidth]);
            const yScale = d3.scaleLinear()
                .domain([configRef.current?.priceMin, configRef.current?.priceMax])
                .range([configRef.current?.plotHeight, 0]);
            const nowX = xScale(now.toDate());
            const translationX = viewportWidth / 2 - nowX;
            let lastPrice = lastPriceRef.current ?? 0;
            const pointY = yScale(lastPrice);

            const previousY = translationRef.current?.y ?? 0;
            const rectY = pointY + previousY;
            if (isScrollRef.current) {
                updateTranslation({ x: translationX, y: previousY });
            } else {
                if (rectY > 0 && rectY < viewportHeight) {
                    const minY = Math.min(0, -(configRef.current?.plotHeight - viewportHeight));
                    const finalY = Math.max(minY, Math.min(0, previousY));

                    updateTranslation({ x: translationX, y: finalY });
                } else {
                    const centerY = viewportHeight / 2;
                    const initialY = centerY - pointY;
                    const minY = Math.min(0, -(configRef.current?.plotHeight - viewportHeight));
                    const finalY = Math.max(minY, Math.min(0, initialY));
                    updateTranslation({ x: translationX, y: finalY });
                }
            }

            requestAnimationFrame(animate);
        };
        animate();
    }, [isInitialized, containerSize]);


    return (
        <div className="w-[calc(100%-80px)] h-full relative pb-[30px]">
            <div
                ref={containerRef}
                className="border border-[#836EF9] rounded-[6px] bg-balck/30 backdrop-blur-[10px] h-[calc(100%-30px)] relative overflow-hidden"
            >
                <svg
                    ref={svgRef}
                    width={config.svgWidth}
                    height={config.svgHeight}
                    className="absolute"
                    style={{
                        left: 0,
                        top: 0,
                    }}
                >
                    <defs>
                        <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="outerBlur"/>
                            <feMorphology operator="erode" radius="1.5" in="SourceGraphic" result="eroded"/>
                            <feGaussianBlur stdDeviation="2.5" in="eroded" result="innerBlur"/>
                            <feComposite in="innerBlur" in2="SourceAlpha" operator="in" result="innerGlow"/>
                            <feMerge>
                                <feMergeNode in="outerBlur"/>
                                <feMergeNode in="innerGlow"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <g
                        ref={chartGroupRef}
                        style={{ pointerEvents: 'all' }}
                    />

                </svg>
            </div>

            <svg
                ref={xAxisRef}
                className="absolute"
                style={{
                    left: 0,
                    top: '96%',
                    width: 'calc(100% - 10px)',
                    height: '40px',
                    pointerEvents: 'none',
                    overflow: 'hidden'
                }}
            />

            <svg
                ref={yAxisRef}
                className="absolute"
                style={{
                    right: '-80px',
                    top: 0,
                    width: '80px',
                    height: 'calc(100% - 10px)',
                    pointerEvents: 'none',
                    overflow: 'hidden'
                }}
            />
        </div>
    );
}
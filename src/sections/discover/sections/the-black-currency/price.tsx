import useToast from "@/hooks/use-toast";
import { formatTimeAgo } from "@/utils/date";
import { numberFormatter } from "@/utils/number-formatter";
import { formatLongText } from "@/utils/utils";
import Skeleton from "react-loading-skeleton";
import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import clsx from "clsx";
import Big from "big.js";
import { useInterval } from "ahooks";
import dayjs from "dayjs";

const Price = (props: any) => {
  const { token, tokenMarket, marketLoading, tokenPrice, priceLoading } = props;

  const toast = useToast();
  const chartRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dataRef = useRef<Array<{ timestamp: number; price: number }>>([]);
  const lastDataLengthRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<{ price: number; timestamp: number; x: number; y: number } | null>(null);

  const [currentTime, setCurrentTime] = useState(dayjs());
  useInterval(() => {
    setCurrentTime(dayjs());
  }, 60000);

  // Update tooltip visual elements (vertical reference line and data point)
  const updateTooltipElements = (
    chartGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
    x: number,
    y: number,
    chartHeight: number
  ) => {
    // Vertical reference line
    let tooltipLine = chartGroup.select<SVGLineElement>("line.tooltip-line");
    if (tooltipLine.empty()) {
      tooltipLine = chartGroup.append("line").attr("class", "tooltip-line");
    }
    tooltipLine
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", chartHeight)
      .attr("stroke", "rgba(255, 255, 255, 0.3)")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4,4")
      .attr("pointer-events", "none");

    // Data point marker
    let tooltipDot = chartGroup.select<SVGCircleElement>("circle.tooltip-dot");
    if (tooltipDot.empty()) {
      tooltipDot = chartGroup.append("circle").attr("class", "tooltip-dot");
    }
    tooltipDot
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 4)
      .attr("fill", "#836EF9")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("pointer-events", "none");
  };

  // Update chart
  const updateChart = useCallback(() => {
    if (!chartRef.current || !svgRef.current || dataRef.current.length === 0) return;

    const container = chartRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const margin = { top: 20, right: 20, bottom: 30, left: 10 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.attr("width", width).attr("height", height);

    let chartGroup = svg.select<SVGGElement>("g.chart-group");
    if (chartGroup.empty()) {
      chartGroup = svg.append("g").attr("class", "chart-group");
    }

    const data = dataRef.current;

    // Calculate price range
    const prices = data.map((d) => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const padding = priceRange * 0.1 || minPrice * 0.1; // 10% padding

    // Create scales
    const xScale = d3
      .scaleTime()
      .domain([data[0].timestamp, data[data.length - 1].timestamp])
      .range([0, chartWidth]);

    // Create y scale with domain based on actual price range
    const yScale = d3
      .scaleLinear()
      .domain([minPrice - padding, maxPrice + padding])
      .range([chartHeight, 0])
      .nice(); // Use nice() to get round numbers for better tick distribution

    // Apply transform
    chartGroup.attr("transform", `translate(${margin.left},${margin.top})`);

    // Create line generator
    const line = d3
      .line<{ timestamp: number; price: number }>()
      .x((d) => xScale(d.timestamp))
      .y((d) => yScale(d.price))
      .curve(d3.curveMonotoneX);

    // Create area generator (for filling)
    const area = d3
      .area<{ timestamp: number; price: number }>()
      .x((d) => xScale(d.timestamp))
      .y0(chartHeight)
      .y1((d) => yScale(d.price))
      .curve(d3.curveMonotoneX);

    // Draw filled area
    let areaPath = chartGroup.select<SVGPathElement>("path.area");
    if (areaPath.empty()) {
      areaPath = chartGroup.append("path").attr("class", "area");
    }
    areaPath
      .datum(data)
      .attr("fill", "url(#area-gradient)")
      .attr("d", area);

    // Draw line
    let linePath = chartGroup.select<SVGPathElement>("path.line");
    if (linePath.empty()) {
      linePath = chartGroup.append("path").attr("class", "line");
    }
    linePath
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#836EF9")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Create gradient definition (if not exists)
    let defs = svg.select<SVGDefsElement>("defs");
    if (defs.empty()) {
      defs = svg.append("defs");
    }
    let gradient = defs.select<SVGLinearGradientElement>("#area-gradient");
    if (gradient.empty()) {
      gradient = defs
        .append("linearGradient")
        .attr("id", "area-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");
      gradient.append("stop").attr("offset", "0%").attr("stop-color", "#836EF9").attr("stop-opacity", 0.3);
      gradient.append("stop").attr("offset", "100%").attr("stop-color", "#836EF9").attr("stop-opacity", 0);
    }

    // Draw axes (remove tick lines, keep labels only)
    // Calculate appropriate tick interval based on chart width
    // Aim for approximately one tick per 100-150px to avoid overlap
    const targetTickCount = Math.max(3, Math.floor(chartWidth / 120));
    const timeRange = data[data.length - 1].timestamp - data[0].timestamp;
    const timeRangeMinutes = timeRange / (1000 * 60);
    const minutesPerTick = Math.ceil(timeRangeMinutes / targetTickCount);

    // Round to nearest 10, 15, 30, or 60 minutes for cleaner labels
    let tickInterval: number;
    if (minutesPerTick <= 10) {
      tickInterval = 10;
    } else if (minutesPerTick <= 15) {
      tickInterval = 15;
    } else if (minutesPerTick <= 30) {
      tickInterval = 30;
    } else if (minutesPerTick <= 60) {
      tickInterval = 60;
    } else {
      tickInterval = Math.ceil(minutesPerTick / 60) * 60; // Round to nearest hour
    }

    const xAxis = d3.axisBottom(xScale)
      .tickSize(0) // Remove tick lines
      .ticks(d3.timeMinute.every(tickInterval))
      .tickFormat((d) => {
        const date = d as Date;
        return d3.timeFormat("%I:%M %p")(date).replace(/^0/, ""); // Format as "6:00 PM" or "6:10 PM"
      });

    // Generate y-axis ticks based on actual price values
    // Use d3's automatic tick generation but format without toFixed
    let xAxisGroup = chartGroup.select<SVGGElement>("g.x-axis");
    if (xAxisGroup.empty()) {
      xAxisGroup = chartGroup.append("g").attr("class", "x-axis");
    }
    xAxisGroup.attr("transform", `translate(0,${chartHeight})`).call(xAxis);
    xAxisGroup.selectAll("text").attr("fill", "#727D97").attr("font-size", "12px");
    xAxisGroup.selectAll("line").remove(); // Remove tick lines
    xAxisGroup.selectAll("path").remove(); // Remove axis line

    // Y-axis is not displayed

    // Create transparent overlay for mouse movement detection
    let overlay = chartGroup.select<SVGRectElement>("rect.overlay");
    if (overlay.empty()) {
      overlay = chartGroup.append("rect").attr("class", "overlay");
    }
    overlay
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("fill", "transparent")
      .attr("pointer-events", "all")
      .on("mousemove", function (event) {

        const [mouseX] = d3.pointer(event);
        const mouseTimestamp = xScale.invert(mouseX);
        const mouseTimestampMs = mouseTimestamp.getTime();

        // Find closest data point
        let closestPoint = data[0];
        let minDistance = Math.abs(closestPoint.timestamp - mouseTimestampMs);

        for (let i = 1; i < data.length; i++) {
          const distance = Math.abs(data[i].timestamp - mouseTimestampMs);
          if (distance < minDistance) {
            minDistance = distance;
            closestPoint = data[i];
          }
        }

        const x = xScale(closestPoint.timestamp);
        const y = yScale(closestPoint.price);

        // Calculate tooltip position with edge detection
        // Get container bounds relative to the chart container
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return;

        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        // Calculate tooltip position relative to container (not SVG)
        // x is relative to chartGroup, need to add margin
        const tooltipX = x + margin.left;
        const tooltipY = y + margin.top;

        // Estimate tooltip dimensions (conservative estimates)
        const tooltipWidth = 180; // Approximate tooltip width (slightly larger for safety)
        const tooltipHeight = 60; // Approximate tooltip height
        const tooltipOffset = 50; // Distance above/below data point
        const padding = 15; // Padding from edges

        // Calculate adjusted position to avoid edge clipping
        // Note: tooltip uses translateX(-50%), so it extends half width on each side
        const halfWidth = tooltipWidth / 2;
        let adjustedX = tooltipX;
        let adjustedY = tooltipY - tooltipOffset;

        // Check left edge - tooltip extends left by half its width
        if (tooltipX - halfWidth < padding) {
          // Tooltip would be clipped on left, adjust to show at left edge with padding
          adjustedX = halfWidth + padding;
        }
        // Check right edge - tooltip extends right by half its width
        else if (tooltipX + halfWidth > containerWidth - padding) {
          // Tooltip would be clipped on right, adjust to show at right edge with padding
          adjustedX = containerWidth - halfWidth - padding;
        }

        // Check top edge - tooltip is above the point
        if (tooltipY - tooltipOffset - tooltipHeight < padding) {
          // Not enough space above, show below the point instead
          adjustedY = tooltipY + tooltipOffset;
          // Also check if below would be clipped
          if (adjustedY + tooltipHeight > containerHeight - padding) {
            // Not enough space below either, show above but adjust position
            adjustedY = Math.max(padding, tooltipY - tooltipOffset - tooltipHeight);
          }
        }
        // Check bottom edge (if showing above)
        else if (adjustedY + tooltipHeight > containerHeight - padding) {
          // Not enough space, adjust to fit
          adjustedY = Math.max(padding, containerHeight - tooltipHeight - padding);
        }

        setTooltipData({
          price: closestPoint.price,
          timestamp: closestPoint.timestamp,
          x: adjustedX,
          y: adjustedY,
        });

        // Update vertical reference line and data point
        updateTooltipElements(chartGroup, x, y, chartHeight);
      })
      .on("mouseleave", () => {
        setTooltipData(null);
        // Remove tooltip elements
        chartGroup.select("line.tooltip-line").remove();
        chartGroup.select("circle.tooltip-dot").remove();
      });

    // Initialize tooltip elements (if tooltipData exists)
    if (tooltipData) {
      const x = xScale(tooltipData.timestamp);
      const y = yScale(tooltipData.price);
      updateTooltipElements(chartGroup, x, y, chartHeight);
    }
  }, []);

  // Handle data updates, append new points
  useEffect(() => {
    if (!tokenPrice || !Array.isArray(tokenPrice)) return;

    const newData = tokenPrice.map((item: any) => ({
      timestamp: item.timestamp * 1000, // Convert to milliseconds
      price: parseFloat(item.price),
    }));

    // If data length increases, append new points
    if (newData.length > lastDataLengthRef.current) {
      const newPoints = newData.slice(lastDataLengthRef.current);
      dataRef.current = [...dataRef.current, ...newPoints];
      lastDataLengthRef.current = newData.length;

    } else if (newData.length !== dataRef.current.length || newData.length === 0) {
      // If data is completely reset, reinitialize
      dataRef.current = newData;
      lastDataLengthRef.current = newData.length;
    }

    updateChart();
  }, [tokenPrice, updateChart]);

  // Initialize chart
  useEffect(() => {
    if (!chartRef.current || !svgRef.current) return;
    updateChart();
  }, [updateChart]);

  // Redraw when window size changes
  useEffect(() => {
    const handleResize = () => {
      updateChart();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateChart]);

  return (
    <div className="w-0 flex-1">
      <div className="pl-[clamp(1px,_2.31vw,_calc(var(--pc-1512)*0.0231))]">
        <div className="w-full flex justify-between items-center pl-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))] pr-[clamp(1px,_1.06vw,_calc(var(--pc-1512)*0.0106))] h-[clamp(1px,_4.96vw,_calc(var(--pc-1512)*0.0496))] bg-[url('/images/mainnet/discover/bg-card-border-full-2-min.png')] bg-no-repeat bg-center bg-[length:100%_100%]">
          <div className="flex items-center gap-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))]">
            <img
              src={token.icon}
              alt=""
              className="shrink-0 object-center object-contain w-[clamp(1px,_3.84vw,_calc(var(--pc-1512)*0.0384))] h-[clamp(1px,_3.84vw,_calc(var(--pc-1512)*0.0384))]"
            />
            <div className="">
              <div className="text-[clamp(1px,_1.32vw,_calc(var(--pc-1512)*0.0132))] text-white font-[500]">
                {token.name}
              </div>
              <div className="mt-[clamp(1px,_0.20vw,_calc(var(--pc-1512)*0.0020))] flex items-stretch h-[clamp(1px,_1.98vw,_calc(var(--pc-1512)*0.0198))]">
                <div className="h-full flex justify-center items-center bg-[rgba(131,110,249,0.50)] text-[clamp(1px,_1.06vw,_calc(var(--pc-1512)*0.0106))] font-[500] px-[clamp(1px,_0.60vw,_calc(var(--pc-1512)*0.0060))]">
                  {token.symbol}
                </div>
                <div className="h-full flex items-center gap-[clamp(1px,_0.40vw,_calc(var(--pc-1512)*0.0040))] px-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] text-[#A6A6DB] bg-[rgba(131,110,249,0.25)]">
                  <div className="">
                    {formatLongText(token.address, 5, 4)}
                  </div>
                  <button
                    type="button"
                    className="shrink-0"
                    onClick={() => {
                      navigator.clipboard.writeText(token.address);
                      toast.success({
                        title: "Copied to clipboard",
                      });
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6.66406 2.82324C7.78463 2.82348 8.6932 3.73115 8.69336 4.85156V9.9707C8.69326 11.0912 7.78467 11.9998 6.66406 12H2.0293C0.90851 12 0.000101409 11.0913 0 9.9707V4.85156C0.000164901 3.73103 0.908548 2.82327 2.0293 2.82324H6.66406ZM2.0293 4.23438C1.68829 4.2344 1.4113 4.51064 1.41113 4.85156V9.9707C1.41123 10.3117 1.68825 10.5879 2.0293 10.5879H6.66406C7.00493 10.5877 7.28115 10.3116 7.28125 9.9707V4.85156C7.28109 4.51077 7.0049 4.23461 6.66406 4.23438H2.0293ZM9.97363 0C11.0945 2.79673e-05 12.0029 0.908621 12.0029 2.0293V7.14746C12.0029 8.26814 11.0945 9.17673 9.97363 9.17676H9.31055V7.76562H9.97363C10.3147 7.7656 10.5918 7.48852 10.5918 7.14746V2.0293C10.5918 1.68823 10.3147 1.41116 9.97363 1.41113H5.33984C4.99871 1.41113 4.72168 1.68822 4.72168 2.0293V2.46973H3.30957V2.0293C3.30957 0.908604 4.21897 0 5.33984 0H9.97363Z" fill="#A6A6DB" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-[#A6A6DB] pt-[clamp(1px,_1.98vw,_calc(var(--pc-1512)*0.0198))]">
            Created {formatTimeAgo(token.createdAt)}
          </div>
        </div>
        <div className="w-full px-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))] pt-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))]">
          <div className="w-full flex justify-between items-end">
            <div className="">
              <div className="flex items-center gap-[clamp(1px,_0.46vw,_calc(var(--pc-1512)*0.0046))]">
                <div className="text-white font-[500] text-[clamp(1px,_1.59vw,_calc(var(--pc-1512)*0.0159))]">
                  {
                    !tokenPrice && priceLoading ? (
                      <Skeleton width="clamp(1px, 3.30vw, calc(var(--pc-1512)*0.0330))" height="clamp(1px, 1.06vw, calc(var(--pc-1512)*0.0106))" />
                    ) : numberFormatter(!tokenPrice ? 0 : tokenPrice[tokenPrice.length - 1]?.price, 20, true, { prefix: "$" })
                  }
                </div>
                <div
                  className={clsx(
                    "px-[clamp(1px,_0.33vw,_calc(var(--pc-1512)*0.0033))] rounded-[clamp(1px,_0.26vw,_calc(var(--pc-1512)*0.0026))] bg-[rgba(191,255,96,0.10)] h-[clamp(1px,_1.06vw,_calc(var(--pc-1512)*0.0106))] flex justify-center items-center gap-[clamp(1px,_0.13vw,_calc(var(--pc-1512)*0.0013))] text-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] leading-[100%] font-[300]",
                    Big(tokenMarket?.price_change_percent_24h || 0).gte(0) ? "text-[#BFFF60]" : "text-[#FF008A]",
                  )}
                >
                  <svg
                    width="8"
                    height="9"
                    viewBox="0 0 8 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={clsx(
                      Big(tokenMarket?.price_change_percent_24h || 0).gte(0) ? "rotate-0" : "rotate-180",
                    )}
                  >
                    <path
                      d="M4.03519 0.146447C3.83993 -0.0488156 3.52335 -0.0488155 3.32809 0.146447L0.146107 3.32843C-0.0491553 3.52369 -0.0491553 3.84027 0.146107 4.03553C0.341369 4.2308 0.657952 4.2308 0.853214 4.03553L3.68164 1.20711L6.51007 4.03553C6.70533 4.2308 7.02191 4.2308 7.21717 4.03553C7.41244 3.84027 7.41244 3.52369 7.21717 3.32843L4.03519 0.146447ZM3.68164 8.5L4.18164 8.5L4.18164 0.5L3.68164 0.5L3.18164 0.5L3.18164 8.5L3.68164 8.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="">
                    {numberFormatter(tokenMarket?.price_change_percent_24h, 2, true, { isLessPrecision: false })}%
                  </div>
                </div>
              </div>
              <div className="text-[#727D97] text-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))]">
                {currentTime.format("MMM D, YYYY h:mm A")}
              </div>
            </div>
            <div className="flex justify-end items-end gap-[clamp(1px,_4.63vw,_calc(var(--pc-1512)*0.0463))]">
              <div className="text-white">
                <div className="">
                  {
                    !tokenMarket && marketLoading ? (
                      <Skeleton width="clamp(1px, 3.30vw, calc(var(--pc-1512)*0.0330))" height="clamp(1px, 1.06vw, calc(var(--pc-1512)*0.0106))" />
                    ) : numberFormatter(tokenMarket?.market_cap, 2, true, { isShort: true, prefix: "$", isShortUppercase: true })
                  }
                </div>
                <div className="text-[#727D97] text-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))]">
                  Market cap
                </div>
              </div>
              <div className="text-white">
                <div className="">
                  {
                    !tokenMarket && marketLoading ? (
                      <Skeleton width="clamp(1px, 3.30vw, calc(var(--pc-1512)*0.0330))" height="clamp(1px, 1.06vw, calc(var(--pc-1512)*0.0106))" />
                    ) : numberFormatter(tokenMarket?.volume_24h, 2, true, { isShort: true, prefix: "$", isShortUppercase: true })
                  }
                </div>
                <div className="text-[#727D97] text-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))]">
                  1D Volume
                </div>
              </div>
            </div>
          </div>
          <div
            ref={containerRef}
            className="w-full mt-[clamp(1px,_1.32vw,_calc(var(--pc-1512)*0.0132))] h-[clamp(1px,_15.70vw,_calc(var(--pc-1512)*0.1570))] overflow-hidden relative"
          >
            <div ref={chartRef} className="w-full h-full">
              {priceLoading && dataRef.current.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Skeleton width="100%" height="100%" />
                </div>
              ) : (
                <svg ref={svgRef} className="w-full h-full" />
              )}
            </div>
            {/* Tooltip */}
            {tooltipData && (
              <div
                ref={tooltipRef}
                className="absolute pointer-events-none z-10 bg-[rgba(0,0,0,0.8)] border border-[#836EF9] rounded px-2 py-1 text-white text-xs whitespace-nowrap"
                style={{
                  left: `${tooltipData.x}px`,
                  top: `${tooltipData.y}px`,
                  transform: 'translateX(-50%)',
                  maxWidth: '90%',
                }}
              >
                <div className="text-[#836EF9] font-medium">
                  ${tooltipData.price}
                </div>
                <div className="text-[#727D97] text-[10px] mt-0.5">
                  {d3.timeFormat("%b %d, %Y %I:%M %p")(new Date(tooltipData.timestamp)).replace(/^0/, "")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;

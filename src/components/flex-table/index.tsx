import Loading from '@/components/loading';
import React from 'react';
import Empty from '@/components/empty';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const FlexTable = (props: FlexTableProps) => {
  const {
    wrapperClass = '',
    headClass = '',
    bodyClass = '',
    bodyClassName = '',
    bodyWrapClass = '',
    loadingClassName = '',
    loading,
    list,
    columns,
    pagination,
    sortDataIndex,
    sortDataDirection,
    checkedIndex,
    renderEmpty = () => (
      <div className='mt-[50px] w-full flex justify-center items-center'>
        <Empty desc='No data' />
      </div>
    ),
    renderTitle,
    onChangeSortDataIndex,
    showHeader = true,
    renderPaired,
    onRow = () => { }
  } = props;

  return (
    <div className={wrapperClass}>
      <>
        {showHeader && (
          <div className={`flex items-center p-[14px] ${headClass}`}>
            {columns.map((column: any, columnIdx) => (
              <div
                key={column?.dataIndex}
                style={{
                  width: column.width ?? 0,
                  flexGrow: column.width ? 0 : 1,
                  flexShrink: column.width ? 0 : 1,
                  textAlign: column.align ?? 'left',
                  justifyContent:
                    column.align === 'center'
                      ? 'center'
                      : column.align === 'right'
                        ? 'flex-end'
                        : 'flex-start'
                }}
                className='flex items-center gap-[5px] text-[14px] text-[#A9ADB8]'
                onClick={() => {
                  column?.sort &&
                    onChangeSortDataIndex &&
                    onChangeSortDataIndex(column?.dataIndex);
                }}
              >
                {
                  column?.renderTitle
                    ? column?.renderTitle(column, columnIdx)
                    : (
                      renderTitle
                        ? renderTitle(column, columnIdx)
                        : column.title
                    )
                }
                {column?.sort && (
                  <motion.svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='13'
                    height='8'
                    viewBox='0 0 13 8'
                    fill='none'
                    className="cursor-pointer"
                    animate={{
                      rotate: (sortDataIndex === column?.dataIndex && sortDataDirection === 1) ? 0 : 180,
                    }}
                  >
                    <path
                      d='M5.37058 7.5C5.88774 8.16667 7.18062 8.16667 7.69778 7.5L12.3522 1.5C12.8693 0.833334 12.2229 4.76837e-07 11.1886 4.76837e-07H1.87979C0.845482 4.76837e-07 0.199039 0.833334 0.716193 1.5L5.37058 7.5Z'
                      fill={sortDataIndex === column?.dataIndex ? "#000000" : "#D1CEB4"}
                    />
                  </motion.svg>
                )}
              </div>
            ))}
          </div>
        )}
        {loading ? (
          <div className={clsx('flex items-center justify-center py-[30px] flex-col', loadingClassName)}>
            <Loading size={24} />
          </div>
        ) : (
          <div className={clsx("", bodyClassName, bodyWrapClass)}>
            {list?.length > 0
              ? list.map((record: any, index: number) => (
                <div
                  key={index}
                  className={`odd:bg-[rgba(0,0,0,0.06)] rounded-[10px] md:rounded-none py-[16px] pl-[13px] pr-[13px] flex-shrink-0 flex flex-col ${bodyClass}`}
                  onClick={(e) => onRow(record, index, e)}
                >
                  <div className='flex items-center'>
                    {columns.map((column: any) => (
                      <div
                        key={column.dataIndex + column.title}
                        style={{
                          width: column.width ?? 0,
                          flexGrow: column.width ? 0 : 1,
                          textAlign: column.align ?? 'left',
                          flexShrink: column.width ? 0 : 1
                        }}
                        className={`font-[600] ${column.ellipsis ? 'truncate' : ''
                          }`}
                      >
                        {typeof column.render === 'function'
                          ? column.render(
                            JSON.stringify(record[column.dataIndex]),
                            record,
                            index,
                            checkedIndex
                          )
                          : record[column.dataIndex]}
                      </div>
                    ))}
                  </div>
                  {
                    checkedIndex === index && renderPaired && renderPaired(record)
                  }
                </div>
              ))
              : renderEmpty()}
          </div>
        )}
      </>
      {!loading && (pagination ?? null)}
    </div>
  );
};

export default FlexTable;

export type Column = {
  title: string | React.ReactNode;
  renderTitle?: (col: any, colIdx?: number) => any;
  dataIndex: string;
  render?: (text: any, record: Record<string, any>, idx?: number) => any;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  sort?: boolean;
};

export type FlexTableProps = {
  columns: Column[];
  list: Record<string, any>[];
  loading?: boolean;
  wrapperClass?: string;
  headClass?: string;
  bodyClass?: string;
  bodyWrapClass?: string;
  bodyClassName?: string;
  loadingClassName?: string;
  pagination?: any;
  renderEmpty?(): any;
  sortDataIndex?: string;
  sortDataDirection?: 1 | -1;
  checkedIndex?: number;
  showHeader?: boolean;
  onChangeSortDataIndex?(index: string): void;
  renderTitle?(column: Column, columnIdx: number): any;
  renderPaired?(record: any): any;
  onRow?(record: any, index: number, e: any): void;
};

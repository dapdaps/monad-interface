import React, { useState } from 'react';
import { TabItem } from './TabItem'

interface TabProps {
  children: React.ReactElement[];
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
}

export const Tab: React.FC<TabProps> = ({ children, defaultActiveKey, onChange }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || children[0]?.props?.tabKey);

  const handleTabClick = (key: string) => {
    setActiveKey(key);
    onChange?.(key);
  };

  return (
    <div className="w-full">
      <div className="flex border-b border-[#464368]">
        {children.map((child) => (
          <div
            key={child.props.tabKey}
            className={`px-4 py-3 flex-1 flex text-[#fff] text-[16px]  items-center justify-center cursor-pointer transition-all duration-300 
              ${activeKey === child.props.tabKey 
                ? 'border-b-[3px] border-[#ACACE2]' 
                : 'p-b-[2px]'
              }`}
            onClick={() => handleTabClick(child.props.tabKey)}
          >
            {child.props.tab}
          </div>
        ))}
      </div>
      <div className="">
        {children.find((child) => child.props.tabKey === activeKey)}
      </div>
    </div>
  );
}; 
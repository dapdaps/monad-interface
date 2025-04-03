import React from 'react';

interface TabItemProps {
  tab: React.ReactNode;
  tabKey: string;
  children: React.ReactNode;
}

export const TabItem: React.FC<TabItemProps> = ({ children }) => {
  return <div className="flex-1">{children}</div>;
}; 
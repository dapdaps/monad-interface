const MobileLayout = (props: any) => {
  const { children } = props;

  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
};

export default MobileLayout;

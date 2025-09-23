import LaptopHeader from "./header";
import LaptopSidebar from "./sidebar";

const LaptopLayout = (props: any) => {
  const { children } = props;

  return (
    <div className="w-full h-full relative">
      <LaptopSidebar />
      <LaptopHeader />
      <div className="relative h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default LaptopLayout;

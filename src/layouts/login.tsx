import clsx from "clsx";

const LoginLayout = (props: any) => {
  const { className, children } = props;

  return (
    <div className={clsx("w-full h-screen bg-[#010101] text-center text-[#7B23FF] font-SpaceMono text-[18px] font-normal leading-[90%]", className)}>
      <div className="w-full h-full bg-[url('/images/login/bg-top.png')] bg-no-repeat bg-top bg-[length:100%_136px]">
        <div className="w-full h-full bg-[url('/images/login/bg-bot.png')] bg-no-repeat bg-bottom bg-[length:100%_230px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;

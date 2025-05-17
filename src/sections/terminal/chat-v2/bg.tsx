import clsx from 'clsx';
import ChatTitle from '@/sections/terminal/chat-v2/title';

const ChatBg = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("w-full h-full left-0 top-0 absolute z-[0] overflow-hidden pointer-events-none", className)}>
      <ChatTitle delay={3} className="mt-[64px]" />
      <ChatTitle animate={void 0} className="mt-[18px] opacity-60 text-stroke-1-836EF9 ![text-shadow:none] !text-[#010101] translate-x-[30%]" />
      <ChatTitle className="absolute z-[0] bottom-[27px] -translate-x-[30%]" />
      <img src="/images/terminal/icon-target.svg" alt="" className="w-[100px] h-[100px] shrink-0 object-contain object-center absolute left-[42px] top-[167px]" />
      <img src="/images/terminal/icon-target.svg" alt="" className="w-[100px] h-[100px] shrink-0 object-contain object-center absolute right-[37px] bottom-[24px]" />
    </div>
  );
};

export default ChatBg;

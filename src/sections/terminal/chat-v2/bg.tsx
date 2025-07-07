import clsx from 'clsx';
import ChatTitle from '@/sections/terminal/chat-v2/title';
import Starfield from '@/sections/home/Starfield';

const ChatBg = (props: any) => {
  const { className } = props;

  return (
    <div
      className={clsx(
        "w-full h-full left-0 top-0 absolute z-[0] overflow-hidden pointer-events-none",
        className
      )}
    >
      <div className="absolute pointer-events-none w-full h-full left-0 top-0" />
      <ChatTitle
        animate={void 0}
        className="mt-[64px] [animation:_rgb-shift_3s_steps(1)_infinite]"
      />
      <ChatTitle
        animate={void 0}
        className="mt-[18px] opacity-60 text-stroke-1-836EF9 ![text-shadow:none] !text-[#010101] translate-x-[30%] [animation:_rgb-shift_2s_steps(1)_infinite]"
      />
      <ChatTitle
        animate={void 0}
        className="absolute z-[0] bottom-[27px] -translate-x-[30%] [animation:_rgb-shift-alt_1.5s_steps(1)_infinite]"
      />
      <img src="/images/terminal/icon-target.gif" alt="" className="w-[100px] h-[100px] shrink-0 object-contain object-center absolute left-[42px] top-[167px]" />
      <img src="/images/terminal/icon-target.gif" alt="" className="w-[100px] h-[100px] shrink-0 object-contain object-center absolute right-[37px] bottom-[24px]" />
      <Starfield speed={1.5} numStars={1000} bgColor="#010101" />
    </div>
  );
};

export default ChatBg;

import clsx from 'clsx';

export const CapsuleButton = ({
    children,
    firstClass = '',
    secondClass = '',
    containerClass = '',
  }: {
    children: React.ReactNode;
    firstClass?: string;
    secondClass?: string;
    containerClass?: string;
  }) => {
    return (
      <div className={clsx("relative w-44 h-10", containerClass)}>
        <div className={clsx("absolute bottom-1 w-full h-9 bg-[#4B371F] rounded-[25px]", secondClass)} />
        <div 
          className={clsx("absolute top-0 w-full h-8 rounded-[25px] border-2 border-[#855B5B]/30 bg-[#F7F9EA]", firstClass)}
        >
          {children}
        </div>
      </div>
    );
  };


export const BaseButton = ({ children, interClassName, onClick, disabled }: {
    children: React.ReactNode;
    interClassName?: string;
    onClick?: () => void;
    disabled?: boolean;
  }) => {
    return (
      <div className="inline-block" onClick={disabled ? undefined : onClick}>
        <div className={clsx('rounded-[16px] border-2 border-[#4B371F] bg-[#FFB050] p-1 inline-block', disabled && 'opacity-30')}>
          <div className={clsx("rounded-[12px] border-2 border-[#AF7026] bg-[#FFCF23] flex items-center justify-center px-2 py-1 relative h-[52px] min-w-[90px]", interClassName)}>
            <div className='absolute top-[2px] left-[2px]'>
            <svg width="56" height="12" viewBox="0 0 56 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10.5C2 6 3.5 2 11.5 2M18 2H54" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  };
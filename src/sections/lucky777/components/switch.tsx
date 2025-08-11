import { useState } from "react";

interface SwitchProps {
  isOpen: boolean;
  onOpenSwitch: (isOpen: boolean) => void;
  setIsOpenSwitch: (isOpen: boolean) => void;
}

export default function Switch(props: SwitchProps) {
  const { isOpen, setIsOpenSwitch, onOpenSwitch } = props;

  return (
    <div data-click-sound className="absolute bottom-[52px] right-[120px] z-[2] w-[122px] h-[139px] cursor-pointer" onClick={() => {
      setIsOpenSwitch(!isOpen);
      onOpenSwitch(!isOpen);
    }}>
      {
        isOpen ? (
          <div>
            <img src="/images/lucky777/switch-on.png" className="w-[122px]" alt="switch-open" />
          </div>
        ) : (
          <div>
            <img src="/images/lucky777/switch-off.png" className="w-[122px]" alt="switch-close" />
          </div>
        )
      }

      <div className="absolute bottom-[0px] right-0 left-0 h-[30px] bg-[#31305A] rounded-b-[6px] border-b border-l border-r border-[#26274B]"></div>
    </div>
  );
}
import { useState } from "react";

interface SwitchProps {
  isOpen: boolean;
}

export default function Switch(props: SwitchProps) {
  const { isOpen } = props;


  return (
    <div className="absolute bottom-[80px] right-[115px] z-[2] w-[122px]">
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
    </div>
  );
}
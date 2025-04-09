import { useEffect } from "react";
import styled from "styled-components";

import RpcAlert from "./alert";
import RpcSelector from "./selector";
import { renderPing, renderPingConfig } from "@/utils/rpc";
import { useRpc } from "@/hooks/use-rpc";
import { useRpcStore } from "@/stores/rpc";
import useCustomAccount from "@/hooks/use-account";
import useIsMobile from "@/hooks/use-isMobile";

const StyledRpcs = styled.div<{ $color?: string; isMobile?: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ $color }) => $color || "#57DB64"};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  transition: opacity 0.2s linear;
  border-radius: 18px;
  background: rgba(62, 52, 124, 0.60);
  padding: 4px 10px;

  backdrop-filter: blur(5px);

  &:hover {
    opacity: 1;
  }

  ${({ isMobile, $color }) => isMobile ? `
    &&::before {
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      flex-shrink: 0;
      background: ${$color || "#57DB64"};
      border-radius: 50%;
      margin-right: 5px;
    }
  ` : `
    &&::after {
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      flex-shrink: 0;
      background: ${$color || "#57DB64"};
      border-radius: 50%;
    }
  `}
`;

const Rpc = ({ className }: { className?: string }) => {
  const rpcStore = useRpcStore();
  const { account } = useCustomAccount();
  const { ping, getCurrentPing } = useRpc();
  const isMobile = useIsMobile()

  const handleRpc = () => {
    rpcStore.setVisible(true);
  };

  useEffect(() => {
    getCurrentPing();
  }, []);

  return (
    <div>
      <StyledRpcs
        $color={renderPingConfig(ping).color}
        data-bp="1001-008"
        onClick={handleRpc}
        isMobile={isMobile}
        className={className}
      >
        {renderPing(ping)}
      </StyledRpcs>
      <RpcSelector
        visible={rpcStore.visible}
        onClose={() => {
          rpcStore.setVisible(false);
        }}
      />
      <RpcAlert visible={rpcStore.alert} />
    </div>
  );
};

export default Rpc;

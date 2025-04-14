import { memo, useEffect } from "react";

import {
  StyledNetworkDelay,
  StyledRpcContainer,
  StyledRpcItem,
  StyledRpcList,
  StyledRpcListDesc,
  StyledRpcRadio
} from "./styles";
import { renderPing, renderPingConfig } from "@/utils/rpc";
import { useRpc } from "@/hooks/use-rpc";
import { useRpcStore } from "@/stores/rpc";
import useToast from "@/hooks/use-toast";
import { RPC_LIST } from "@/configs/rpc";

const RpcList = (props: Props) => {
  const list = Object.values(RPC_LIST);
  const keys = Object.keys(RPC_LIST) as any[];
  const rpcStore = useRpcStore();
  const total = useToast();
  const { pingList, getPingList } = useRpc();
  const handleSelected = (rpc: any) => {
    if (rpc === rpcStore.selected) return;
    rpcStore.setSelected(rpc);
    rpcStore.setVisible(false);
    navigator.clipboard.writeText(RPC_LIST[rpc].url as string);
    total.success({
      title: `Copied rpc ${RPC_LIST[rpc].simpleName}`
    });
    setTimeout(() => {
      window.history.go(0);
    }, 1000);
  };

  useEffect(() => {
    getPingList();
  }, []);

  return (
    <StyledRpcContainer className="bg-[#2B294A] lg:rounded-[16px] md:rounded-t-[16px] md:w-full lg:w-[389px] relative p-[1px]">
      <div className="relative z-[2] p-4">
        <div className="flex items-center justify-between">
          <div className="text-[18px] text-white font-[400] font-Unbounded leading-[1]">RPC Selector</div>
          <svg onClick={() => {
            rpcStore.setVisible(false);
          }} className="cursor-pointer" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.01041 4.59619L1.41422 0L0 1.41418L4.59621 6.01038L0 10.6066L1.41422 12.0208L6.01041 7.42462L10.6066 12.0208L12.0208 10.6066L7.42461 6.01038L12.0208 1.41418L10.6066 0L6.01041 4.59619Z" fill="#A6A6DB"/>
          </svg>
        </div>
        <StyledRpcListDesc>
          Select the available RPC service below and the page will be
          automatically refreshed
        </StyledRpcListDesc>
        <StyledRpcList>
          {list.map((it: any, idx) => (
            <StyledRpcItem key={idx} onClick={() => handleSelected(keys[idx])}>
              {it.simpleName}
              <div className="flex gap-[10px] items-center">
                <StyledNetworkDelay
                  $color={renderPingConfig(pingList[keys[idx]]).color}
                >
                  {renderPing(pingList[keys[idx]])}
                </StyledNetworkDelay>
                <StyledRpcRadio $selected={rpcStore.selected === keys[idx]} />
              </div>
            </StyledRpcItem>
          ))}
        </StyledRpcList>
      </div>
    </StyledRpcContainer>
  );
};

export default memo(RpcList);

export interface Props {}

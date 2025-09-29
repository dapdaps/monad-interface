import Modal from "@/components/modal";
import Content from "../Content";
import dexs from "@/configs/swap";
import { useMemo } from "react";
import { DEFAULT_CHAIN_ID } from "@/configs";

export default function SwapModal({
  defaultInputCurrency,
  defaultOutputCurrency,
  outputCurrencyReadonly = false,
  protocols,
  show,
  onClose,
  ...rest
}: any) {
  const [templates, tokens] = useMemo(() => {
    let _templates: string[] = [];
    let _tokens: any[] = [];
    const _dexs = protocols
      ? protocols.map((protocol: any) => dexs[protocol.toLowerCase()])
      : Object.values(dexs);

    _dexs.forEach((dex: any) => {
      _templates.push(dex.name);
      _tokens = [...dex.tokens[DEFAULT_CHAIN_ID]];
    });
    return [_templates, _tokens];
  }, [dexs, protocols]);

  return (
    <Modal
      open={show}
      onClose={onClose}
      closeIconClassName="md:hidden top-[-10px] right-[-10px]"
      innerClassName="md:bg-transparent md:w-full bg-[#2B294A] p-[30px]"
    >
      <div className="md:px-[10px]">
        <Content
          dapp={{
            name: "SuperSwap",
            tokens: { [DEFAULT_CHAIN_ID]: tokens },
            defaultInputCurrency,
            defaultOutputCurrency
          }}
          outputCurrencyReadonly={outputCurrencyReadonly}
          showSetting={true}
          {...rest}
        />
      </div>
    </Modal>
  );
}

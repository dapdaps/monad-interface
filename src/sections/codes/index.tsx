"use client";
import { memo } from "react";
import Card from "./components/card";
import Codes from "./components/codes";
import Records from "./components/records";
import RulesButton from "./components/rules-button";
import Transactions from "./components/transactions";
import CodesContextProvider from "./context";
import RuleModal from "./components/rule-modal";
import Mission from "./components/mission";

export default memo(function CodesView() {
  return (
    <CodesContextProvider>
      <div className="w-full h-screen bg-[#0E0F29]">
        <div className="w-full h-full bg-[url('/images/faucet/bg.png')] bg-no-repeat bg-top bg-cover overflow-auto">
          <div className="w-full h-full flex justify-center items-start pt-[110px] bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.00)_100%)] bg-no-repeat bg-top bg-[length:100%_37.79%]">
            <Card bodyClassName="relative !p-[0_36px] border border-transparent">
              <RulesButton />
              <Mission />
              <div className="flex gap-[26px]">
                <Transactions />
                <Codes />
              </div>
              <Records />
            </Card>
          </div>
        </div>
        <RuleModal />
      </div>
    </CodesContextProvider>
  )
})

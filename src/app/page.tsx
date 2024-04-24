'use client'
import { useAtom } from 'jotai';
import Shipping from "./Components/Shipping";
import Payment from "./Components/Payment";
import Summary from "./Components/Summary";
import { stepAtom } from './Components/hooks/hooks';

export default function Home() {
  const [step, _] = useAtom(stepAtom)
  return (
    <main className="flex items-start justify-between my-[150px] mx-[50px] flex-row flex-wrap-reverse max-[1404px]:justify-center">
      <div className="pt-[37px] pb-[83px] px-[41px] bg-[#f7fafc] rounded-[10px]">
        {
          step === 0 &&
          <Shipping/>
          
        }
        {
          step === 1 &&
          <Payment />
        }
      </div>
      <div className="pt-[39px] pb-[58px] px-[46px] bg-[#f7fafc] rounded-[10px] max-[1404px]:mb-[50px]">
        <Summary />
      </div>
    </main>
  );
}

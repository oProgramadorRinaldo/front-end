'use client'
import Image from "next/image";
import ProdutoImg from "@/public/img/produto.svg"
import { useState } from "react";

export default function Summary() {
    const [count, setCount] = useState(1)
    return (
        <section className="flex flex-col items-center">
            <p className="w-[100%] text-[20px] font-medium mb-[20px]">Order Summary</p>
            <div>
                <Image
                    src={ProdutoImg}
                    alt="imagem"
                />
                <div className="flex flex-row items-center mt-[19px] mb-[31px]">
                    <div>
                        <p className="text-[20px] font-medium mb-[13px]">Sony wireless headphones</p>
                        <p className="font-bold text-[#2D3748] text-[20px]">£320.45</p>
                    </div>
                    <div className="flex flex-row items-center ml-[40px]">
                        <button onClick={() => setCount(count - 1)} className="font-medium text-[#718096] text-[30px] p-[14px] bg-[#E2E8F0] w-[40px] h-[40px] rounded-[5px] flex items-center justify-center">-</button>
                        <p className="text-[20px] w-[40px] text-center">{count}</p>
                        <button onClick={() => setCount(count + 1)} className="font-medium text-[#718096] text-[24px] p-[14px] bg-[#E2E8F0] w-[40px] h-[40px] rounded-[5px] flex flex-row text-center items-center justify-center">+</button>
                    </div>
                </div>
                <div className="mb-[55px]">
                    <label htmlFor="discount" className="text-[#718096] text-[16px] font-medium">Gift Card / Discount code</label>
                    <div className="mt-[22px]">
                        <input placeholder="" className="p-[20px] bg-[#E2E8F0] rounded-[10px] text-[16px] text-[#2D3748] w-[270px] h-[59px]" />
                        <button className="w-[125px] h-[60px] bg-transparent text-[#3182CE] rounded-[10px] ml-[26px] font-medium border-[2px] border-[#3182CE] max-[1404px]:ml-[24px]">Apply</button>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between mb-[39px]">
                    <p className="text-[#4A5568] text-[18px]">Sub total</p>
                    <p className="font-medium text-[20px]">£316.55</p>
                </div>
                <div className="flex flex-row items-center justify-between mb-[39px]">
                    <p className="text-[#4A5568] text-[18px]">Tax</p>
                    <p className="font-medium text-[20px]">£3.45</p>
                </div>
                <div className="flex flex-row items-center justify-between mb-[40px]">
                    <p className="text-[#4A5568] text-[18px]">Shipping</p>
                    <p className="font-medium text-[#38B2AC] text-[20px]">Free</p>
                </div>
                <div className="flex flex-row items-center justify-between mb-[10px]">
                    <p className="font-bold text-[#2D3748] text-[20px]">Total</p>
                    <p className="font-medium text-[20px]">£320.45</p>
                </div>
            </div>
        </section>
    )
}
"use client"
import Menu from "../Menu";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import InputMask from "react-input-mask";
import { stepAtom } from "../hooks/hooks";
import { useAtom } from "jotai";
import { processSave } from "../hooks";
import './index.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from 'next/navigation'


const date = new Date()


const createUserFormSchema = z.object({
    nameCard: z.string()
        .nonempty("Name on card is required"),
    number: z.string()
        .nonempty("Card number is required")
        .regex(/^(?!.*(\d)(?:\s*\1){3})(?:\d{4}\s?){4}$/g, "Card number invalid")
        .regex(/^(?!.*(\d{4})\s\1\s\1\s\1)\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Card number is invalid"),
    month: z.coerce.number().gte(date.getMonth() + 1, 'Month is invalid').lte(12, 'Month is invalid'),
    year: z.coerce.number().gte(date.getFullYear(), 'Year is invalid'),
    cvc: z.string()
        .nonempty("cvc is required"),
})

type createUserFormData = z.infer<typeof createUserFormSchema>

export default function Payment() {
    const [step, setStep] = useAtom(stepAtom)
    const [option, setOption] = useState<any>()
    const router = useSearchParams()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<createUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    })

    const {
        save
    } = processSave()

    const handleUpdate = (id: string) => {
        const data = option.filter((element: any) => element._id === id)[0]
        reset({
            cvc: data.cvc,
            month: data.month,
            nameCard: data.nameCard,
            number: data.number,
            year: data.year,
        })
    }

    const handleSearchPayment = async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_LOCAL}payment?access_token=${router.get('access_token')}`)
        setOption(data)
    }

    useEffect(() => {
        handleSearchPayment()
    }, [])

    return (
        <section className="flex flex-col items-center">
            <Menu
                color="#3182CE"
            />
            <p className=" w-[76%] text-[20px] font-medium mb-[16px]">Payment Details</p>
            <form onSubmit={handleSubmit(save)} className="flex flex-col items-center">
                <div className="flex flex-row items-center">
                    <label className="text-[#2D3748] text-[16px] mr-[75px] font-medium" htmlFor="address">Use saved card</label>
                    <div className="flex flex-col">
                        <select onChange={(e) => handleUpdate(e.target.value)} className=" p-[20px] bg-[#E2E8F0] rounded-[10px] text-[16px] text-[#2D3748] w-[278px] h-[59px] ml-[55px]">
                            <option value="" disabled selected>Mastercard ending 234</option>
                            {
                                option?.length && (
                                    option?.map((element: any) => (
                                        <option key={element._id} value={element._id}>{element.nameCard}</option>
                                    ))
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className="flex flex-col items-start mt-[15px]">
                    <label className="font-medium text-[#718096] text-[16px] mb-[9px]" htmlFor="nameCard">Name on card</label>
                    <input placeholder="Pomaline Moses Olanrewaju" {...register("nameCard")}  className="p-[20px] mt-[9px] bg-[#E2E8F0] rounded-[10px] text-[16px] text-[#2D3748] w-[534px] h-[59px]" />
                    {errors.nameCard && <span className="text-[12px] text-[#f50000]">{errors.nameCard.message}</span>}
                </div>
                <div className="flex flex-col items-start mt-[20px]">
                    <label className="font-medium text-[#718096] text-[16px]" htmlFor="street">Card number</label>
                    <input placeholder="123 - 456 -" {...register("number")} className="p-[20px] bg-[#E2E8F0] rounded-[10px] text-[16px] text-[#2D3748] w-[534px] h-[59px] mt-[17px]" />
                    {errors.number && <span className="text-[12px] text-[#f50000]">{errors.number.message}</span>}
                </div>
                <div className="flex flex-row items-start mt-[20px]">
                    <div className="flex flex-col items-start mt-[20px] mr-[22px]">
                        <label className="font-medium text-[#718096] text-[16px] " htmlFor="expiration">Expiration</label>
                        <div className="flex flex-row items-baseline justify-center">
                            <div className="flex flex-col">
                                <input placeholder="03" {...register("month")} className="mt-[17px] p-[20px]  bg-[#E2E8F0] rounded-[10px] text-[16px] text-[#2D3748] w-[100px] h-[59px]" />
                                {errors.month && <span className="mr-[14px] text-[12px] text-[#f50000]">{errors.month.message}</span>}
                            </div>
                            <span className="m-[10px]">/</span>

                            <div className="flex flex-col">
                                <input placeholder="2024" type="number" {...register("year")} className="mt-[17px] p-[20px]  bg-[#E2E8F0] rounded-[10px] text-[16px] text-[#2D3748] w-[100px] h-[59px]" />
                                {errors.year && <span className="ml-[14px] text-[12px] text-[#f50000]">{errors.year.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-[20px] ml-[22px]">
                        <label className="font-medium text-[#718096] text-[16px]" htmlFor="shipping">CVC</label>
                        <input placeholder="123" {...register("cvc")} className="p-[20px] bg-[#E2E8F0] rounded-[10px] text-[16px] text-[#2D3748] w-[278px] h-[59px] mt-[17px]" />
                        {errors.cvc && <span className="text-[12px] text-[#f50000]">{errors.cvc.message}</span>}
                    </div>
                </div>
                <hr className="w-[100%] border mt-[34.5px] w-[694px]" />
                <div className="mt-[38.5px] flex flex-row items-center justify-end w-[77.5%]">
                    <Link href={''} className="text-[16px] text-[#4A5568] mr-[25px] font-medium" onClick={() => setStep(step - 1)}>Cancel order</Link>
                    <button type="submit" className="w-[200px] h-[60px] bg-[#3182CE] text-[#F7FAFC] rounded-[10px] ml-[25px] font-medium shadow-xl" >Complete order</button>
                </div>
            </form>
        </section>
    )
}
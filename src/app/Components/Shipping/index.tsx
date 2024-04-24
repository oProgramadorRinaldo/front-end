"use client"
import Menu from "../Menu";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { shippingAtom, stepAtom } from "../hooks/hooks";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const createUserFormSchema = z.object({
    number: z.string()
        .nonempty("First line of address is required"),
    street: z.string()
        .nonempty("Street is required"),
    postcode: z.string()
        .nonempty("Postcode is required"),
    shipping: z.string()
        .nonempty("shipping is required"),
})

type createUserFormData = z.infer<typeof createUserFormSchema>

export default function Shipping() {
    const [step, setStep] = useAtom(stepAtom)
    const [option, setOption] = useState<any>()
    const [_, setShipping] = useAtom(shippingAtom)
    const router = useSearchParams()
    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<createUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    })

    const handleSearchPayment = async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_LOCAL}shipping?access_token=${router.get('access_token')}`)
        setOption(data)
    }

    useEffect(() => {
        handleSearchPayment()
    }, [])

    const handleUpdate = (id: string) => {
        const data = option.filter((element: any) => element._id === id)[0]
        reset(data)
    }

    const onSubmit = (data: any) => {
        setStep(step + 1)
        setShipping(data)
    }
    return (
        <section className="flex flex-col items-center">
            <Menu
                color="#828282"
            />
            <p className=" w-[76%] text-[20px] font-medium mb-[16px]">Shipping Details</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
                <div className="flex flex-row items-center">
                    <label className="text-[#2D3748] text-[16px] mr-[55px] font-medium" htmlFor="address">Use saved address</label>
                    <div className="flex flex-col">
                        <select onChange={(e) => handleUpdate(e.target.value)} className=" p-[20px] bg-[#E2E8F0] rounded-[10px] text-[16px] text-[#2D3748] w-[278px] h-[59px] ml-[55px]">
                            <option value="" disabled selected>123 , Electric avenue</option>
                            {
                                option?.length && (
                                    option?.map((element: any) => (
                                        <option key={element._id} value={element._id}>{element.number}, {element.street}</option>
                                    ))
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className="flex flex-col items-start mt-[15px]">
                    <label className="font-medium text-[#718096] text-[16px] mb-[9px]" htmlFor="number">First line of address</label>
                    <input placeholder="123" {...register("number")} className="p-[20px] mt-[9px] bg-[#E2E8F0] rounded-[10px] text-[16px] text-[#2D3748] w-[534px] h-[59px]" />
                    {!errors.number && <span className="text-[12px] text-[#f50000]">III</span>}
                </div>
                <div className="flex flex-col items-start mt-[20px]">
                    <label className="font-medium text-[#718096] text-[16px]" htmlFor="street">Street name</label>
                    <input placeholder="Electric avenue" {...register("street")} className="p-[20px] bg-[#E2E8F0] rounded-[10px] text-[16px] text-[#2D3748] w-[534px] h-[59px] mt-[17px]" />
                    {errors.street && <span className="text-[12px] text-[#f50000]">{errors.street.message}</span>}
                </div>
                <div className="flex flex-row items-start mt-[20px]">
                    <div className="flex flex-col items-start mt-[20px] mr-[22px]">
                        <label className="font-medium text-[#718096] text-[16px] " htmlFor="postcode">Postcode</label>
                        <input placeholder="ABC - 123" {...register("postcode")} className="mt-[17px] p-[20px]  bg-[#E2E8F0] rounded-[10px] text-[16px] text-[#2D3748] w-[212px] h-[59px]" />
                        {errors.postcode && <span className="text-[12px] text-[#f50000]">{errors.postcode.message}</span>}
                    </div>
                    <div className="flex flex-col items-start mt-[20px] ml-[22px]">
                        <label className="font-medium text-[#718096] text-[16px]" htmlFor="shipping">Select shipping</label>
                        <select {...register("shipping")} className="p-[20px] bg-[#E2E8F0] rounded-[10px] text-[16px] text-[#2D3748] w-[278px] h-[59px] mt-[17px]">
                            <option value="" disabled selected>Free delivery</option>
                            <option value="teste">teste</option>
                        </select>
                        {errors.shipping && <span className="text-[12px] text-[#f50000]">{errors.shipping.message}</span>}
                    </div>
                </div>
                <hr className="w-[100%] border mt-[34.5px] w-[694px]"/>
                <div className="mt-[38.5px] flex flex-row items-center justify-end w-[76%]">
                    <Link href={''} className="text-[16px] text-[#4A5568] mr-[25px] font-medium" onClick={() => setStep(step - 1)}>Cancel order</Link>
                    <button type="submit" className="w-[200px] h-[60px] bg-[#3182CE] text-[#F7FAFC] rounded-[10px] ml-[25px] font-medium shadow-xl">Payment</button>
                </div>
            </form>
        </section>
    )
}
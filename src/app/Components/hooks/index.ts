'use client'
import { useAtom } from "jotai";
import { shippingAtom } from "./hooks";
import axios from "axios";
import { useSearchParams } from 'next/navigation'


export const processSave = () => {
    const [shipping, _] = useAtom(shippingAtom)
    const router = useSearchParams();   

    const save = async (data: any) => {
        if(shipping){
            await axios.post(`${process.env.NEXT_PUBLIC_URL_LOCAL}?access_token=${router.get('access_token')}`, {
                shipping: {
                    number: shipping.number,
                    street: shipping.street,
                    postcode: shipping.postcode,
                    shipping: shipping.shipping
                },
                payment: {
                    nameCard: data.nameCard,
                    number: data.number,
                    month: data.month,
                    year: data.year,
                    cvc: data.cvc,
                }
            })
        }
    }
    return {
        save
    }
}
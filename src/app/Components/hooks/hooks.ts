import { atom } from 'jotai'

interface shippingType {
    number: string,
    street: string,
    postcode: string,
    shipping: string
}


export const stepAtom = atom(0)
export const shippingAtom = atom<shippingType | null>(null)
export const paymentAtom = atom((null))


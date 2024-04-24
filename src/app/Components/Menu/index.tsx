import './style.css'
import Image from 'next/image'
import Check from '@/public/check.svg'

type props = {
    color: string
}


export default function Menu ({ color}: props) {
    return(
        <div className='flex flex-row justify-center mb-[52px]'>
            <p className='shipping'>Shipping</p>
            <Image
                className='mx-[16px]'
                src={Check}
                alt='check'
            />
            <p className='payment' style={{ color: color}}>Payment</p>
        </div>
    )
}
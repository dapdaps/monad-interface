'use client'

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function Referral() {
    const searchParams = useSearchParams()
    const router = useRouter()
    useEffect(() => {
        const code = searchParams.get('code')
        if (code && typeof window !== 'undefined') {
            window.localStorage.setItem('referral_code', code as string)
            setTimeout(() => {
                router.push('/')
            }, 1000)
        }
    }, [])
    return <div/>
}
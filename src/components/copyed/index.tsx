import { useState } from "react"
import styles from './style.module.css'

const defaultColor = '#808095'


export default function Copyed({ value, children }: { value: string, children?: React.ReactNode }) {
    const [color, setColor] = useState(defaultColor)
    const [tipShow, setTipShow] = useState(false)
    const [tip, setTip] = useState('Copy')

    return <div className={styles.copy} onMouseEnter={() => {
        // setColor('#fff')
        // setTipShow(true)
        // setTip('Copy')
    }} onMouseLeave={() => {
        // setColor(defaultColor)
        // setTipShow(false)
    }} onClick={async () => {
        try {
            await navigator.clipboard.writeText(value)
            setTipShow(true)
            setTip('Copied')
            setColor('rgba(255, 122, 0, 1)')
        } catch (e) {

        } finally {
            setTimeout(() => {
                setTipShow(false)
            }, 1000)
        }
    }}>

        {children}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="4.19873" width="8.2514" height="8.8013" rx="2" stroke="#A6A6DB" stroke-width="1.6" />
            <path d="M4.75098 3.00029V3.00029C4.75098 1.89572 5.64641 1 6.75098 1H11.0024C12.1069 1 13.0024 1.89543 13.0024 3V7.8013C13.0024 8.90587 12.1069 9.8013 11.0024 9.8013H10.752" stroke="#A6A6DB" stroke-width="1.6" />
        </svg>

        {
            tipShow && <div className={styles.tip}>{tip}</div>
        }

    </div>
}
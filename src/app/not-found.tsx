import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative -mt-[60px] w-full h-screen bg-[#0E0F29]">
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full h-[62.5vw] bg-[url('/images/404_bg.svg')] bg-center bg-contain bg-no-repeat"></div>
      <div className='absolute left-[33.68vw] bottom-[3.68vw] w-[29.930vw] h-[47.222vw] bg-[url("/images/ufo.svg")] bg-center bg-no-repeat bg-contain'>
        <div className='absolute top-[13.542vw] left-[7.361vw] text-white font-Unbounded text-[0.972vw] text-center leading-[150%]'>
          <span>The URL could not be detected,<br />go back to NADSA spaceship.</span>
          <Link href="/" replace className='m-[3.056vw_auto_0] cursor-pointer w-[15.764vw] h-[3.472vw] flex items-center justify-center gap-[0.556vw] rounded-[0.417vw] bg-[#836EF9]'>
            <span className='font-medium'>NADSA</span>
            <div className='w-[1.111vw]'>
              <img className='w-full' src="/images/icon_right.svg" alt="icon_right" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

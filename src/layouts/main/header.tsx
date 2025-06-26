// "use client";

import ConnectWallet from "@/components/connect-wallet";
import Sound from "@/components/sound";
import useIsMobile from "@/hooks/use-isMobile";
import { useProgressRouter } from "@/hooks/use-progress-router";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const FIXED_HEADER_PATHNAME = [/^\/faucet$/, /^\/$/, /^\/codes$/];

export async function getServerSideProps({ res }: any) {
  const is404 = res.statusCode === 404;
  console.log("====is404", is404);
  return { props: { is404 } };
}

// drop-shadow-[0px_0px_6px_#FFFFFF80]
const menuCls = "relative h-full flex flex-1 flex-col items-center hover:drop-shadow-[0px_0px_6px_#FFFFFF80] justify-center cursor-pointer gap-[3px] text-[#A6A6DB] hover:text-[#fff] transition-all duration-300"
const textCls = " text-[11px] font-bold-[200] "
const hoverCls = "text-[#fff] drop-shadow-[0px_0px_6px_#FFFFFF80]"
const LineBottom = () => {
  return <div className="absolute bottom-0 left-[50%] -translate-x-[50%]"><svg width="83" height="1" viewBox="0 0 83 1" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line y1="0.499939" x2="83" y2="0.499939" stroke="url(#paint0_linear_242_40)" />
    <defs>
      <linearGradient id="paint0_linear_242_40" x1="0" y1="1.49994" x2="83" y2="1.49994" gradientUnits="userSpaceOnUse">
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="0.5" stop-color="white" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
  </div>
}

const MainLayoutHeader = (props: Props) => {
  const { className, style } = props;
  const router = useProgressRouter();
  const pathname = usePathname();
  const DONT_NEED_SHOW_BACK = ["/"];
  const isMobile = useIsMobile();

  const goHome = () => {
    if (pathname.includes("/dex/")) {
      router.push("/dapps");
      return;
    }

    if (pathname.includes("2048") || pathname.includes("777")) {
      router.replace('/arcade');
      return;
    }

    router.replace("/");
  };
  return (
    <header
      className={clsx(
        "flex w-full lg:h-[60px] md:h-[40px] stroke-black font-CherryBomb top-0 z-50 bear-header",
        FIXED_HEADER_PATHNAME.some((reg) => reg.test(pathname))
          ? "fixed"
          : "sticky",
        className
      )}
      style={style}
    >
      <div className="min-w-[120px]">
        {DONT_NEED_SHOW_BACK.includes(pathname) ? (
          <div />
        ) : (
          <div
            data-click-sound="/audios/back-click-sound.mp3"
            className="cursor-pointer w-[120px]"
            onClick={goHome}
          >
            {isMobile ? (
              <img
                className="mt-[10px] ml-[10px]"
                src="/images/header/back_button_mobile.svg"
                alt="back_button"
              />
            ) : (
              <img src="/images/header/back_button.svg" alt="back_button" />
            )}
          </div>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        {
          !isMobile && (
            <div className="absolute px-[30px] flex items-center justify-between left-1/2 -translate-x-1/2 top-0 bg-[url('/images/header/menu_bg.svg')] bg-contain bg-no-repeat bg-center w-[806px] h-[52px] font-Unbounded">
              <div className={clsx(menuCls, pathname === '/' ? hoverCls : '')} onClick={() => { pathname !== '/' && router.push("/") }}>
                <div className="h-[16px] mt-[4px]">
                  <svg className="fill-current" style={{ transform: 'translateY(-6px)' }} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path d="M21.6358 13.016C20.715 11.932 15.9533 7.17211 15.3112 6.51171C14.56 5.73916 13.2999 5.92607 12.7304 6.51171C12.0883 7.15965 7.30241 11.932 6.36946 13.016C5.43652 14.1001 6.47851 15.072 7.20548 15.072H8.18689V20.6792C8.18689 21.4019 8.75635 21.9875 9.45908 21.9875H11.0584C11.5188 21.9875 11.8823 21.6137 11.9065 21.1527V18.7728C11.9065 17.0408 12.7668 16.019 14.039 16.019C15.3112 16.019 16.1714 17.0408 16.1714 18.7728V21.215H16.1836C16.232 21.6511 16.5955 22 17.0438 22H18.631C19.3338 22 19.9032 21.4144 19.9032 20.6917V15.0845H20.7998C21.5268 15.072 22.5567 14.0876 21.6358 13.016Z" />
                    </g>
                  </svg>
                </div>
                <div className={clsx(textCls, '')}>Hall</div>
                { pathname === '/' && <LineBottom />}
              </div>
              <div className={clsx(menuCls, pathname === '/faucet' ? hoverCls : '')} onClick={() => { pathname !== '/faucet' && router.push("/faucet") }}>
                <svg className="fill-current" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0L1.55555 14.6C1.63334 15.4 2.2944 16 3.11116 16H10.8889C11.6667 16 12.3278 15.4 12.4445 14.6L14 0H0ZM7 13.6C5.71666 13.6 4.6667 12.52 4.6667 11.2C4.6667 9.60003 7 6.88002 7 6.88002C7 6.88002 9.33339 9.60005 9.33339 11.2C9.33341 12.52 8.28336 13.6 7 13.6ZM11.9389 4.80001H2.10001L1.75003 1.59998H12.289L11.9389 4.80001Z" />
                </svg>
                <div className={clsx(textCls, '')}>Faucet</div>
                { pathname === '/faucet' && <LineBottom />}
              </div>
              <div className={clsx(menuCls, pathname === '/codes' ? hoverCls : '')} onClick={() => { pathname !== '/codes' && router.push("/codes") }}>
                <svg className="fill-current" width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.1992 0C15.4113 5.48674e-05 15.6147 0.0843947 15.7646 0.234375C15.9146 0.384392 15.999 0.587689 15.999 0.799805V4.39941C15.4687 4.39941 14.96 4.61039 14.585 4.98535C14.21 5.36033 13.9991 5.86912 13.999 6.39941C13.999 6.92985 14.2099 7.43938 14.585 7.81445C14.96 8.18935 15.4688 8.39941 15.999 8.39941V12C15.999 12.2121 15.9146 12.4154 15.7646 12.5654C15.6147 12.7154 15.4113 12.7997 15.1992 12.7998H0.799805C0.5877 12.7998 0.38436 12.7154 0.234375 12.5654C0.0844017 12.4154 5.16566e-05 12.2121 0 12V8.39941C0.530282 8.39941 1.03904 8.18937 1.41406 7.81445C1.78911 7.43938 2 6.92985 2 6.39941C1.9999 5.86912 1.78902 5.36033 1.41406 4.98535C1.03903 4.61037 0.530328 4.39941 0 4.39941V0.799805C3.94526e-09 0.587674 0.084412 0.384395 0.234375 0.234375C0.384361 0.0843797 0.587697 3.79427e-05 0.799805 0H15.1992ZM6 8C5.3373 8 4.7998 8.53745 4.7998 9.2002C4.80002 9.86276 5.33743 10.3994 6 10.3994H9.99902C10.6616 10.3994 11.199 9.86276 11.1992 9.2002C11.1992 8.53745 10.6617 8 9.99902 8H6ZM6 3.2002C5.33743 3.2002 4.80002 3.73685 4.7998 4.39941C4.7998 5.06216 5.3373 5.59961 6 5.59961H9.99902C10.6617 5.59961 11.1992 5.06216 11.1992 4.39941C11.199 3.73685 10.6616 3.2002 9.99902 3.2002H6Z" />
                </svg>
                <div className={clsx(textCls, '')}>Codes</div>
                { pathname === '/codes' && <LineBottom />}
              </div>

              <div className="w-[200px]"></div>

              <div className={clsx(menuCls, pathname === '/dapps' ? hoverCls : '')} onClick={() => { pathname !== '/dapps' && router.push("/dapps") }}>
                <svg className="fill-current" width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.96063 14.7097L11.5669 11.7276C11.7717 11.6129 11.874 11.3835 11.874 11.1541V5.18996L7.26772 8.17204C7.16535 8.28674 7.06299 8.28674 6.96063 8.28674V14.7097ZM12.1811 3.35484C12.6929 3.69892 13 4.2724 13 4.84588V11.1541C13 11.8423 12.6929 12.4158 12.1811 12.6452L7.26772 15.7419C6.75591 16.086 6.14173 16.086 5.73228 15.7419L0.818898 12.6452C0.307087 12.3011 0 11.7276 0 11.1541V4.84588C0 4.15771 0.307087 3.58423 0.818898 3.35484L5.73228 0.258065C6.24409 -0.0860215 6.85827 -0.0860215 7.26772 0.258065L12.1811 3.35484Z" />
                </svg>
                <div className={clsx(textCls, '')}>DApps</div>
                { pathname === '/dapps' && <LineBottom />}
              </div>

              <div className={clsx(menuCls, pathname === '/tokens' ? hoverCls : '')} onClick={() => { pathname !== '/tokens' && router.push("/tokens") }}>
                <svg className="fill-current" width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C10.0736 0 11.9888 0.43176 13.416 1.16838C14.128 1.53515 14.7552 1.99708 15.2136 2.55651C15.6768 3.12136 16 3.82781 16 4.64258V8.35665C16 9.17142 15.6768 9.87786 15.2136 10.4427C14.7552 11.0021 14.1288 11.4641 13.416 11.8316C11.9888 12.5675 10.0736 13 8 13C5.9264 13 4.0112 12.5675 2.584 11.8316C1.872 11.4641 1.2448 11.0021 0.7864 10.4427C0.3232 9.87786 0 9.17142 0 8.35665V4.64258C0 3.82781 0.3232 3.12136 0.7864 2.55651C1.2448 1.99708 1.8712 1.53515 2.584 1.16761C4.0112 0.43176 5.9264 0 8 0ZM14.4 7.50241C14.0913 7.73494 13.762 7.94078 13.416 8.11755C11.9888 8.8534 10.0736 9.28593 8 9.28593C5.9264 9.28593 4.0112 8.8534 2.584 8.11755C2.232 7.93572 1.9 7.73067 1.6 7.50241V8.35665C1.6 8.56711 1.68 8.83793 1.9456 9.16213C2.2152 9.49098 2.6432 9.82989 3.2336 10.1348C4.4128 10.7422 6.0976 11.1422 8 11.1422C9.9032 11.1422 11.5872 10.7422 12.7664 10.1348C13.3568 9.82989 13.7848 9.49098 14.0544 9.16213C14.3208 8.83793 14.4 8.56711 14.4 8.35742V7.50241Z" />
                </svg>
                <div className={clsx(textCls, '')}>Tokens</div>
                { pathname === '/tokens' && <LineBottom />}
              </div>

              <div className={clsx(menuCls, pathname === '/arcade' ? hoverCls : '')} onClick={() => { pathname !== '/arcade' && router.push("/arcade") }}>
                <svg className="fill-current" width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9985 0.306641C15.0333 0.306996 15.9892 3.6749 16.5297 8.37305C16.7792 10.8679 16.5715 12.9469 15.0746 12.9053C12.9129 12.9051 12.8294 10.952 11.2914 10.0371C10.7094 9.74607 9.42029 9.62069 8.33928 9.5791C7.25825 9.62068 5.96928 9.74607 5.38713 10.0371C3.84869 10.9519 3.76509 12.9053 1.60295 12.9053C0.0646627 12.9052 -0.185127 10.8267 0.105881 8.33203C0.604837 3.675 1.56178 0.306641 4.59709 0.306641C6.13531 0.306836 6.88373 1.88692 8.29729 2.01172C9.66941 1.88698 10.46 0.306641 11.9985 0.306641ZM4.63811 3.63281C3.43243 3.63297 2.476 4.63173 2.476 5.7959C2.47626 6.95986 3.4326 7.95785 4.63811 7.95801C5.80218 7.95801 6.79995 7.00151 6.80022 5.7959C6.80022 4.59006 5.84392 3.63281 4.63811 3.63281ZM11.7905 3.7168V5.37988H10.0854V6.21094H11.7905V7.91602H12.6215V6.21094H14.3266V5.37988H12.6215V3.7168H11.7905ZM4.63811 4.54883C4.97071 4.54886 5.30328 4.71595 5.51115 4.92383C5.7605 5.17327 5.88518 5.46432 5.88518 5.79688C5.88508 6.12942 5.71899 6.46208 5.51115 6.66992C5.26172 6.91932 4.97067 7.04392 4.63811 7.04395C4.30557 7.04395 3.97297 6.87774 3.76506 6.66992C3.51566 6.42051 3.39111 6.1294 3.39104 5.79688C3.39104 5.46427 3.51564 5.13174 3.76506 4.92383C4.01454 4.67434 4.30547 4.54883 4.63811 4.54883Z" />
                </svg>
                <div className={clsx(textCls, '')}>Arcade</div>
                { pathname === '/arcade' && <LineBottom />}
              </div>
            </div>
          )
        }
        <div
          onClick={() => router.push("/")}
          className={clsx(
            `bg-contain relative bg-no-repeat bg-center hover:cursor-pointer`,
            isMobile
              ? "w-[160px] h-[40px] bg-[url('/images/mobile/logo.svg')]"
              : "w-[240px] h-[60px] bg-[url('/images/header/logo_bg.svg')]"
          )}
        ></div>

      </div>

      <div className="min-w-[120px] flex justify-end">
        {isMobile ? (
          <div className="w-[40px] h-[40px] flex items-center">
            <Sound />
          </div>
        ) : (
          <ConnectWallet />
        )}
      </div>
    </header>
  );
};

export default MainLayoutHeader;

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

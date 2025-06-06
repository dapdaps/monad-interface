import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import Rpc from "@/components/rpc";
import Sound from "@/components/sound";
import useIsMobile from "@/hooks/use-isMobile";
import FooterMobile from './mobile/footer'

export default memo(function Footer() {

  const isMobile = useIsMobile();

  if (isMobile) return <FooterMobile />;

  return (
    <div className="z-[99] fixed bottom-0 left-0 flex items-center gap-[16px] pl-[12px] w-[164px] h-[38px] bg-[url('/images/footer/footer_bg.svg')] bg-no-repeat">
      <Link
        className="hover:scale-110 ease-in-out duration-300 w-[17px] h-[18px] cursor-pointer"
        href="https://app.dapdap.net?from=monad"
        target="_blank"
        data-bp="1001-009"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
        >
          <path
            d="M1.08816 8.87612C0.789309 7.5718 2.19803 4.2261 2.19803 4.2261L9.74377 3.72462C11.2032 3.33357 12.7033 4.19965 13.0943 5.65907L16.2852 10.9175C15.7723 13.4823 15.3472 14.9363 13.8878 15.3274L6.23966 17.5317C4.78024 17.9228 3.28014 17.0567 2.88909 15.5973L1.08816 8.87612Z"
            fill="#EBF479"
          />
          <path
            d="M2.03536 6.03454C1.63263 4.53154 2.52458 2.98663 4.02759 2.5839L10.9495 0.729189C12.4525 0.326459 13.9974 1.21841 14.4001 2.72142L16.2548 9.64331C16.6576 11.1463 15.7656 12.6912 14.2626 13.0939L7.34071 14.9487C5.83771 15.3514 4.2928 14.4594 3.89007 12.9564L2.03536 6.03454Z"
            fill="#181A27"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.1318 1.40955L4.20989 3.26426C3.08263 3.56631 2.41367 4.72499 2.71572 5.85224L4.57043 12.7741C4.87248 13.9014 6.03116 14.5704 7.15841 14.2683L14.0803 12.4136C15.2076 12.1115 15.8765 10.9529 15.5745 9.82561L13.7198 2.90372C13.4177 1.77646 12.259 1.1075 11.1318 1.40955ZM4.02759 2.5839C2.52458 2.98663 1.63263 4.53154 2.03536 6.03454L3.89007 12.9564C4.2928 14.4594 5.83771 15.3514 7.34071 14.9487L14.2626 13.094C15.7656 12.6912 16.6576 11.1463 16.2548 9.64331L14.4001 2.72142C13.9974 1.21841 12.4525 0.326459 10.9495 0.729189L4.02759 2.5839Z"
            fill="#EBF479"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.53421 4.50977L7.06728 4.90283C6.55476 5.04016 6.25061 5.56697 6.38794 6.07948C6.52527 6.592 7.05207 6.89615 7.56459 6.75882L8.86252 6.41104C9.47913 6.24582 10.1129 6.61175 10.2782 7.22836C10.4434 7.84497 10.0774 8.47877 9.46084 8.64399L8.17893 8.98748C7.65756 9.12718 7.34816 9.66308 7.48786 10.1844C7.62756 10.7058 8.16346 11.0152 8.68483 10.8755L10.1357 10.4868C11.7862 10.0445 12.7657 8.348 12.3235 6.6975C11.8812 5.047 10.1847 4.06752 8.53421 4.50977Z"
            fill="#EBF479"
          />
        </svg>
      </Link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1"
        height="16"
        viewBox="0 0 1 16"
        fill="none"
      >
        <path d="M0.5 0V15.5" stroke="#3E347C" />
      </svg>
      <Link
        className="ease-in-out duration-300 w-[12px] h-[12px] cursor-pointer"
        href="https://x.com/0xNADSA"
        target="_blank"
        data-bp="1001-010"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
        >
          <path
            d="M7.1428 5.47068L11.6108 0.388916H10.5524L6.6712 4.80044L3.5736 0.388916H0L4.6852 7.06056L0 12.3889H1.0584L5.1544 7.7292L8.4264 12.3889H12M1.4404 1.16987H3.0664L10.5516 11.6463H8.9252"
            fill="white"
          />
        </svg>
      </Link>
      <Link
        className="hover:scale-110 ease-in-out duration-300 w-[15px] h-[13px] cursor-pointer"
        href="https://t.me/DapDapDiscussion"
        target="_blank"
        data-bp="1001-011"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="13"
          viewBox="0 0 15 13"
          fill="none"
        >
          <path
            d="M5.643 11.6629L5.87603 8.30668L12.2677 2.81609C12.5506 2.57012 12.2094 2.4511 11.8349 2.66533L3.94523 7.41803L0.533028 6.38656C-0.199346 6.1882 -0.207669 5.7042 0.699476 5.35509L13.9904 0.467506C14.5979 0.205671 15.1805 0.610325 14.9475 1.49898L12.6838 11.6629C12.5257 12.385 12.0679 12.5595 11.4354 12.2263L7.98993 9.79835L6.33376 11.3297C6.14235 11.5122 5.98422 11.6629 5.643 11.6629Z"
            fill="white"
          />
        </svg>
      </Link>
      <Link
        className="hover:scale-110 ease-in-out duration-300 w-[16px] h-[10px] cursor-pointer"
        href="https://discord.com/invite/dapdapmeup"
        target="_blank"
        data-bp="1001-012"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="11"
          viewBox="0 0 16 11"
          fill="none"
        >
          <path
            d="M8 0.879929C4.81493 0.879929 2.58063 2.08134 2.58063 2.08134C3.80475 1.12021 5.94397 0.566517 5.94397 0.566517L5.74193 0.388916C3.73344 0.420257 1.9151 1.64257 1.9151 1.64257C-0.129049 5.39307 0.00168121 8.63166 0.00168121 8.63166C1.66552 10.5226 4.13751 10.3868 4.13751 10.3868L4.98132 9.44654C3.49575 9.16446 2.55686 8.00484 2.55686 8.00484C2.55686 8.00484 4.79116 9.34206 8 9.34206C11.2088 9.34206 13.4431 8.00484 13.4431 8.00484C13.4431 8.00484 12.5043 9.16446 11.0187 9.44654L11.8625 10.3868C11.8625 10.3868 14.3345 10.5226 15.9983 8.63166C15.9983 8.63166 16.129 5.39307 14.0849 1.64257C14.0849 1.64257 12.2666 0.420257 10.2581 0.388916L10.056 0.566517C10.056 0.566517 12.1953 1.12021 13.4194 2.08134C13.4194 2.08134 11.1851 0.879929 8 0.879929ZM5.53989 4.83937C6.31239 4.83937 6.94227 5.43486 6.93039 6.16615C6.93039 6.887 6.31239 7.49293 5.53989 7.49293C4.77928 7.49293 4.16128 6.887 4.16128 6.16615C4.16128 5.43486 4.76739 4.83937 5.53989 4.83937ZM10.4958 4.83937C11.2683 4.83937 11.8863 5.43486 11.8863 6.16615C11.8863 6.887 11.2683 7.49293 10.4958 7.49293C9.73515 7.49293 9.11715 6.887 9.11715 6.16615C9.11715 5.43486 9.72326 4.83937 10.4958 4.83937Z"
            fill="white"
          />
        </svg>
      </Link>

      {/* <Link
        className="hover:scale-110 ease-in-out duration-300 w-[16px] h-[16px] cursor-pointer"
        href="https://dapdap.mirror.xyz/FSRc-5-o7gHVfTnFDgYPFOMktA7kWreb-m0S3paQCdk"
        target="_blank"
        data-bp="1001-013"
      >
        <Image
          src="/images/mirror.png"
          alt="Mirror"
          width={16}
          height={16}
          className="cursor-pointer"
        />
      </Link> */}
      <div className="fixed right-[10px] bottom-[6px] z-50 flex items-center gap-[8px]">
        {
          !isMobile && <Sound />
        }
        <Rpc />
      </div>
    </div>
  );
});

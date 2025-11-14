"use client";

import { ReactNode, useMemo, useState } from "react";
import clsx from "clsx";
import { useProgressRouter } from "@/hooks/use-progress-router";
import { useUser } from "@/hooks/use-user";
import { formatLongText } from "@/utils/utils";
import { numberFormatter } from "@/utils/number-formatter";
import dayjs from "dayjs";
import TabTable from "./table";
import { GridTableAlign } from "@/components/flex-table/grid-table";
import HexagonButton from "@/components/button/hexagon";
import { useUserRP } from "../../hooks/use-user-rp";
import { useInvite } from "../../hooks/use-invite";
import Popover, { PopoverPlacement, PopoverTrigger } from "@/components/popover";
import { BoosterItems } from "../../config";
import { shareReferral } from "../../lib";

interface EarningSection {
    key: string;
    icon: React.ReactNode;
    title: string;
    summary: string | ReactNode;
    buttonText: string;
    buttonRoute: string;
    description: string;
    tiers?: {
        volume: string;
        fees: string;
        reward: string;
    }[];
}

const EarnBP = ({ allBonus, allBonusLoading }: { allBonus: any, allBonusLoading: boolean }) => {
    const router = useProgressRouter();
    const { userInfo } = useUser();

    const totalBoost = useMemo(() => {
        if (!allBonus || allBonusLoading || Object.keys(allBonus).length === 0) {
            return 0;
        }
        return BoosterItems.reduce((sum, item) => sum + (allBonus[item.key] ? item.boost : 0), 0);
    }, [allBonus, allBonusLoading]);

    const [expandedSections, setExpandedSections] = useState<Set<string>>(
        new Set(["referral"])
    );
    const [rotationAngle, setRotationAngle] = useState(0);

    const toggleSection = (key: string) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(key)) {
            newExpanded.delete(key);
        } else {
            newExpanded.add(key);
        }
        setExpandedSections(newExpanded);
    };

    const { userRP, getUserRP } = useUserRP()
    const { invite, page, setPage, inviteLoading, getInvite } = useInvite()

    const sections: EarningSection[] = [
        {
            key: "referral",
            icon: (
                <svg width="43" height="38" viewBox="0 0 43 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_392_8502)">
                        <path d="M23.3682 16.8418H32.7373V20.8418H23.3682V27.6846H19.3682V20.8418H10V16.8418H19.3682V10H23.3682V16.8418Z" fill="white" />
                    </g>
                    <defs>
                        <filter id="filter0_d_392_8502" x="0" y="0" width="42.7383" height="37.6846" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_392_8502" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_392_8502" result="shape" />
                        </filter>
                    </defs>
                </svg>
            ),
            title: "REFFERRAL",
            summary: <div className="flex items-center gap-[10px]">
                <span className="text-[#A1AECB]">{invite?.total || 0} invites</span> |
                <span className="text-white">{numberFormatter(invite?.total_rp_earned || 0, 2, true)} RP</span>
            </div>,
            buttonText: "INVITE",
            buttonRoute: '',
            description: "Invite friends to NADSA and earn 5% of their RP — this 5% is not affected by any RP bonuses.",
        },
        {
            key: "swap",
            icon: (
                <svg width="44" height="38" viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_392_8365)">
                        <path d="M10.0657 15.9637C10.0613 15.9561 10.0613 15.9442 10.0566 15.9354L10.0446 15.8876C10.0446 15.8784 10.0402 15.8708 10.0402 15.8636L10.0283 15.811C10.0283 15.7991 10.0239 15.7915 10.0239 15.7839C10.0207 15.7672 10.0207 15.7464 10.0163 15.7313C10.0163 15.7193 10.0116 15.7102 10.0116 15.6982C10.0116 15.6834 10.0072 15.6667 10.0072 15.6503C10.0044 15.64 10.0044 15.6232 10.0044 15.6101V15.6117C10.0044 15.5997 10 15.5878 10.0044 15.5666C10 15.5427 10 15.514 10 15.4869C10 15.4586 10.0044 15.4343 10.0044 15.406L10.0072 15.3669L10.0116 15.3262C10.0116 15.3099 10.0116 15.2931 10.0163 15.2784C10.0163 15.2664 10.0207 15.2572 10.0207 15.2453C10.0211 15.2281 10.0239 15.211 10.0283 15.1942C10.0283 15.1807 10.0327 15.1731 10.0327 15.1659L10.0446 15.1137C10.0446 15.1045 10.0446 15.097 10.049 15.0898L10.0609 15.0419C10.0653 15.0344 10.0653 15.0224 10.0697 15.0148C10.0725 15.0013 10.0816 14.9849 10.086 14.9698L10.098 14.9367C10.1024 14.9247 10.1099 14.9096 10.1131 14.8976L10.1282 14.8617C10.131 14.8498 10.1386 14.8378 10.143 14.8255C10.1462 14.8135 10.1521 14.7971 10.1609 14.7848C10.1685 14.776 10.1713 14.7637 10.176 14.7577C10.1804 14.7397 10.188 14.7278 10.1971 14.7126C10.2039 14.7058 10.2095 14.6975 10.2135 14.6887C10.221 14.672 10.2302 14.6604 10.239 14.6437C10.2453 14.6369 10.2501 14.6293 10.2541 14.6213C10.2629 14.6046 10.2752 14.5914 10.284 14.5763C10.2872 14.5675 10.2959 14.5595 10.3007 14.5524L10.3338 14.5073L10.3533 14.4834C10.3624 14.4714 10.3696 14.4595 10.382 14.4475C10.3907 14.4355 10.4031 14.428 10.4118 14.416C10.4206 14.4084 10.4285 14.3949 10.4357 14.3877L10.4943 14.3275L14.4468 10.4817C15.1131 9.83943 16.1686 9.83943 16.8349 10.4817C17.4948 11.1236 17.4948 12.1618 16.8349 12.8037L15.7623 13.8463H32.2149C33.1508 13.8463 33.9052 14.5842 33.9052 15.4901C33.9052 16.4007 33.1461 17.1355 32.2149 17.1355H11.6811C11.6572 17.1355 11.6286 17.1307 11.5987 17.1307L11.5629 17.1263L11.5206 17.1235C11.5039 17.1239 11.4872 17.1227 11.4712 17.1191C11.4593 17.1191 11.4501 17.1147 11.4382 17.1147C11.4207 17.1139 11.4027 17.1115 11.3856 17.1072C11.3721 17.1072 11.3645 17.1028 11.3553 17.1028L11.3028 17.0908C11.2892 17.0876 11.2817 17.0876 11.2729 17.0832L11.2251 17.0713C11.216 17.0669 11.2028 17.0669 11.1948 17.0621L11.1498 17.0474L11.1168 17.0338L11.0746 17.0187L11.0387 17.0067L11.0013 16.9899C10.9893 16.9868 10.973 16.9824 10.9607 16.9732C10.9519 16.9656 10.9395 16.9628 10.9308 16.9585C10.9156 16.9541 10.9005 16.9465 10.8858 16.9373C10.8782 16.9309 10.8694 16.9258 10.8603 16.9222L10.8153 16.8983C10.8077 16.8919 10.799 16.8867 10.7898 16.8835C10.7747 16.8743 10.7611 16.8624 10.7448 16.8532C10.7356 16.85 10.7285 16.8412 10.7209 16.8384L10.6759 16.8054L10.6504 16.7874L10.613 16.7575C10.601 16.7499 10.5934 16.738 10.5815 16.7304L10.5516 16.7065C10.5321 16.6853 10.511 16.6702 10.4899 16.6495C10.4688 16.6299 10.4524 16.6088 10.4329 16.5897C10.4242 16.5821 10.4162 16.5701 10.409 16.561C10.3999 16.549 10.3863 16.5414 10.3792 16.5295C10.37 16.5175 10.3581 16.5055 10.3505 16.4932L10.3294 16.4693C10.3174 16.4545 10.3039 16.441 10.2951 16.4242C10.2923 16.4166 10.2844 16.4095 10.28 16.4019C10.2712 16.3855 10.2589 16.372 10.2501 16.3568C10.2426 16.3481 10.2382 16.3405 10.235 16.3329L10.2095 16.2894L10.1932 16.2639C10.1888 16.2492 10.1812 16.2368 10.1721 16.2221C10.1645 16.2133 10.1601 16.2013 10.1557 16.1922C10.1529 16.1802 10.1438 16.1651 10.1394 16.1531C10.1362 16.1411 10.1275 16.1292 10.1227 16.1172L10.1107 16.0797L10.094 16.0391L10.082 16.0092C10.0733 15.9952 10.0701 15.9789 10.0657 15.9637ZM33.9956 22.5892L33.9928 22.6298L33.9884 22.6705C33.9884 22.6856 33.9884 22.702 33.984 22.7183C33.984 22.7303 33.9793 22.7379 33.9793 22.7498C33.9789 22.7674 33.9761 22.7853 33.9717 22.8025C33.9717 22.8144 33.9673 22.822 33.9673 22.8296L33.9554 22.8822C33.9554 22.8914 33.9554 22.8985 33.951 22.9061L33.939 22.954C33.9343 22.9631 33.9343 22.9751 33.9299 22.9827C33.9267 22.9962 33.9179 23.011 33.9135 23.0261C33.9104 23.0397 33.906 23.0473 33.9016 23.0592L33.8865 23.0999L33.8717 23.1358C33.8689 23.1477 33.861 23.1601 33.8566 23.1721C33.8534 23.184 33.8478 23.1992 33.8387 23.2111C33.8311 23.2199 33.8283 23.2323 33.8239 23.2394C33.8192 23.2546 33.812 23.2677 33.8028 23.2845C33.7953 23.2921 33.7909 23.2996 33.7861 23.3068C33.7785 23.3232 33.7698 23.3367 33.7606 23.3519C33.753 23.3606 33.7487 23.3686 33.7455 23.3758C33.7367 23.3909 33.7244 23.4041 33.7156 23.4208C33.7124 23.4284 33.7037 23.436 33.6989 23.4432C33.6869 23.4595 33.6794 23.4731 33.6658 23.4882L33.6463 23.5121C33.6371 23.5241 33.6296 23.5361 33.616 23.5484C33.6041 23.5604 33.5965 23.5723 33.583 23.5843C33.5742 23.5919 33.5666 23.6054 33.5591 23.6126L33.5005 23.6728L29.5464 27.5186C28.888 28.1605 27.8215 28.1605 27.1615 27.5186C26.5016 26.8767 26.5016 25.8385 27.1615 25.1966L28.2325 24.154H11.7755C10.8412 24.154 10.0864 23.416 10.0864 22.5102C10.0864 21.5996 10.8455 20.8648 11.7755 20.8648H32.3141C32.338 20.8648 32.3666 20.8692 32.3965 20.8692C32.4084 20.8692 32.4204 20.8736 32.4339 20.8736L32.4746 20.8768C32.4913 20.8768 32.5092 20.8768 32.5239 20.8812C32.5359 20.8812 32.5451 20.886 32.557 20.886C32.5745 20.8864 32.5925 20.8891 32.6096 20.8935C32.6247 20.8935 32.6323 20.8979 32.6398 20.8979L32.6924 20.9099C32.7072 20.9127 32.7147 20.9127 32.7223 20.9175L32.7717 20.9294C32.7808 20.9342 32.7928 20.9342 32.8019 20.9386L32.847 20.9533L32.8784 20.9669L32.9206 20.982L32.9581 20.994L32.9939 21.0103C33.0075 21.0135 33.0238 21.0179 33.0345 21.0271C33.0433 21.0347 33.0572 21.0375 33.0644 21.0418C33.0811 21.0466 33.0947 21.0538 33.1094 21.063C33.117 21.0694 33.1257 21.0745 33.1349 21.0781L33.1799 21.102C33.1891 21.1096 33.1962 21.114 33.2054 21.1172C33.2205 21.126 33.2341 21.1383 33.2504 21.1471C33.258 21.1503 33.2671 21.1591 33.2759 21.1622L33.3209 21.1953L33.3452 21.2133C33.3572 21.2221 33.3707 21.2312 33.3826 21.2432C33.3946 21.2508 33.4037 21.2627 33.4141 21.2703L33.444 21.2942L33.5057 21.3512L33.5643 21.4114C33.5734 21.419 33.581 21.431 33.5882 21.4397C33.5973 21.4517 33.6093 21.4593 33.6164 21.4712L33.6467 21.5075L33.6662 21.5314C33.6798 21.5466 33.6917 21.5597 33.7005 21.5765C33.7037 21.5841 33.7124 21.5916 33.7156 21.5988C33.7244 21.6156 33.7367 21.6287 33.7455 21.6439C33.7522 21.6506 33.7578 21.659 33.7618 21.6678C33.7694 21.6845 33.7785 21.6961 33.7873 21.7112C33.7949 21.72 33.7976 21.728 33.8024 21.7368C33.8068 21.7519 33.8144 21.7639 33.8235 21.7786C33.8311 21.7874 33.8355 21.7998 33.8399 21.8085L33.8566 21.8476C33.861 21.8596 33.8685 21.8715 33.8717 21.8835L33.8865 21.921L33.9016 21.9616L33.9151 21.9915C33.9227 22.0055 33.9275 22.0206 33.9299 22.0366C33.9343 22.0442 33.9343 22.0561 33.939 22.0649L33.951 22.1127C33.951 22.1219 33.951 22.1291 33.9554 22.137L33.9673 22.1897C33.9673 22.2016 33.9717 22.2092 33.9717 22.2168C33.9761 22.2335 33.9761 22.2543 33.9793 22.2694C33.9793 22.2814 33.984 22.2905 33.984 22.3025C33.984 22.3173 33.9884 22.334 33.9884 22.3503C33.9928 22.3623 33.9928 22.3775 33.9928 22.3894C33.9956 22.4058 33.9956 22.4177 33.9956 22.4297C34 22.4536 34 22.4807 34 22.5106C34.0004 22.5369 33.9956 22.5609 33.9956 22.5892Z" fill="white" />
                    </g>
                    <defs>
                        <filter id="filter0_d_392_8365" x="0" y="0" width="44" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_392_8365" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_392_8365" result="shape" />
                        </filter>
                    </defs>
                </svg>

            ),
            title: "SWAP",
            summary: `${numberFormatter(userRP?.swap_rp || 0, 2, true)} RP`,
            buttonText: "SWAP",
            buttonRoute: "/superswap",
            description: "",
            tiers: [
                { volume: "$1,000 Volume", fees: "/ 10$ in fees", reward: "+1 RP" },
                { volume: "$10,000 Volume", fees: "/ 100$ in fees", reward: "+10 RP" },
                { volume: "$100,000 Volume", fees: "/ 1,000$ in fees", reward: "+100 RP" },
                { volume: "$1,000,000 Volume", fees: "/ 10,000$ in fees", reward: "+1,000 RP" },
            ],
        },
        {
            key: "bridge",
            icon: (
                <svg width="49" height="40" viewBox="0 0 49 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_392_8382)">
                        <path d="M38.1987 19.7012L32.5976 29.4023L29.9309 27.8622L33.7527 21.2413H29.6406V18.161H33.7527L29.9309 11.5402L32.5976 10L38.1987 19.7012Z" fill="white" />
                        <path d="M10.0005 19.7012L15.6016 29.4023L18.2683 27.8622L14.4465 21.2413H18.5586V18.161H14.4465L18.2683 11.5402L15.6016 10L10.0005 19.7012Z" fill="white" />
                        <path d="M26.393 19.7014C26.393 21.0466 25.3025 22.1371 23.9572 22.1371C22.612 22.1371 21.5215 21.0466 21.5215 19.7014C21.5215 18.3562 22.612 17.2656 23.9572 17.2656C25.3025 17.2656 26.393 18.3562 26.393 19.7014Z" fill="white" />
                    </g>
                    <defs>
                        <filter id="filter0_d_392_8382" x="0" y="0" width="48.1992" height="39.4023" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_392_8382" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_392_8382" result="shape" />
                        </filter>
                    </defs>
                </svg>
            ),
            title: "BRIDGE",
            summary: `${numberFormatter(userRP?.bridge_rp || 0, 2, true)} RP`,
            buttonText: "BRIDGE",
            buttonRoute: "/bridge",
            description: "",
            tiers: [
                { volume: "$10,000 Volume", fees: "/ 10$ in fees", reward: "+1 RP" },
                { volume: "$100,000 Volume", fees: "/ 100$ in Fees", reward: "+10 RP" },
                { volume: "$1,000,000 Volume", fees: "/ 1,000$ in fees", reward: "+100 RP" },
                { volume: "$10,000,000 Volume", fees: "/ 10,000$ in fees", reward: "+1,000 RP" },
            ],
        },
        {
            key: "arcade",
            icon: (
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.4 6.66672H3.04615C2.86662 6.66672 2.69444 6.74065 2.5675 6.87226C2.44055 7.00386 2.36923 7.18235 2.36923 7.36847C2.36923 7.55459 2.44055 7.73308 2.5675 7.86468C2.69444 7.99629 2.86662 8.07022 3.04615 8.07022H4.4V9.47373C4.4 9.56588 4.41751 9.65714 4.45153 9.74228C4.48555 9.82742 4.53541 9.90478 4.59827 9.96994C4.66112 10.0351 4.73575 10.0868 4.81788 10.1221C4.9 10.1573 4.98803 10.1755 5.07692 10.1755C5.16582 10.1755 5.25384 10.1573 5.33597 10.1221C5.4181 10.0868 5.49272 10.0351 5.55558 9.96994C5.61844 9.90478 5.6683 9.82742 5.70232 9.74228C5.73634 9.65714 5.75385 9.56588 5.75385 9.47373V8.07022H7.10769C7.28722 8.07022 7.4594 7.99629 7.58635 7.86468C7.7133 7.73308 7.78462 7.55459 7.78462 7.36847C7.78462 7.18235 7.7133 7.00386 7.58635 6.87226C7.4594 6.74065 7.28722 6.66672 7.10769 6.66672H5.75385V5.26322C5.75385 5.17106 5.73634 5.07981 5.70232 4.99467C5.6683 4.90953 5.61844 4.83217 5.55558 4.767C5.49272 4.70184 5.4181 4.65015 5.33597 4.61488C5.25384 4.57962 5.16582 4.56146 5.07692 4.56146C4.98803 4.56146 4.9 4.57962 4.81788 4.61488C4.73575 4.65015 4.66112 4.70184 4.59827 4.767C4.53541 4.83217 4.48555 4.90953 4.45153 4.99467C4.41751 5.07981 4.4 5.17106 4.4 5.26322V6.66672ZM14.3596 15.0093C14.1553 13.2737 12.729 11.9299 11 11.9299C9.27097 11.9299 7.84469 13.2739 7.64043 15.0093C6.95505 17.9804 5.60932 20 4.06154 20C1.81838 20 0 15.7584 0 10.5264C0 6.56567 1.04195 3.1727 2.52154 1.75744C3.56349 0.672005 5.00585 7.72633e-05 6.6 7.72633e-05H6.81272L6.8134 0.000954389C6.95714 -0.00565833 7.1004 0.0224358 7.23188 0.0830215C7.36336 0.143607 7.47947 0.235028 7.57105 0.350076H7.57206C8.13865 1.07235 9.46 1.57902 11 1.57902C12.54 1.57902 13.8614 1.07235 14.4279 0.350076H14.4288C14.5204 0.235004 14.6365 0.143569 14.768 0.0829818C14.8995 0.0223951 15.0428 -0.00568589 15.1866 0.000954389L15.1873 7.72633e-05H15.4C16.994 7.72633e-05 18.4365 0.672005 19.4785 1.75744C20.958 3.1727 22 6.56567 22 10.5264C22 15.7584 20.1816 20 17.9385 20C16.3907 20 15.045 17.9804 14.3596 15.0093ZM17.2615 9.47373C18.383 9.47373 19.2923 8.5311 19.2923 7.36847C19.2923 6.20584 18.383 5.26322 17.2615 5.26322C16.14 5.26322 15.2308 6.20584 15.2308 7.36847C15.2308 8.5311 16.14 9.47373 17.2615 9.47373Z" fill="white" />
                </svg>
            ),
            title: "ARCADE",
            summary: `${numberFormatter(userRP?.game_rp || 0, 2, true)} RP`,
            buttonText: "PLAY",
            buttonRoute: "/arcade",
            description: "",
            tiers: [
                { volume: "$100 Volume", fees: "/ 5$ Loss", reward: "+1 RP" },
                { volume: "$1,000 Volume", fees: "/ 50$ Loss", reward: "+10 RP" },
                { volume: "$10,000 Volume", fees: "/ 500$ Loss", reward: "+100 RP" },
                { volume: "$100,000 Volume", fees: "/ 5,000$ Loss", reward: "+1,000 RP" },
            ],
        },
    ];

    return (
        <div className="w-full pt-[20px]">
            <div className="py-[20px] flex items-center justify-center gap-[10px] relative">
                <div className="text-white text-[32px] font-Oxanium font-[600]">{userRP?.total_rp} RP</div>

                <Popover
                    content={
                        <div
                            className="px-[20px] py-[10px] w-[220px] text-[14px] border rounded-[4px] border-[#34304B] bg-[linear-gradient(180deg,_#1D1A2E_0%,_#252532_67.99%)]"
                        >
                            <div className="flex items-center justify-between py-[5px]">
                                <div className="text-[#9BADD3]">Basic</div>
                                <div className="text-white">{userRP?.basic_rp} RP</div>
                            </div>
                            <div className="flex items-center justify-between py-[5px]">
                                <div className="text-[#9BADD3]">Boost</div>
                                <div className="text-[#BFFF60]">{userRP?.boost_rp} RP</div>
                            </div>
                        </div>
                    }
                    trigger={PopoverTrigger.Hover}
                    placement={PopoverPlacement.Bottom}
                >
                    <div className="flex items-center gap-1 px-4 h-[30px] bg-[#2D2948] rounded-[4px] cursor-pointer">
                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity={totalBoost > 0 ? "1" : "0.3"} d="M7.08896 6.55364L10.4365 0H3.6343L0 9.81818H6.66749L4.21123 18L14 6.55364H7.08896Z" fill={totalBoost > 0 ? "#BFFF60" : "white"} />
                        </svg>

                        <span className={clsx("text-[16px]", totalBoost > 0 ? "opacity-100 text-[#BFFF60]" : "opacity-30 text-white")}>
                            +{totalBoost}%
                        </span>
                    </div>
                </Popover>

                <div onClick={() => {
                    setRotationAngle(prev => prev + 360);
                    getUserRP();
                    getInvite();
                }} className="absolute right-0 bottom-[20px] flex items-center justify-center w-[30px] h-[26px] border border-[#382F6F] rounded-[2px] cursor-pointer">
                    <svg 
                        width="15" 
                        height="15" 
                        viewBox="0 0 15 15" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform duration-[1000ms] ease-in-out"
                        style={{ transform: `rotate(${rotationAngle}deg)` }}
                    >
                        <path d="M8.4375 15L9.375 11.25H11.6672C12.6045 10.226 13.1246 8.88822 13.125 7.5C13.125 4.94063 11.4113 2.71406 9.07125 2.02125C8.68875 1.90875 8.4375 1.54313 8.4375 1.14375C8.4375 0.537188 9.01594 0.0703125 9.59812 0.240938C12.7181 1.15969 15 4.08656 15 7.5C15 11.2847 12.0806 14.4872 8.4375 15ZM0 7.5C0 3.71625 2.91938 0.512812 6.5625 0L5.625 3.75H3.33281C2.3955 4.77401 1.87544 6.11178 1.875 7.5C1.875 10.0594 3.58875 12.2859 5.92875 12.9778C6.11462 13.0369 6.27657 13.1542 6.39068 13.3124C6.5048 13.4706 6.56503 13.6612 6.5625 13.8562C6.5625 14.4628 5.98406 14.9297 5.40188 14.7591C2.28188 13.8403 0 10.9134 0 7.5Z" fill="#66657E" />
                    </svg>
                </div>
            </div>

            {sections.map((section) => {
                const isExpanded = expandedSections.has(section.key);
                const isReferral = section.key === "referral";

                return (
                    <div
                        key={section.key}
                        className={clsx(
                            "w-full mb-[20px]",
                        )}
                    >
                        <div className="flex items-center justify-between h-[60px]">
                            <div className="flex items-center gap-[15px] flex-1">
                                <div className="w-[58px] h-[46px] flex items-center justify-center border border-[#836EF9] shrink-0 [background:radial-gradient(66%_50%_at_47.77%_50%,_#553BE4_0%,_#221662_100%)]">
                                    {section.icon}
                                </div>

                                <div className="flex items-center justify-between gap-[10px] flex-1 bg-[#836EF940] h-[48px] px-[10px]">
                                    <button
                                        type="button"
                                        onClick={() => toggleSection(section.key)}
                                        className="flex items-center gap-[8px] text-white text-[16px] font-Oxanium font-[600] uppercase hover:opacity-80 transition-opacity"
                                    >
                                        {section.title}
                                        <svg className={clsx(
                                            "transition-transform duration-200",
                                            !isExpanded ? "rotate-180" : ""
                                        )} width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.609375 6.26172L7.10938 1.26172L13.6094 6.26172" stroke="#A1AECB" stroke-width="2" />
                                        </svg>

                                    </button>

                                    <div className="flex items-center justify-center gap-[10px]">
                                        <span className="text-white text-[14px] font-[500]">
                                            {section.summary}
                                        </span>

                                        <HexagonButton
                                            onClick={() => {
                                                if (isReferral) {
                                                    shareReferral(userInfo?.invite_code || '');
                                                    return
                                                }
                                                router.push(section.buttonRoute)
                                            }}
                                            className="!h-[30px] !text-[16px]"
                                        >
                                            <div className="flex gap-[5px] items-center">
                                                {section.buttonText}
                                                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.77344 4.33562C9.4401 4.72052 9.4401 5.68277 8.77344 6.06767L1.50549 10.2638C0.619453 10.7754 -0.372089 9.78383 0.139462 8.89779L1.98476 5.70164C2.1634 5.39224 2.16339 5.01104 1.98476 4.70164L0.139462 1.50549C-0.372089 0.619455 0.619455 -0.372089 1.50549 0.139462L8.77344 4.33562Z" fill="#836EF9" />
                                                </svg>
                                            </div>
                                        </HexagonButton>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Expanded Content */}
                        {isExpanded && (
                            <div className="py-[20px]">
                                {isReferral ? (
                                    <>
                                        {section.description && (
                                            <div className="mb-[20px] text-[#A1AECB] text-[14px] font-[400] pl-[70px]">
                                                {section.description}
                                            </div>
                                        )}

                                        <TabTable
                                            className="!border-0 pl-[68px]"
                                            headerRowClassName="!pt-[10px] !pb-[0px] !text-[#A1AECB]"
                                            columns={[
                                                {
                                                    dataIndex: "invited",
                                                    title: "Invited",
                                                    width: 200,
                                                    sort: false,
                                                    render: (record: any) => {
                                                        return (
                                                            <div className="flex items-center gap-[10px] pl-[10px]">
                                                                <div
                                                                    className="w-[28px] h-[28px] rounded-full bg-center bg-no-repeat shrink-0"
                                                                    style={{
                                                                        backgroundImage: record.avatar
                                                                            ? `url(${record.avatar})`
                                                                            : "conic-gradient(from 180deg, rgb(0, 209, 255) 0deg, rgb(255, 0, 138) 360deg)",
                                                                    }}
                                                                />
                                                                <div className="text-white text-[14px] font-Oxanium font-[400]">
                                                                    {formatLongText(record.address, 5, 4)}
                                                                </div>
                                                            </div>
                                                        );
                                                    },
                                                },
                                                {
                                                    dataIndex: "joined",
                                                    title: "Joined",
                                                    width: 200,
                                                    sort: false,
                                                    render: (record: any) => {
                                                        return (
                                                            <div className="text-[#A1AECB] text-[14px] font-Oxanium font-[400]">
                                                                {dayjs(record.created_at).utc().format("YYYY/MM/DD HH:mm:ss")}
                                                            </div>
                                                        );
                                                    },
                                                },
                                                {
                                                    dataIndex: "earned",
                                                    title: "Earned",
                                                    width: 120,
                                                    sort: false,
                                                    align: GridTableAlign.Right,
                                                    render: (record: any) => {
                                                        return (
                                                            <div className="text-[#A1AECB] text-[14px] font-Oxanium font-[400]">
                                                                {numberFormatter(record.rp || 0, 2, true)} RP
                                                            </div>
                                                        );
                                                    },
                                                },
                                                {
                                                    dataIndex: "your_share",
                                                    title: "Your share",
                                                    align: GridTableAlign.Right,
                                                    render: (record: any) => {
                                                        return (
                                                            <div className="text-white text-[14px] font-Oxanium font-[400] pr-[10px]">
                                                                {numberFormatter(record.reward_rp || 0, 2, true)} RP
                                                            </div>
                                                        );
                                                    },
                                                },
                                            ]}
                                            showPage={invite?.total_page > 1}
                                            data={invite?.data}
                                            loading={inviteLoading}
                                            page={page}
                                            pageSize={10}
                                            pageTotal={invite?.total_page || 0}
                                            onPageChange={() => {
                                                setPage(page + 1);
                                            }}
                                        />
                                    </>
                                ) : (
                                    <div className="space-y-[8px]">
                                        {section.tiers?.map((tier, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between text-[14px] font-[400] text-[#A1AECB] pl-[70px]"
                                            >
                                                <div className="flex items-center gap-[5px]">
                                                    <span>{tier.volume}</span>
                                                    <span className="">{tier.fees}</span>
                                                </div>
                                                <div className="">
                                                    {tier.reward}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default EarnBP;
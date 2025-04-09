import { motion } from 'framer-motion';

const ExpandIcon = (props: any) => {
  const { isExpanded } = props;

  return (
    <motion.svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        rotate: isExpanded ? 180 : 0,
      }}
    >
      <g filter="url(#filter0_i_33312_367)">
        <motion.path
          d="M5.26795 10C6.03775 11.3333 7.96225 11.3333 8.73205 10L12.1962 4C12.966 2.66666 12.0037 1 10.4641 1L3.5359 1C1.9963 1 1.03405 2.66667 1.80385 4L5.26795 10Z"
          animate={{
            fill: isExpanded ? "#BFFF60" : "#A6A6DB",
          }}
        />
      </g>
      <path d="M9.16506 10.25C8.20281 11.9167 5.79719 11.9167 4.83494 10.25L1.37083 4.25C0.408585 2.58333 1.61139 0.5 3.5359 0.5L10.4641 0.5C12.3886 0.5 13.5914 2.58333 12.6292 4.25L9.16506 10.25Z" stroke="black"/>
      <defs>
        <filter id="filter0_i_33312_367" x="0.53125" y="0" width="12.9375" height="12" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-2" dy="-2"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_33312_367"/>
        </filter>
      </defs>
    </motion.svg>
  );
};

export default ExpandIcon;

import { useMemo } from 'react';
import styled from 'styled-components';
import chains from '@/configs/chains';
import { motion } from 'framer-motion';

const StyledToast = styled.div`
  border-radius: 16px;
  border: 1px solid #514F60;
  background: #2B294A;
  padding: 16px 10px;
  display: flex;
  gap: 10px;
  width: 296px;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    width: calc(100vw - 32px);
  }
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;
const StyledDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const StyledTitle = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  align-items: center;
  font-family: 'Montserrat';
`;
const StyledSecondaryText = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  font-family: 'Montserrat';
  display: flex;
  align-items: center;
  gap: 5px;
`;
const StyledCloseWrapper = styled.div`
  line-height: 22px;
  flex-shrink: 0;
`;
const IconWrapper = styled.div`
  flex-shrink: 0;
`;

export default function Toast({
  type,
  title,
  text,
  tx,
  chainId,
  closeToast
}: any) {
  const txLink = useMemo(() => {
    if (!tx || !chainId) return '';
    const currentChain = chains[chainId];
    if (!currentChain) return '';
    return `${currentChain.blockExplorers.default.url}/tx/${tx}`;
  }, [tx, chainId]);
  return (
    <StyledToast>
      <IconWrapper>
        {type === 'success' && (
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="13" cy="13" r="13" fill="#BFFF60" />
            <path d="M8 13L12 17L19 10" stroke="black" stroke-width="2" stroke-linecap="round" />
          </svg>
        )}
        {type === 'error' && (
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="20" height="20" rx="4" fill="#836EF9" />
            <path d="M16.4912 13.8004H13.7998V16.467C13.7998 16.7616 13.5615 17 13.2669 17H12.734C12.4394 17 12.2002 16.7616 12.2002 16.467V13.8004H9.50881C9.22763 13.8004 9 13.5727 9 13.2915V12.7085C9 12.4273 9.22763 12.1996 9.50881 12.1996H12.2002V9.53298C12.2002 9.23837 12.4394 9 12.734 9H13.2669C13.5615 9 13.7998 9.23926 13.7998 9.53298V12.1996H16.4912C16.7724 12.1996 17 12.4273 17 12.7085V13.2915C17 13.5718 16.7724 13.8004 16.4912 13.8004Z" fill="white" />
            <circle cx="13" cy="13" r="13" fill="#19D9FF" />
            <path d="M13.5 19V12" stroke="black" stroke-width="3" stroke-linecap="round" />
            <circle cx="13.5" cy="6.5" r="2.5" fill="black" />
          </svg>
        )}
        {type === 'info' && (
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="13" cy="13" r="13" fill="#19D9FF" />
            <path d="M13.5 19V6.5M13.5 6.5L9 11M13.5 6.5L18 11" stroke="black" stroke-width="2" stroke-linecap="round" />
          </svg>
        )}
        {type === 'pending' && (
          <div className="w-[26px] h-[26px] rounded-full shrink-0 bg-[#19D9FF] flex items-center justify-center">
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              <path d="M1 9C1 13.4183 4.58172 17 9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1" stroke="black" stroke-width="2" stroke-linecap="round" />
            </motion.svg>
          </div>
        )}
      </IconWrapper>
      <StyledContent>
        <StyledDesc
          style={{
            color: type === 'success' ? '#BFFF60' : '#19D9FF',
            paddingRight: tx && chainId ? "48px" : "0",
          }}
        >
          <StyledTitle>{title}</StyledTitle>
          {text && <StyledSecondaryText>{text}</StyledSecondaryText>}
          {tx && chainId && (
            <StyledSecondaryText
              style={{ textDecoration: 'underline', cursor: 'pointer', position: 'absolute', right: '10px', top: '22px', color: '#A9ADB8' }}
              onClick={() => {
                window.open(txLink, '_blank');
              }}
            >
              View <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.36364 9.18182L13 1M13 1H7M13 1V7M4.81818 1H1V13H13V9.18182" stroke="#A9ADB8" stroke-width="1.2" />
              </svg>
            </StyledSecondaryText>
          )}
        </StyledDesc>
        {/* {
          closeToast && <StyledCloseWrapper onClick={closeToast} className='cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
            >
              <path
                d='M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z'
                fill='white'
              />
            </svg>
          </StyledCloseWrapper>
        } */}

      </StyledContent>
    </StyledToast>
  );
}

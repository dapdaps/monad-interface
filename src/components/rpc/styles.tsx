import styled from "styled-components";

export const StyledRpcContainer = styled.div`
  font-family: Montserrat;
  background: linear-gradient(180deg, #9892C0 0%, #47445A 100%);
  &::after {
    content: "";
    position: absolute;
    top: 1px; 
    left: 1px;
    right: 1px;
    bottom: 1px;
    background-color: #2B294A;
    border-radius: 16px; 
    z-index: 1;
  }
`;
export const StyledRpcListDesc = styled.div`
  color: #9290B1;
  font-family: Unbounded;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%;
  margin-top: 14px;
  text-align: left;
`;
export const StyledRpcList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  margin-top: 20px;
`;
export const StyledRpcItem = styled.div`
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 17px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-family: Unbounded;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
export const StyledRpcRadio = styled.div<{ $selected?: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    display: ${({ $selected }) => ($selected ? "block" : "none")};
    width: 12px;
    height: 12px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--primary);
  }
`;
export const StyledNetworkDelay = styled.div<{ $color?: string }>`
  display: flex;
  align-items: center;
  gap: 7px;
  color: ${({ $color }) => $color || "#57DB64"};
  font-size: 12px;
  font-style: normal;
  font-family: Unbounded;
  font-weight: 300;
  line-height: normal;

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 12px;
    background: ${({ $color }) => $color || "#57DB64"};
  }
`;

export const StyledAlertText = styled.div`
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

  > p {
    margin: 0;
  }
`;

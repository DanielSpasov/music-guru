import styled, { keyframes } from 'styled-components';

export default function Loader() {
  return (
    <>
      <BackgroundDim />
      <SpinnerWrapper>
        <Spinner>
          <SpinnerDot
            delay="-0.036s"
            bgColor="#eb4034"
            top="63px"
            left="63px"
          />
          <SpinnerDot
            delay="-0.072s"
            bgColor="#eb9334"
            top="68px"
            left="56px"
          />
          <SpinnerDot
            delay="-0.108s"
            bgColor="#ebdf34"
            top="71px"
            left="48px"
          />
          <SpinnerDot
            delay="-0.144s"
            bgColor="#aeeb34"
            top="72px"
            left="40px"
          />
          <SpinnerDot
            delay="-0.180s"
            bgColor="#53eb34"
            top="71px"
            left="32px"
          />
          <SpinnerDot
            delay="-0.216s"
            bgColor="#34eba2"
            top="68px"
            left="24px"
          />
          <SpinnerDot
            delay="-0.252s"
            bgColor="#34d0eb"
            top="63px"
            left="17px"
          />
          <SpinnerDot
            delay="-0.288s"
            bgColor="#484bf0"
            top="56px"
            left="12px"
          />
        </Spinner>
      </SpinnerWrapper>
    </>
  );
}

const BackgroundDim = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;

  background-color: black;
  opacity: 80%;
  z-index: 99;
`;

const SpinnerWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

type SpinnerDotProps = {
  delay: string;
  bgColor: string;
  top: string;
  left: string;
};

const SpinnerDot = styled('div')<SpinnerDotProps>`
  animation: ${spinAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
  animation-delay: ${({ delay }) => delay || '0s'};

  &:after {
    content: ' ';
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${({ bgColor }) => bgColor || 'white'};
    margin: -4px 0 0 -4px;
    top: ${({ top }) => top || '0px'};
    left: ${({ left }) => left || '0px'};
  }
`;

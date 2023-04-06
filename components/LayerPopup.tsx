import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Button from './Button';
import { hideVisually } from 'polished';
import Close from './Close';

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

const slideInUp = keyframes`
  from {
    transform: translate3d(0, 8%, 0);
    animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }

  to {
    transform: translate3d(0, 0, 0);
    animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }
`;

const slideOutDown = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(0, 10%, 0);
  }
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Popup = styled.div<{ disappear: any }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;
  animation-fill-mode: forwards;

  ${(props: any) =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const PopupContents = styled.div<{ disappear: any }>`
  z-index: 1;
  position: relative;
  width: 30rem;
  background-color: #fff;
  padding: 3.6rem;
  border-radius: 0.3rem;
  animation: ${slideInUp} 0.3s 50ms;
  animation-fill-mode: both;

  ${(props: any) =>
    props.disappear &&
    css`
      animation: ${slideOutDown} 0.3s;
    `}

  strong {
    display: block;
    font-size: 3rem;
    margin-bottom: 1.6rem;
  }

  p {
    line-height: 160%;
    font-size: 1.6rem;
  }

  .buttonGroup {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
  }
`;

const PopupCloseBtn = styled.button`
  position: absolute;
  top: 2.4rem;
  right: 2.4rem;
  width: 1.8rem;
  height: 1.8rem;
  border: 0;

  span {
    ${hideVisually()};
  }

  path {
    stroke: #666;
  }

  &:hover path {
    stroke: #000;
  }
`;

export default function LayerPopup({
  visible,
  onConfirm,
  onCancel,
  title,
  children,
  cancelButton,
  confirmButton,
}: any): JSX.Element | null {
  const [animate, setAnimate] = useState<boolean>(false);
  const [userVisible, setUserVisible] = useState(visible);

  useEffect(() => {
    if (userVisible && !visible) {
      setAnimate(true);
    }
    setUserVisible(visible);
  }, [userVisible, visible]);

  if (!animate && !userVisible) return null;

  return (
    <Popup disappear={!visible} onAnimationEnd={() => { setAnimate(false) }}>
      <PopupContents disappear={!visible}>
        <strong>{title}</strong>
        <p>{children}</p>
        <div className="buttonGroup">
          <Button type="line" onClick={onCancel}>
            {cancelButton}
          </Button>
          <Button type="fill" onClick={onConfirm}>
            {confirmButton}
          </Button>
        </div>
        <PopupCloseBtn onClick={onCancel}>
          <span>팝업 닫기</span>
          <Close />
        </PopupCloseBtn>
      </PopupContents>
      <Dim onClick={onCancel} />
    </Popup>
  );
}

LayerPopup.defaultProps = {
  title: '안녕하세요',
  children: 'Styled-Components를 이용한 예제입니다.',
  cancelButton: '취소',
  confirmButton: '확인'
};

# 💄 Styled-Components로 만든 예제 파일입니다.
:octocat: 바로 가기 : https://light9639.github.io/Styled-Components-Course/

![127 0 0 1_5173_](https://user-images.githubusercontent.com/95972251/230278460-8a72ddad-7c0c-49b4-bd82-4f71d5b454c1.png)

✨ 💄 Styled-Components로 만든 예제 파일입니다. ✨

## :tada: React 생성
- React 생성
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite를 이용하여 프로젝트를 생성하려면
```bash
npm create vite@latest
# or
yarn create vite
```
- 터미널에서 실행 후 프로젝트 이름 만든 후 React 선택, Typescirpt 선택하면 생성 완료.
## 🚤 Styled-Components, react-router-dom 설치
- `styled-components`, 'react-router-dom' 설치하기.
```bash
npm install styled-components react-router-dom styled-normalize
# or
yarn add styled-components react-router-dom styled-normalize
```

## ✒️ main.tsx, App.tsx, GlobalStyle.ts 수정 및 작성
### :zap: main.tsx
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/GlobalStyle';

const darkTheme = {
  textColor: 'whitesmoke',
  backgroundColor: '#111'
};

const lightTheme = {
  textColor: '#111',
  backgroundColor: 'whitesmoke'
};

const pastelTheme = {
  textColor: 'lightpink',
  backgroundColor: 'beige'
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
```
### :zap: App.tsx
```typescript
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Bank from '../components/Bank';
import LayerPopup from '../components/LayerPopup';
import styled from 'styled-components';

interface popupType {
  show: boolean;
  title: string
}

const AppBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  min-width: 32rem;
  max-width: 48rem;
  margin: 4rem auto;
  column-gap: 1.4rem;
  row-gap: 1.4rem;
`;

export default function App(): JSX.Element {
  const bankList = [
    { eng: 'wr', ko: '우리' },
    { eng: 'kb', ko: '국민' },
    { eng: 'hn', ko: '하나', event: { name: '추첨', date: '1/31' } },
    { eng: 'sh', ko: '신한', disabled: true },
    { eng: 'ibk', ko: '기업', event: { name: '한정', date: '1/31' } },
    { eng: 'nh', ko: '농협' },
    { eng: 'na', ko: '나나' }
  ];

  const [popup, setPopup] = useState<any>({
    show: false,
    title: ''
  });

  const onClick = () => {
    setPopup({ show: true });
  };

  const onConfirm = () => {
    setPopup({ show: false });
  };

  const onCancel = () => {
    setPopup({ show: false });
  };

  return (
    <div className="App">
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <h1>Styled-Components</h1>
      <AppBlock>
        {bankList.map((bank) => {
          return (
            <Bank
              key={bank.eng}
              name={bank.eng}
              data-name={bank.ko}
              disabled={bank.disabled}
              event={bank.event}
              onClick={onClick}
            >
              <span>{bank.ko}은행</span>
              {bank.event && (
                <i>
                  {bank.event.name} 이벤트 (~{bank.event.date})
                </i>
              )}
            </Bank>
          );
        })}
      </AppBlock>
      <LayerPopup
        title={popup.title}
        visible={popup.show}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </div>
  )
}
```

### :zap: GlobalStyle.ts
```typescript
import { createGlobalStyle } from 'styled-components';
import Normalize from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
    ${Normalize};
    
    #root {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
    }

    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.react:hover {
        filter: drop-shadow(0 0 2em #61dafbaa);
    }

    @keyframes logo-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @media (prefers-reduced-motion: no-preference) {
        a:nth-of-type(2) .logo {
            animation: logo-spin infinite 20s linear;
        }
    }

    .card {
        padding: 2em;
    }

    .read-the-docs {
        color: #888;
    }

`;

export default GlobalStyle;
```
## ✒️ LayerPopup.tsx, Icon.tsx, Close.tsx, Button.tsx, Bank.tsx 수정 및 작성
### :zap: LayerPopup.tsx
```typescript
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
```
### :zap: Icon.tsx
```typescript
import styled from 'styled-components';

export default styled.svg.attrs({
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    xmlnsXlink: 'http://www.w3.org/1999/xlink'
})``;
```
### :zap: Close.tsx
```typescript
import React from "react";

function Close() {
    return (
        <React.Fragment>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 21 20"
                width="100%"
                height="100%"
            >
                <path
                    stroke="#000"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    d="M3 2.5l15 15M18 2.5l-15 15"
                />
            </svg>
        </React.Fragment>
    );
}

export default Close;
```
### :zap: Button.tsx
```typescript
import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
    display: block;
    width: calc(50% - 1rem);
    padding: 1rem 0;
    color: #222;
    border: 0.1rem solid #222;
    border-radius: 0.4rem;

    &:hover {
        color: #777;
        border-color: #777;
    }

    ${(props: any) =>
        props.type === 'fill' &&
        css`
        background-color: #222;
        color: #fff;

        &:hover {
            color: #fff;
            background-color: #444;
        }
    `}
`;

function Button({ children, ...rest }: any) {
    return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;
```
### :zap: Bank.tsx
```typescript
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { darken, lighten } from 'polished';

const bankColors: any = {
    wr: '#2172b2',
    kb: '#fdb810',
    hn: '#0d905d',
    nh: '#009812',
    ibk: '#0892ce',
    default: '#222222'
};

const onEventAnimation = (color: string) => keyframes`
    30%, 70% {
        box-shadow: 0rem 0.2rem 1.2rem -0.1rem ${lighten(0.05, color)};
    }
`;

const BankButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 8rem;
    padding: 1rem;
    color: #fff;
    font-size: 1.6rem;
    font-weight: 700;
    border: 0;
    border-radius: 0.4rem;

    ${(props: any) => {
        const color = bankColors[props.name] || bankColors['default'];

        const eventStyle = () => {
            if (props.event) {
                return css`
                    grid-column: 1 / 4;
                    order: -1;
                    animation: ${onEventAnimation(color)} 3s infinite;
                `;
            }
        };

        return css`
            background-color: ${color};

            &:hover {
                cursor: pointer;
                background-color: ${darken(0.05, color)};
            }

            &:disabled {
                color: #999;
                background-color: #c0c0c0;
                cursor: not-allowed;
            }

            ${eventStyle};
        `;
    }}

    span {
        display: inline-block;
        margin: 0;
    }

    i {
        display: inline-block;
        margin: 0.8rem 0 0;
        font-size: 80%;
        font-weight: normal;
        font-style: normal;
    }
`;

function Bank({ children, ...rest }: any) {
    return <BankButton {...rest}>{children}</BankButton>;
}

export default Bank;
```

## 📎 출처
- <a href="https://www.daleseo.com/react-styled-components/">Styled Components로 React 컴포넌트 스타일하기</a>
- <a href="https://www.zigae.com/styled-components-abstract/">우리가 몰랐던 styled-components 동작원리</a>
- <a href="https://nykim.work/107">[ReactJS] 4. styled-components 💅🏾</a>

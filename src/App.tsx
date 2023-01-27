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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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

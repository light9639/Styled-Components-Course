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

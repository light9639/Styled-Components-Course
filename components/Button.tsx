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

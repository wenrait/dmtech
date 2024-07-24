import styled from 'styled-components';
import { colors } from '../../styles/colors.ts';

const StyledCounterInput = styled.input`
  border: 0;
  background: ${colors.brand.lighter};

  width: 52px;
  height: 52px;

  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 16px;

  transition: 120ms;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1;

  &:not(:disabled):hover {
    background: rgb(213, 227, 241);
  }

  &:not(:disabled):active {
    background: rgb(213, 227, 241);
    outline: 1px solid ${colors.brand.default};
  }

  &:not(:disabled)&:focus {
    outline: 2px solid ${colors.brand.default};
  }

  &:disabled {
    cursor: default;
    opacity: 0.4;
  }
`;

export const CounterInputComponent = () => {
  return <StyledCounterInput placeholder={'1'} />;
};

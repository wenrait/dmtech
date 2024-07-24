import styled from 'styled-components';
import { colors } from '../styles/colors.ts';

const StyledInput = styled.input`
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 16px;
  border-radius: 12px;
  border: 1px solid ${colors.grey.light};

  padding: 16px;

  width: 52px;

  &:not(:disabled):hover {
    border: 1px solid ${colors.brand.default};
  }

  &:not(:disabled)&:focus {
    outline: 1px solid ${colors.brand.default};
  }

  &:disabled {
    opacity: 0.4;
  }
`;

export const InputComponent = () => {
  return <StyledInput placeholder={'1'} />;
};

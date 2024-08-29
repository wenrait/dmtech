import styled from 'styled-components';
import { colors } from '@styles/colors.ts';

const StyledButton = styled.button`
  border: 0;
  border-radius: 12px;
  background: ${colors.brand.default};
  padding: 16px;

  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: white;

  transition: 120ms;
  cursor: pointer;

  flex: 1;

  &:not(:disabled):hover {
    background: rgb(52, 143, 231);
  }

  &:not(:disabled):active {
    background: rgb(5, 88, 202);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

export interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const ButtonComponent = ({ text, disabled, onClick }: ButtonProps) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

import styled from 'styled-components';
import { colors } from '../../styles/colors.ts';
import { ReactNode } from 'react';

const StyledCounterButton = styled.button`
  border: 0;
  border-radius: 12px;
  background: transparent;

  width: 52px;
  height: 52px;

  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: ${colors.brand.default};

  transition: 120ms;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:disabled):hover {
    background: rgba(0, 115, 230, 0.1);
  }

  &:not(:disabled):active {
    background: rgba(0, 115, 230, 0.2);
  }

  &:disabled {
    cursor: default;
    opacity: 0.4;
  }
`;

export interface CounterButtonProps {
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const CounterButtonComponent = ({
  icon,
  disabled,
  onClick,
}: CounterButtonProps) => {
  return (
    <StyledCounterButton disabled={disabled} onClick={onClick}>
      {icon}
    </StyledCounterButton>
  );
};

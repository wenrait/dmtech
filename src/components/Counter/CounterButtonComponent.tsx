import styled from 'styled-components';
import { colors } from '../../styles/colors.ts';
import { ReactNode } from 'react';

interface StyledCounterButtonProps {
  $function: 'decrease' | 'increase';
}

const StyledCounterButton = styled.button`
  border: 0;
  border-radius: ${(props: StyledCounterButtonProps) =>
    props.$function === 'decrease' ? '12px 0 0 12px' : '0 12px 12px 0'};
  background: ${colors.brand.lighter};

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
    background: rgb(213, 227, 241);
  }

  &:not(:disabled):active {
    background: ${colors.brand.default};
    color: white;

    svg {
      path {
        fill: white;
        transition: 120ms;
      }
    }
  }

  &:disabled {
    cursor: default;
    opacity: 0.4;
  }
`;

export interface CounterButtonProps {
  icon: ReactNode;
  disabled?: boolean;
  $function: 'decrease' | 'increase';
  onClick?: () => void;
}

export const CounterButtonComponent = ({
  icon,
  disabled,
  $function,
  onClick,
}: CounterButtonProps) => {
  return (
    <StyledCounterButton
      disabled={disabled}
      $function={$function}
      onClick={onClick}
    >
      {icon}
    </StyledCounterButton>
  );
};

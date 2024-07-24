import styled from 'styled-components';
import { colors } from '../../styles/colors.ts';
import { ReactNode } from 'react';

const StyledPaginationButton = styled.button`
  border: 0;
  border-radius: 12px;
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

  &:not(:disabled).active {
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

export interface PaginationButtonProps {
  number?: number;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const PaginationButtonComponent = ({
  number,
  icon,
  disabled,
  className,
  onClick,
}: PaginationButtonProps) => {
  return (
    <StyledPaginationButton
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {number}
      {icon}
    </StyledPaginationButton>
  );
};

import styled from 'styled-components';
import { colors } from '@styles/colors.ts';
import { ReactNode } from 'react';

interface StyledPaginationButtonProps {
  $dots: boolean;
}

const StyledPaginationButton = styled.button<StyledPaginationButtonProps>`
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
  cursor: ${(props: StyledPaginationButtonProps) =>
    props.$dots ? 'default' : 'pointer'};

  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:disabled):hover {
    background: ${(props: StyledPaginationButtonProps) =>
      props.$dots ? `${colors.brand.lighter}` : `rgb(213, 227, 241)`};
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
  number?: number | string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  dots: boolean;
}

export const PaginationButtonComponent = ({
  number,
  icon,
  disabled,
  className,
  onClick,
  dots,
}: PaginationButtonProps) => {
  return (
    <StyledPaginationButton
      disabled={disabled}
      className={className}
      onClick={onClick}
      $dots={dots}
    >
      {number}
      {icon}
    </StyledPaginationButton>
  );
};

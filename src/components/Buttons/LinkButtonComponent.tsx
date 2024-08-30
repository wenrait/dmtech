import styled from 'styled-components';
import { colors } from '@styles/colors.ts';
import { LeftIconComponent } from '../Icons/LeftIconComponent.tsx';
import { TrashIconComponent } from '../Icons/TrashIconComponent.tsx';

interface StyledLinkButtonProps {
  $variant: 'brand' | 'focus';
}

const StyledLinkButton = styled.button<StyledLinkButtonProps>`
  border: 0;
  background: transparent;

  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: ${(props: StyledLinkButtonProps) =>
    props.$variant === 'focus' ? colors.focus : colors.brand.default};

  transition: 120ms;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  svg {
    path {
      fill: ${(props) =>
        props.$variant === 'focus' ? colors.focus : colors.brand.default};
      transition: 120ms;
    }
  }

  &:hover {
    color: ${(props) =>
      props.$variant === 'focus' ? 'rgb(238, 87, 67)' : 'rgb(55, 143, 242)'};

    svg {
      path {
        fill: ${(props) =>
          props.$variant === 'focus'
            ? 'rgb(238, 87, 67)'
            : 'rgb(55, 143, 242)'};
      }
    }
  }
`;

export interface PaginationButtonProps {
  variant: 'focus' | 'brand';
  onClick: () => void;
}

export const LinkButtonComponent = ({
  variant,
  onClick,
}: PaginationButtonProps) => {
  return (
    <StyledLinkButton $variant={variant} onClick={onClick}>
      {variant === 'focus' ? <TrashIconComponent /> : <LeftIconComponent />}
      {variant === 'focus' ? <span>Удалить</span> : <span>Назад</span>}
    </StyledLinkButton>
  );
};

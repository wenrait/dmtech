import styled from 'styled-components';
import { colors } from '../../styles/colors.ts';
import { TrashIconComponent } from '../Icons/TrashIconComponent.tsx';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: 120ms;

  svg {
    path {
      fill: ${colors.black};
      transition: 120ms;
    }
  }

  &:hover {
    svg {
      path {
        fill: ${colors.brand.default};
      }
    }
  }
`;

const StyledText = styled.span`
  color: ${colors.black};
  font-weight: 700;
  font-size: 16px;
  transition: 120ms;
  text-decoration: none;

  &:hover {
    color: ${colors.brand.default};
`;

export interface TabBarLinkProps {
  text: string;
  to: string;
}

export const CartComponent = () => {
  return (
    <StyledContainer>
      <TrashIconComponent />
      <StyledText>Корзина (2)</StyledText>
    </StyledContainer>
  );
};

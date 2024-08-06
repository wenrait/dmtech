import styled from 'styled-components';
import { colors } from '../../styles/colors.ts';
import { TrashIconComponent } from '../Icons/TrashIconComponent.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

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
  const cart = useSelector((state: RootState) => state.cartReducer.cart);

  return (
    <StyledContainer>
      <TrashIconComponent />
      <StyledText>
        Корзина ({cart.reduce((acc, order) => acc + order.quantity, 0)})
      </StyledText>
    </StyledContainer>
  );
};

import styled from 'styled-components';
import { colors } from '../../styles/colors.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import { useGetCartQuery } from '../../redux/services/api/cartApi.ts';
import { CartIconComponent } from '../Icons/CartIconComponent.tsx';
import { useEffect, useState } from 'react';

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
  const { data: cartFromApi, error, isLoading, refetch } = useGetCartQuery();
  const cartLocal = useSelector((state: RootState) => state.cartReducer.cart);

  const [cartLength, setCartLength] = useState(0);

  if (cartFromApi) {
    console.log(cartFromApi);
  }

  useEffect(() => {
    console.log('refetching');
    refetch();
  }, [cartLocal]);

  return (
    <StyledContainer>
      <CartIconComponent />
      <StyledText>
        Корзина ({cartFromApi ? cartFromApi.length : 0})
        {/*Корзина ({cart.reduce((acc, order) => acc + order.quantity, 0)})*/}
      </StyledText>
    </StyledContainer>
  );
};

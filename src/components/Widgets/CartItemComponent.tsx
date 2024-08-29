import styled from 'styled-components';
import { useGetCartQuery } from '../../redux/services/api/cartApi.ts';
import { CounterComponent } from '../Counter/CounterComponent.tsx';
import { handleProductPictireError } from '../../utils/helpers.ts';

const StyledCartItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 512px;
  padding: 16px 0;
`;

const StyledPictureAndTitle = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const StyledPicture = styled.img`
  display: block;
  border: 2px solid white;
  max-width: 52px;
`;

const StyledTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  line-height: 20px;
  text-align: left;
  width: 144px;
  font-weight: 400;
`;

const StyledPrice = styled.span`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-align: right;
  width: 112px;
`;

export interface CartItemComponent {
  id: string;
}

export const CartItemComponent = ({ id }: CartItemComponent) => {
  const {
    data: cart,
    isLoading: cartIsLoading,
    error: cartError,
  } = useGetCartQuery();

  const cartItem = cart?.find((item) => item.product.id === id);

  if (cartIsLoading) {
    return <div>Загрузка...</div>;
  }

  if (cartIsLoading) {
    return <div>Ошибка: {cartError}</div>;
  }

  if (cartItem) {
    const { product } = cartItem;
    return (
      <StyledCartItem>
        <StyledPictureAndTitle>
          <StyledPicture
            src={product.picture}
            alt={product.title}
            onError={handleProductPictireError}
          />
          <StyledTitle>{product.title}</StyledTitle>
        </StyledPictureAndTitle>
        <CounterComponent id={product.id} />
        <StyledPrice>{product.price * cartItem.quantity} ₽</StyledPrice>
      </StyledCartItem>
    );
  }
};

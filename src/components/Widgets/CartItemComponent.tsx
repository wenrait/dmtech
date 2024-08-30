import styled from 'styled-components';
import {
  useGetCartQuery,
  useUpdateCartMutation,
} from '../../redux/services/api/cartApi.ts';
import { CounterComponent } from '../Counter/CounterComponent.tsx';
import { dividePrice, handleProductPictireError } from '../../utils/helpers.ts';
import { colors } from '@styles/colors.ts';
import { LinkButtonComponent } from '@components/Buttons/LinkButtonComponent.tsx';
import { deleteProduct } from '@redux/slices/cartSlice.ts';
import { useAppDispatch } from '@redux/store.ts';
import { useNavigate } from 'react-router-dom';

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

  cursor: pointer;
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

const StyledPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: right;
  width: 112px;
`;

const StyledPrice = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: ${colors.grey.default};
`;

const StyledPriceTotal = styled.span`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
`;

export interface CartItemComponent {
  id: string;
}

export const CartItemComponent = ({ id }: CartItemComponent) => {
  const dispatch = useAppDispatch();
  const {
    data: cart,
    isLoading: cartIsLoading,
    error: cartError,
  } = useGetCartQuery();
  const [updateCart] = useUpdateCartMutation();

  const navigate = useNavigate();

  const cartItem = cart?.find((item) => item.product.id === id);

  if (cartIsLoading) {
    return <div>Загрузка...</div>;
  }

  if (cartIsLoading) {
    return <div>Ошибка: {cartError}</div>;
  }

  const handleDeleteFromCart = async () => {
    try {
      if (cart && id) {
        const existingCart = cart.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
        }));
        const newCart = existingCart.filter((item) => item.id !== id);
        await updateCart({ data: newCart });
        dispatch(deleteProduct(id));
      } else {
        console.error('Корзина недоступна');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = (id: string) => {
    navigate(`products/${id}`);
  };

  if (cartItem) {
    const { product } = cartItem;
    return (
      <StyledCartItem>
        <StyledPictureAndTitle onClick={() => handleClick(product.id)}>
          <StyledPicture
            src={product.picture}
            alt={product.title}
            onError={handleProductPictireError}
          />
          <StyledTitle>{product.title}</StyledTitle>
        </StyledPictureAndTitle>
        <CounterComponent id={product.id} />
        {cartItem.quantity < 1 ? (
          <LinkButtonComponent
            variant={'focus'}
            onClick={() => handleDeleteFromCart()}
          />
        ) : (
          <StyledPriceContainer>
            {cartItem.quantity > 1 && (
              <StyledPrice>
                {dividePrice(cartItem.product.price)} за шт.
              </StyledPrice>
            )}
            <StyledPriceTotal>
              {dividePrice(product.price * cartItem.quantity)}
            </StyledPriceTotal>
          </StyledPriceContainer>
        )}
      </StyledCartItem>
    );
  }
};

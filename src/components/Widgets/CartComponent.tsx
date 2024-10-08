import styled from 'styled-components';
import {
  useGetCartQuery,
  useSubmitCartMutation,
  useUpdateCartMutation,
} from '@api/cartApi.ts';
import { CartItemComponent } from './CartItemComponent.tsx';
import { ButtonComponent } from '../Buttons/ButtonComponent.tsx';
import { clearCart } from '@slices/cartSlice.ts';
import { useAppDispatch } from '@redux/store.ts';
import { Dispatch, SetStateAction, useState } from 'react';
import { CartNotification } from './CartNotification.tsx';
import { dividePrice } from '../../utils/helpers.ts';

const StyledCartWidget = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  z-index: 100;

  box-shadow: 0 16px 40px 0 rgba(23, 32, 41, 0.32);
  background: white;
  padding: 8px 24px 24px 24px;
  border-radius: 24px;

  transition: 1120ms;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(242, 242, 242, 1);
`;

const StyledText = styled.span`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
`;

const StyledPrice = styled.span`
  font-size: 28px;
  font-weight: 800;
  line-height: 32px;
  text-align: right;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  padding-top: 16px;
`;

export interface CartWidgetProps {
  setWidgetVisible: Dispatch<SetStateAction<boolean>>;
}

export const CartWidget = ({ setWidgetVisible }: CartWidgetProps) => {
  const dispatch = useAppDispatch();
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const {
    data: cart,
    error: cartError,
    refetch: cartRefetch,
  } = useGetCartQuery();

  const [updateCart] = useUpdateCartMutation();
  const [submitCart] = useSubmitCartMutation();

  const showNotification = (message: string) => {
    setNotificationMessage(message);
    setNotificationVisible((prev) => !prev);

    setTimeout(() => setNotificationVisible((prev) => !prev), 6000);
  };

  const handleSubmit = async () => {
    try {
      if (!cart || cart.length === 0) {
        console.error('Корзина недоступна или пуста');
        return;
      }
      const existingCart = cart.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));
      const cartWithoutNulls = existingCart.filter((item) => item.quantity > 0);
      await updateCart({ data: cartWithoutNulls });

      if (cartWithoutNulls.length > 0) {
        await submitCart();
        dispatch(clearCart());
      }

      cartRefetch();

      showNotification('Корзина успешно обновлена');
    } catch (e) {
      showNotification(e as string);
    }
  };

  const handleMouseLeave = () => {
    setWidgetVisible((prevState) => !prevState);
  };

  return (
    <StyledCartWidget onMouseLeave={() => handleMouseLeave()}>
      {cart && cart.length > 0 ? (
        cart.map((item) => (
          <CartItemComponent key={item.product.id} id={item.product.id} />
        ))
      ) : (
        <div>Корзина пуста</div>
      )}
      {cart && cart.length > 0 && (
        <StyledWrapper>
          <StyledText>Итого</StyledText>
          <StyledPrice>
            {dividePrice(
              cart.reduce(
                (acc, item) => acc + item.quantity * item.product.price,
                0,
              ),
            )}
          </StyledPrice>
        </StyledWrapper>
      )}
      {cart && cart.length > 0 && (
        <StyledButtonWrapper>
          <ButtonComponent text={'Оформить заказ'} onClick={handleSubmit} />
        </StyledButtonWrapper>
      )}
      {cartError && <div>cartError</div>}
      <CartNotification
        visible={notificationVisible}
        message={notificationMessage}
      />
    </StyledCartWidget>
  );
};

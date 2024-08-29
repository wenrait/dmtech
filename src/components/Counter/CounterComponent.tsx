import styled from 'styled-components';
import { CounterButtonComponent } from './CounterButtonComponent.tsx';
import { MinusIconComponent } from '../Icons/MinusIconComponent.tsx';
import { PlusIconComponent } from '../Icons/PlusIconComponent.tsx';
import { colors } from '@styles/colors.ts';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useGetCartQuery, useUpdateCartMutation } from '@api//cartApi.ts';

const StyledCounterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const StyledCounterInput = styled.input`
  border: 0;
  background: ${colors.brand.lighter};

  width: 52px;
  height: 52px;

  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 16px;
  text-align: center;

  transition: 120ms;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:not(:disabled):hover {
    background: rgb(213, 227, 241);
  }

  &:not(:disabled):active {
    background: rgb(213, 227, 241);
    outline: 1px solid ${colors.brand.default};
  }

  &:not(:disabled)&:focus {
    outline: 2px solid ${colors.brand.default};
  }

  &:disabled {
    cursor: default;
    opacity: 0.4;
  }
`;

export interface CounterComponentProps {
  id: number;
}

export const CounterComponent = ({ id }: CounterComponentProps) => {
  const { data: cart, refetch } = useGetCartQuery();
  const [updateCart] = useUpdateCartMutation();

  const order = cart?.find((item) => item.product.id === id);

  const [quantity, setQuantity] = useState<number>(order?.quantity);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDecreaseQuantity = async () => {
    try {
      const existingCart = cart.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));
      const newCart = existingCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      );
      const cartWithoutNulls = newCart.filter((item) => item.quantity > 0);
      await updateCart({ data: cartWithoutNulls });
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const handleIncreaseQuantity = async () => {
    try {
      const existingCart = cart.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));
      const newCart = existingCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + 1;
          const newTotal = cart.reduce((sum, cartItem) => {
            return cartItem.id === id
              ? sum + cartItem.product.price * newQuantity
              : sum + cartItem.product.price * cartItem.quantity;
          }, 0);

          if (newTotal <= 10000) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      });
      await updateCart({ data: newCart });
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.target.select();
    if (Number(e.target.value) >= 0) {
      try {
        let newQuantity = Number(e.target.value);

        if (newQuantity > 10) {
          newQuantity = 10;
        }
        const currentCartValue = cart
          .filter((item) => item.product.id !== order?.product.id)
          .reduce(
            (total, item) => total + item.quantity * item.product.price,
            0,
          );

        const maxQuantity = Math.floor(
          (10000 - currentCartValue) / order.product.price,
        );

        if (newQuantity > maxQuantity) {
          newQuantity = maxQuantity;
        }

        const existingCart = cart.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
        }));
        const newCart = existingCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        );
        const cartWithoutNulls = newCart.filter((item) => item.quantity > 0);
        await updateCart({ data: cartWithoutNulls });
        refetch();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleFocus = () => {
    if ('select' in inputRef.current) {
      inputRef.current.select();
    }
  };

  useEffect(() => {
    if (cart) {
      setQuantity(cart?.find((order) => order.product.id === id)?.quantity);
    }
  }, [cart, id]);

  return (
    <StyledCounterWrapper>
      <CounterButtonComponent
        icon={<MinusIconComponent />}
        $function={'decrease'}
        onClick={handleDecreaseQuantity}
      />
      <StyledCounterInput
        type={'number'}
        value={quantity}
        onChange={handleInputChange}
        onFocus={handleFocus}
        ref={inputRef}
      />
      <CounterButtonComponent
        icon={<PlusIconComponent />}
        $function={'increase'}
        onClick={handleIncreaseQuantity}
        disabled={quantity > 9 || (quantity + 1) * order?.product.price > 10000}
      />
    </StyledCounterWrapper>
  );
};

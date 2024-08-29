import styled from 'styled-components';
import { CounterButtonComponent } from './CounterButtonComponent.tsx';
import { MinusIconComponent } from '../Icons/MinusIconComponent.tsx';
import { PlusIconComponent } from '../Icons/PlusIconComponent.tsx';
import { colors } from '@styles/colors.ts';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useGetCartQuery, useUpdateCartMutation } from '@api//cartApi.ts';
import { IGetCart } from 'types/types.ts';

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
  id: string;
}

export const CounterComponent = ({ id }: CounterComponentProps) => {
  const { data: cart, refetch } = useGetCartQuery();
  const [updateCart] = useUpdateCartMutation();

  const [order, setOrder] = useState<IGetCart | undefined>(undefined);
  const [quantity, setQuantity] = useState(0);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDecreaseQuantity = async () => {
    try {
      if (cart) {
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
      } else {
        console.error('Корзина недоступна');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleIncreaseQuantity = async () => {
    try {
      if (cart) {
        const existingCart = cart.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
        }));
        const newCart = existingCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
        await updateCart({ data: newCart });
        refetch();
      } else {
        console.error('Козина недоступна');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.target.select();
    if (Number(e.target.value) >= 0) {
      try {
        if (cart) {
          let newQuantity = Number(e.target.value);

          if (newQuantity > 10) {
            newQuantity = 10;
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
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleFocus = () => {
    if (inputRef && inputRef.current) {
      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      setOrder(cart.find((item) => item.product.id === id));
      setTotalCost(
        cart.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
      );
    }
  }, [cart]);

  useEffect(() => {
    if (order) {
      const nextTotalCost = totalCost + order.product.price;
      const exceedsLimit = nextTotalCost > 10000;
      const exceedsMaxQuantity = order.quantity + 1 > 10;
      setButtonDisabled(exceedsLimit || exceedsMaxQuantity);
    }
  }, [totalCost, order]);

  useEffect(() => {
    if (order) {
      setQuantity(order.quantity);
    }
  }, [totalCost, order]);

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
        disabled={isButtonDisabled}
      />
    </StyledCounterWrapper>
  );
};

import styled from 'styled-components';
import { CounterButtonComponent } from './CounterButtonComponent.tsx';
import { MinusIconComponent } from '../Icons/MinusIconComponent.tsx';
import { PlusIconComponent } from '../Icons/PlusIconComponent.tsx';
import { RootState, useAppDispatch } from '../../redux/store.ts';
import {
  decreaseQuantity,
  increaseQuantity,
  setQuantity,
} from '../../redux/slices/cartSlice.ts';
import { colors } from '../../styles/colors.ts';
import { useSelector } from 'react-redux';
import { ChangeEvent, useRef } from 'react';

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
  const dispatch = useAppDispatch();

  const order = useSelector((state: RootState) =>
    state.cartReducer.cart.find((order) => order.product.id === id),
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(id));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.select();
    if (Number(e.target.value) >= 0) {
      dispatch(setQuantity({ id, quantity: Number(e.target.value) }));
    }
  };

  const handleFocus = () => {
    if ('select' in inputRef.current) {
      inputRef.current.select();
    }
  };

  return (
    <StyledCounterWrapper>
      <CounterButtonComponent
        icon={<MinusIconComponent />}
        $function={'decrease'}
        onClick={handleDecreaseQuantity}
      />
      <StyledCounterInput
        type={'number'}
        value={order.quantity}
        onChange={handleInputChange}
        onFocus={handleFocus}
        ref={inputRef}
      />
      <CounterButtonComponent
        icon={<PlusIconComponent />}
        $function={'increase'}
        onClick={handleIncreaseQuantity}
        disabled={
          order.quantity > 9 ||
          (order.quantity + 1) * order.product.price > 10000
        }
      />
    </StyledCounterWrapper>
  );
};

import styled from 'styled-components';
import { CounterButtonComponent } from './CounterButtonComponent.tsx';
import { MinusIconComponent } from '../Icons/MinusIconComponent.tsx';
import { PlusIconComponent } from '../Icons/PlusIconComponent.tsx';
import { RootState, useAppDispatch } from '../../redux/store.ts';
import {
  addNewProduct,
  decreaseQuantity,
  increaseQuantity,
  setQuantity,
} from '../../redux/slices/cartSlice.ts';
import { colors } from '../../styles/colors.ts';
import { useSelector } from 'react-redux';
import { ChangeEvent, useRef } from 'react';
import {
  useGetCartQuery,
  useUpdateCartMutation,
} from '../../redux/services/api/cartApi.ts';
import { useGetProductQuery } from '../../redux/services/api/productsApi.ts';
import { IOrderInfo } from '../../types.ts';

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

  // const order = useSelector((state: RootState) =>
  //   state.cartReducer.cart.find((order) => order.product.id === id),
  // );

  const {
    data: product,
    isLoading: productIsLoading,
    error: productError,
  } = useGetProductQuery({ id });

  const {
    data: cart,
    isLoading: cartIsLoading,
    error: cartError,
    refetch: cartRefetch,
  } = useGetCartQuery();

  const order = cart?.find((order) => order.product.id === id);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [updateCart] = useUpdateCartMutation();

  const handleDecreaseQuantity = async () => {
    // dispatch(decreaseQuantity(id));
    console.log('order', order);
    console.log('Handle decrease quantity');
    try {
      const updatedCart = cart.map((item) =>
        item.product.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );

      console.log(updatedCart);
      // const response = await updateCart({ data: updatedCart });
      // console.log(response);
      cartRefetch();
    } catch (e) {
      console.log(e);
    }
  };

  const handleIncreaseQuantity = async () => {
    try {
      if (order) {
        console.log('counter order', order);
        console.log('quantity order', order.quantity);
        const updatedQuantity = order.quantity + 1;
        console.log('updatedQuantity', updatedQuantity);
        const response = await updateCart({
          data: [{ id, quantity: updatedQuantity }],
        });
      } else {
        console.error('Product not found in cart');
      }
    } catch (e) {
      console.error('Failed to update cart:', e);
    }
  };

  // const handleIncreaseQuantity = async () => {
  //   // dispatch(increaseQuantity(id));
  //   console.log('Handle increase quantity');
  //   console.log('old', order);
  //   const existingCart = cart.map((item) => ({
  //     id,
  //     quantity: item.quantity,
  //   }));
  //   try {
  //     const updatedCart = cart.map((item) =>
  //       item.product.id === id
  //         ? { ...item, quantity: item.quantity + 1 }
  //         : item,
  //     );
  //
  //     console.log('updated', updatedCart);
  //
  //     const response = await updateCart({ data: updatedCart });
  //     console.log('new', response);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.select();
    if (Number(e.target.value) >= 0) {
      // dispatch(setQuantity({ id, quantity: Number(e.target.value) }));
      console.log('Handle input change');
      try {
        const updatedCart = cart.map((item) =>
          item.product.id === id
            ? { ...item, quantity: Number(e.target.value) }
            : item,
        );

        console.log(updatedCart);

        // const response = await updateCart({ data: updatedCart });
        // console.log(response);
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

  return (
    <StyledCounterWrapper>
      <CounterButtonComponent
        icon={<MinusIconComponent />}
        $function={'decrease'}
        onClick={handleDecreaseQuantity}
      />
      <StyledCounterInput
        type={'number'}
        value={order?.quantity}
        onChange={handleInputChange}
        onFocus={handleFocus}
        ref={inputRef}
      />
      <CounterButtonComponent
        icon={<PlusIconComponent />}
        $function={'increase'}
        onClick={handleIncreaseQuantity}
        disabled={
          order?.quantity > 9 ||
          (order?.quantity + 1) * order?.product.price > 10000
        }
      />
    </StyledCounterWrapper>
  );
};

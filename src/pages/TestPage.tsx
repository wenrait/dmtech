import { ButtonComponent } from '../components/Buttons/ButtonComponent.tsx';
import { PaginationButtonComponent } from '../components/Buttons/PaginationButtonComponent.tsx';
import { LeftIconComponent } from '../components/Icons/LeftIconComponent.tsx';
import { RightIconComponent } from '../components/Icons/RightIconComponent.tsx';
import { CounterButtonComponent } from '../components/Buttons/CounterButtonComponent.tsx';
import { MinusIconComponent } from '../components/Icons/MinusIconComponent.tsx';
import { PlusIconComponent } from '../components/Icons/PlusIconComponent.tsx';
import { LinkButtonComponent } from '../components/Buttons/LinkButtonComponent.tsx';
import { InputComponent } from '../components/InputComponent.tsx';
import { CounterComponent } from '../components/Counter/CounterComponent.tsx';
import { PaginationComponent } from '../components/PaginationComponent.tsx';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGetProductsQuery } from '../redux/services/api/productsApi.ts';
import { ProductCardComponent } from '../components/Widgets/ProductCardComponent.tsx';
import { useLocation } from 'react-router-dom';
import { RatingComponent } from '../components/RatingComponent.tsx';

const TestPageWrapper = styled.div``;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const TestPage = () => {
  const location = useLocation();

  let a = 5;
  a = 'b';

  useEffect(() => {
    console.log(location);
  }, []);

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    limit: 10,
    page: 1,
  });

  const {
    data: cart,
    isLoading: cartIsLoading,
    error: cartError,
  } = useGetProductsQuery({
    limit: 10,
    page: 1,
  });

  if (products) {
    console.log(products);
  }

  if (error) {
    console.log(error);
  }

  return (
    <TestPageWrapper>
      <RatingComponent rating={4.4} />
      <ButtonsContainer>
        <ButtonComponent text={'Кнопка'} />
        <ButtonComponent text={'Выключенная кнопка'} disabled />
      </ButtonsContainer>
      <ButtonsContainer>
        <PaginationButtonComponent number={1} />
        <PaginationButtonComponent icon={<LeftIconComponent />} />
        <PaginationButtonComponent icon={<RightIconComponent />} disabled />
      </ButtonsContainer>
      <ButtonsContainer>
        <CounterButtonComponent icon={<MinusIconComponent />} />
        <CounterButtonComponent icon={<PlusIconComponent />} disabled />
      </ButtonsContainer>
      <ButtonsContainer>
        <LinkButtonComponent variant={'focus'} />
        <LinkButtonComponent variant={'brand'} />
      </ButtonsContainer>
      <InputComponent />
      <CounterComponent />
      <PaginationComponent pages={10} />
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {products?.data &&
        products?.data?.map((product) => (
          <ProductCardComponent
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            category={product.category}
            price={product.price}
            picture={product.picture}
            rating={product.rating}
          />
        ))}
    </TestPageWrapper>
  );
};

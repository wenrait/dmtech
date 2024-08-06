import styled from 'styled-components';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BarComponent } from './components/TabBar/BarComponent.tsx';
import { ProductsPage } from './pages/ProductsPage.tsx';
import { ProductPage } from './pages/ProductPage.tsx';
import { useGetCartQuery } from './redux/services/api/cartApi.ts';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const App = () => {
  const { data, isLoading, error } = useGetCartQuery();

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error)
  }

  return (
    <AppWrapper>
      <header>
        <BarComponent />
      </header>
      <main>
        <Routes>
          <Route path={'*'} element={<Navigate to={'/products'} replace />} />
          <Route exact path={'/products/:id'} element={<ProductPage />} />
          <Route exact path={'/products'} element={<ProductsPage />} />
        </Routes>
      </main>
    </AppWrapper>
  );
};

import styled from 'styled-components';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BarComponent } from './components/TabBar/BarComponent.tsx';
import { ProductsPage } from './pages/ProductsPage.tsx';
import { ProductPage } from './pages/ProductPage.tsx';
import { useGetCartQuery } from './redux/services/api/cartApi.ts';
import { OrdersPage } from "./pages/OrdersPage.tsx";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const App = () => {
  return (
    <AppWrapper>
      <header>
        <BarComponent />
      </header>
      <main>
        <Routes>
          <Route exact path={'/products/:id'} element={<ProductPage />} />
          <Route exact path={'/products'} element={<ProductsPage />} />
          <Route exact path={'/orders'} element={<OrdersPage />} />
          <Route path={'*'} element={<Navigate to={'/products'} replace />} />
        </Routes>
      </main>
    </AppWrapper>
  );
};

import styled from 'styled-components';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BarComponent } from './components/TabBar/BarComponent.tsx';
import { ProductsPage } from './pages/ProductsPage.tsx';
import { ProductPage } from './pages/ProductPage.tsx';
import { OrdersPage } from './pages/OrdersPage.tsx';

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
          <Route path={'/products/:id'} element={<ProductPage />} />
          <Route path={'/products'} element={<ProductsPage />} />
          <Route path={'/orders'} element={<OrdersPage />} />
          <Route path={'*'} element={<Navigate to={'/products'} replace />} />
        </Routes>
      </main>
    </AppWrapper>
  );
};

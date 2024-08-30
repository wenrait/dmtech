import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PaginationComponent } from '@components/PaginationComponent.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { useGetOrdersQuery } from '@api/ordersApi.ts';
import { OrderCardComponent } from '@components/Widgets/OrderCardComponent.tsx';

const StyledOrdersPage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  max-width: 1350px;
  width: 100%;
`;

const StyledOrdersWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1280px;
`;

export const OrdersPage = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const limitUrl = searchParams.get('limit') || '8';
  const pageUrl = searchParams.get('page') || '1';

  const limit = Number(limitUrl);
  const page = Number(pageUrl);

  const cartLocal = useSelector((state: RootState) => state.cartReducer.cart);

  const {
    data: orders,
    isLoading,
    refetch: ordersRefetch,
  } = useGetOrdersQuery({
    limit,
    page,
  });

  useEffect(() => {
    console.log('REFETCH');
    ordersRefetch();
  }, [cartLocal]);

  useEffect(() => {
    if (orders) {
      setTotalPages(Math.ceil(orders?.meta.total / Number(limit)));
    }
  }, [orders, limit]);

  useEffect(() => {
    if (page > totalPages || page < 1) {
      setSearchParams({ page: '1', limit: limitUrl });
    }
  }, [page, totalPages, setSearchParams, limitUrl]);

  return (
    <StyledOrdersPage>
      <StyledOrdersWrapper>
        {isLoading && <div>Loading...</div>}
        {orders?.data &&
          orders.data.map((order, index) => (
            <OrderCardComponent
              key={`order-${index}`}
              orderItem={order}
              onClick={() => console.log(order)}
            />
          ))}
      </StyledOrdersWrapper>
      <PaginationComponent pages={totalPages} page={Number(page)} />
    </StyledOrdersPage>
  );
};

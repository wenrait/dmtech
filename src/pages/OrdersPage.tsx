import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PaginationComponent } from '@components/PaginationComponent.tsx';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store.ts';
import { setLimit, setPage } from '@slices/paginationSlice.ts';
import { useGetOrdersQuery } from '@api/ordersApi.ts';
import { OrderCardComponent } from '@components/Widgets/OrderCardComponent.tsx';

const StyledOrdersPage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  max-width: 1350px;
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
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { limit, page } = useSelector(
    (state: RootState) => state.paginationReducer,
  );

  const [totalPages, setTotalPages] = useState(1);

  const params = new URLSearchParams(location.search);
  const limitUrl = params.get('limit');
  const pageUrl = params.get('page');

  useEffect(() => {
    if (!params.has('limit')) {
      params.set('limit', limit.toString());
    }

    if (!params.has('page')) {
      params.set('page', page.toString());
    }
    navigate(`/orders?${params.toString()}`, { replace: true });
  }, [limit, page, navigate]);

  useEffect(() => {
    if (limitUrl) {
      if (Number(limitUrl) < 8) {
        params.set('limit', '8');
        dispatch(setLimit(8));
      } else if (Number(limitUrl) > 200) {
        params.set('limit', '200');
        dispatch(setLimit(200));
      } else {
        dispatch(setLimit(Number(limitUrl)));
      }
    }

    if (pageUrl) {
      if (Number(pageUrl) < 1) {
        params.set('page', '1');
        dispatch(setPage(1));
      } else if (Number(pageUrl) > totalPages) {
        params.set('page', totalPages.toString());
        dispatch(setPage(totalPages));
      } else {
        dispatch(setPage(Number(pageUrl)));
      }
    }

    navigate(`/orders?${params.toString()}`, { replace: true });
  }, [limitUrl, pageUrl, totalPages, dispatch]);

  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrdersQuery({
    limit,
    page,
  });

  if (orders) {
    console.log(orders);
  }

  useEffect(() => {
    if (orders) {
      setTotalPages(Math.ceil(orders?.meta.total / limit));
    }
  }, [orders, limit]);

  return (
    <StyledOrdersPage>
      <StyledOrdersWrapper>
        {error && <div>{error}</div>}
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
      <PaginationComponent pages={totalPages} page={page} />
    </StyledOrdersPage>
  );
};

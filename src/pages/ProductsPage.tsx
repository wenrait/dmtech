import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetProductsQuery } from '../../redux/services/api/productsApi.ts';
import { ProductCardComponent } from '../components/Widgets/ProductCardComponent.tsx';
import { PaginationComponent } from '../components/PaginationComponent.tsx';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store.ts';
import { setLimit, setPage } from '../../redux/slices/paginationSlice.ts';

const StyledProductsPage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  max-width: 1350px;
`;

const StyledProductsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  max-width: 1350px;
`;

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { limit, page } = useSelector(
    (state: RootState) => state.paginationReducer,
  );

  const [totalPages, setTotalPages] = useState(0);

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
    navigate(`/products?${params.toString()}`, { replace: true });
  }, [limit, page, navigate]);

  useEffect(() => {
    if (limitUrl) {
      if (Number(limitUrl) < 10) {
        params.set('limit', '10');
        dispatch(setLimit(10));
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

    navigate(`/products?${params.toString()}`, { replace: true });
  }, [limitUrl, pageUrl, totalPages, dispatch]);

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    limit,
    page,
  });

  useEffect(() => {
    setTotalPages(Math.ceil(products?.meta.total / limit));
  }, [products, limit]);

  const handleClick = (id) => {
    navigate(`/products/${id}`, { replace: true });
  };

  return (
    <StyledProductsPage>
      <StyledProductsWrapper>
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
              onClick={() => handleClick(product.id)}
            />
          ))}
      </StyledProductsWrapper>
      <PaginationComponent pages={totalPages} page={page} />
    </StyledProductsPage>
  );
};

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGetProductsQuery } from '../../redux/services/api/productsApi.ts';
import { ProductCardComponent } from '../components/Widgets/ProductCardComponent.tsx';
import { PaginationComponent } from '../components/PaginationComponent.tsx';

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
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const limit = Number(params.get('limit')) || 10;
  const page = Number(params.get('page')) || 1;

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    limit,
    page,
  });

  const totalPages = Math.ceil(products?.meta.total / limit);

  useEffect(() => {
    if (!params.has('limit') || !params.has('page')) {
      navigate('/products?limit=10&page=1', { replace: true });
    } else if (page > totalPages) {
      navigate(`/products?limit=${limit}&page=${totalPages}`, {
        replace: true,
      });
    }
  }, [params, navigate, page, totalPages, limit]);

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

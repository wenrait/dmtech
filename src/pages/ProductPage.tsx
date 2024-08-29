import { useGetProductQuery } from '@api/productsApi.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { LinkButtonComponent } from '../components/Buttons/LinkButtonComponent.tsx';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store.ts';
import styled, { css } from 'styled-components';
import { RatingComponent } from '../components/RatingComponent.tsx';
import { ButtonComponent } from '../components/Buttons/ButtonComponent.tsx';
import Undo from '../assets/icons/Undo.svg';
import { colors } from '../styles/colors.ts';
import DOMPurify from 'dompurify';
import { addNewProduct, deleteProduct } from '@slices/cartSlice.ts';
import { CounterComponent } from '../components/Counter/CounterComponent.tsx';
import { IOrderInfo } from '../types/types.ts';
import { useGetCartQuery, useUpdateCartMutation } from '@api/cartApi.ts';
import { useEffect, useState } from 'react';
import { dividePrice, handleProductPictireError } from '../utils/helpers.ts';

const StyledProductPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;

const StyledLinkButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const CardStyle = css`
  max-width: 792px;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
  background: white;
`;

const StyledInfoCard = styled.div`
  ${CardStyle};
`;

const StyledDescriptionCard = styled.div`
  ${CardStyle};
  flex-direction: column;
  align-items: flex-start;
`;

const StyledPicture = styled.img`
  display: block;
  border: 2px solid white;
  max-width: 50%;
`;

const StyledInfo = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const StyledInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  line-height: 32px;
`;

const StyledComponentWrapper = styled.div`
  display: flex;
  padding: 8px 0;
  flex-direction: column;
`;

const StyledPrice = styled.span`
  font-size: 28px;
  font-weight: 800;
  line-height: 32px;
`;

const StyledReturn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledReturnTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  gap: 8px;
`;

const StyledReturnText = styled.span`
  font-size: 16px;
`;

const StyledWarning = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: ${colors.grey.default};
`;

const StyledDescriptionTitle = styled.h2`
  display: flex;
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
`;

const StyledDescription = styled.div`
  margin: 0;
  padding: 0;
  font-size: 16px;

  & p {
    margin: 0;
  }
`;

const StyledCounterWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const ProductPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { limit, page } = useSelector(
    (state: RootState) => state.paginationReducer,
  );

  const {
    data: product,
    isLoading: productIsLoading,
    error: productError,
  } = useGetProductQuery({ id: id as string });
  const { data: cart } = useGetCartQuery();
  const [updateCart] = useUpdateCartMutation();

  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isQuantityNull, setQuantityNull] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleGoBack = () => {
    navigate(`/products?limit=${limit}&page=${page}`);
  };

  const handleAddToCart = async () => {
    try {
      if (cart && product) {
        const existingCart = cart.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
        }));
        const newItem = {
          id: id as string,
          quantity: 1,
        };
        const newCart = [...existingCart, newItem];
        await updateCart({ data: newCart });
        const payload: IOrderInfo = {
          product,
          quantity: 1,
          createdAt: Date.now().toString(),
        };
        dispatch(addNewProduct(payload));
      } else {
        console.error('Корзина недоступна');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteFromCart = async () => {
    try {
      if (cart && id) {
        const existingCart = cart.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
        }));
        const newCart = existingCart.filter((item) => item.id !== id);
        await updateCart({ data: newCart });
        dispatch(deleteProduct(id));
      } else {
        console.error('Корзина недоступна');
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (cart) {
      setTotalCost(
        cart.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
      );
    }
  }, [cart]);

  useEffect(() => {
    if (product) {
      setButtonDisabled(totalCost + product.price > 10000);
    }
  }, [totalCost, product]);

  useEffect(() => {
    if (cart) {
      setIsProductInCart(
        Boolean(cart?.find((order) => order.product.id === id)),
      );
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      setQuantityNull(
        Boolean(cart.find((order) => order.product.id === id)?.quantity === 0),
      );
    }
  }, [cart]);

  useEffect(() => {
    console.log(isQuantityNull);
  }, [isQuantityNull]);

  return (
    <StyledProductPage>
      <StyledLinkButtonWrapper>
        <LinkButtonComponent variant={'brand'} onClick={handleGoBack} />
      </StyledLinkButtonWrapper>
      {productIsLoading && (
        <StyledInfoCard>
          <StyledTitle>Загрузка...</StyledTitle>
        </StyledInfoCard>
      )}
      {product && (
        <StyledCardsContainer>
          <StyledInfoCard>
            <StyledPicture
              src={product.picture}
              alt={product.title}
              onError={handleProductPictireError}
            />
            <StyledInfo>
              <StyledInfoBlock>
                <StyledTitle>{product.title}</StyledTitle>
                <StyledComponentWrapper>
                  <RatingComponent rating={product.rating} />
                </StyledComponentWrapper>
              </StyledInfoBlock>
              <StyledInfoBlock>
                <StyledPrice>{dividePrice(product.price)}</StyledPrice>
                {!isProductInCart ? (
                  <StyledComponentWrapper>
                    <ButtonComponent
                      text={'Добавить в корзину'}
                      onClick={() => handleAddToCart()}
                      disabled={isButtonDisabled}
                    />
                  </StyledComponentWrapper>
                ) : (
                  <StyledCounterWrapper>
                    <CounterComponent id={id as string} />
                    {isQuantityNull ? (
                      <ButtonComponent
                        text={'Удалить'}
                        onClick={() => handleDeleteFromCart()}
                      />
                    ) : (
                      <ButtonComponent
                        text={'Оформить заказ'}
                        onClick={() => handleGoBack()}
                      />
                    )}
                  </StyledCounterWrapper>
                )}
              </StyledInfoBlock>
              <StyledReturn>
                <StyledReturnTitle>
                  <img src={Undo} alt={'Undo'} />
                  Условия возврата
                </StyledReturnTitle>
                <StyledReturnText>
                  Обменять или вернуть товар надлежащего качества можно в
                  течение 14 дней с момента покупки.
                </StyledReturnText>
              </StyledReturn>
              <StyledWarning>
                Цены в интернет-магазине могут отличаться от розничных
                магазинов.
              </StyledWarning>
            </StyledInfo>
          </StyledInfoCard>
          <StyledDescriptionCard>
            <StyledDescriptionTitle>Описание</StyledDescriptionTitle>
            <StyledDescription
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            />
          </StyledDescriptionCard>
        </StyledCardsContainer>
      )}
      {productError && (
        <StyledInfoCard>
          <StyledTitle>404: Товар не найден</StyledTitle>
        </StyledInfoCard>
      )}
    </StyledProductPage>
  );
};

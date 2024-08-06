import { useGetProductQuery } from '../redux/services/api/productsApi.ts';
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
import { addNewProduct } from '../redux/slices/cartSlice.ts';
import { CounterComponent } from '../components/Counter/CounterComponent.tsx';
import { IOrderInfo, IProduct } from '../types.ts';

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

  const order = useSelector((state: RootState) =>
    state.cartReducer.cart.find((order) => order.product.id === id),
  );

  const { data, isLoading, error } = useGetProductQuery({ id });

  const handleGoBack = () => {
    navigate(`/products?limit=${limit}&page=${page}`);
  };

  const handleAddToCart = (data: IProduct) => {
    const payload: IOrderInfo = {
      product: data,
      quantity: 1,
      creditedAt: Date.now().toString(),
    };
    dispatch(addNewProduct(payload));
  };

  return (
    <StyledProductPage>
      <StyledLinkButtonWrapper>
        <LinkButtonComponent variant={'brand'} onClick={handleGoBack} />
      </StyledLinkButtonWrapper>
      {isLoading && (
        <StyledInfoCard>
          <StyledTitle>Загрузка...</StyledTitle>
        </StyledInfoCard>
      )}
      {data && (
        <StyledCardsContainer>
          <StyledInfoCard>
            <StyledPicture src={data.picture} alt={data.title} />
            <StyledInfo>
              <StyledInfoBlock>
                <StyledTitle>{data.title}</StyledTitle>
                <StyledComponentWrapper>
                  <RatingComponent rating={data.rating} />
                </StyledComponentWrapper>
              </StyledInfoBlock>
              <StyledInfoBlock>
                <StyledPrice>{data.price} ₽</StyledPrice>
                {!order ? (
                  <StyledComponentWrapper>
                    <ButtonComponent
                      text={'Добавить в корзину'}
                      onClick={() => handleAddToCart(data)}
                    />
                  </StyledComponentWrapper>
                ) : (
                  <StyledCounterWrapper>
                    <CounterComponent id={id} />
                    <ButtonComponent text={'Оформить заказ'} />
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
                __html: DOMPurify.sanitize(data.description),
              }}
            />
          </StyledDescriptionCard>
        </StyledCardsContainer>
      )}
      {error && (
        <StyledInfoCard>
          <StyledTitle>404: Товар не найден</StyledTitle>
        </StyledInfoCard>
      )}
    </StyledProductPage>
  );
};

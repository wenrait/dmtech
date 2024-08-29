import styled, { css } from 'styled-components';
import { useEffect } from 'react';
import { colors } from '../../styles/colors.ts';
import { format } from 'date-fns';
import { ru } from "date-fns/locale";

const StyledOrderCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  border-radius: 16px;
  background: white;
  padding: 24px;

  transition: 120ms;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.15);
  }
`;

const StyledIndexAndPictures = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const StyledOrderIndexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

const StyledOrderIndex = styled.span`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  color: ${colors.black};
  text-align: left;
`;

const StyledPicturesContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const StyledPicture = styled.img`
  display: block;
  max-width: 48px;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 4px;
`;

const TextStyles = css`
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: ${colors.grey.default};
`;

const StyledTitleLeft = styled.span`
  ${TextStyles};
`;

const StyledTitleRight = styled.span`
  ${TextStyles};
  text-align: right;
`;

const StyledDetailsText = styled.span`
  ${TextStyles};
  color: ${colors.black};
`;

const StyledOrderDateAndPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StyledOrderAndPrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export interface OrderCardComponentProps {
  orderItem: unknown;
  onClick: () => void;
}

export const OrderCardComponent = ({ orderItem }: OrderCardComponentProps) => {
  const uniqueProducts = Array.from(
    new Map(orderItem.map((item) => [item.product.id, item])).values(),
  );

  const createdAt = orderItem[0].createdAt;
  const date = new Date(createdAt);

  return (
    <StyledOrderCard>
      <StyledIndexAndPictures>
        <StyledOrderIndexWrapper>
          <StyledTitleLeft>Заказ</StyledTitleLeft>
          <StyledOrderIndex>№ 1</StyledOrderIndex>
        </StyledOrderIndexWrapper>

        <StyledPicturesContainer>
          {uniqueProducts.map((item) => (
            <StyledPicture
              key={item.product.id}
              src={item.product.picture}
              alt={item.product.title}
            />
          ))}
        </StyledPicturesContainer>
      </StyledIndexAndPictures>
      <StyledOrderDateAndPriceWrapper>
        <StyledOrderAndPrice>
          <StyledTitleRight>Оформлено</StyledTitleRight>
          <StyledTitleRight>Заказ на</StyledTitleRight>
        </StyledOrderAndPrice>
        <StyledOrderAndPrice>
          <StyledDetailsText>
            {format(date, 'd MMMM yyyy', { locale: ru })}
          </StyledDetailsText>
          <StyledDetailsText>
            {orderItem.reduce(
              (acc, item) => acc + item.product.price * item.quantity,
              0,
            )}{' '}
            ₽
          </StyledDetailsText>
        </StyledOrderAndPrice>
      </StyledOrderDateAndPriceWrapper>
    </StyledOrderCard>
    // <StyledOrderCard onClick={onClick}>
    //   <StyledPicturesContainer>
    //     {orderItem.map((item) =>
    //       item.map((product) => (
    //         <StyledPicture
    //           key={product.id}
    //           src={product.picture}
    //           alt={product.title}
    //         />
    //       )),
    //     )}
    //   </StyledPicturesContainer>
    //   <div>{orderItem.createdAt}</div>
    //   <div>
    //     {orderItem.reduce(
    //       (acc, item) => acc + item.quantity * item.product.price,
    //     )}
    //   </div>
    // </StyledOrderCard>
  );
};

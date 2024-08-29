import styled from 'styled-components';
import { colors } from '@styles/colors.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store.ts';
import { useGetCartQuery } from '@api//cartApi.ts';
import { CartIconComponent } from '../Icons/CartIconComponent.tsx';
import { useEffect, useState } from 'react';
import { CartWidget } from '../Widgets/CartComponent.tsx';

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: 120ms;

  color: ${colors.black};
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;

  svg {
    path {
      fill: ${colors.black};
      transition: 120ms;
    }
  }

  &:hover {
    span {
      color: ${colors.brand.default};
    }
    svg {
      path {
        fill: ${colors.brand.default};
      }
    }
  }
`;

const StyledText = styled.span`
  color: ${colors.black};
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;

  @media (max-width: 767px) {
    display: none;
  }
`;

const StyledTextCounter = styled.span`
  color: ${colors.black};
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
`;

export interface TabBarLinkProps {
  text: string;
  to: string;
}

export const CartComponent = () => {
  const { data: cartAPI, isLoading, refetch } = useGetCartQuery();
  const cartLocal = useSelector((state: RootState) => state.cartReducer.cart);

  const [widgetVisible, setWidgetVisible] = useState(false);

  const handleClick = () => {
    if (cartAPI && cartAPI.length > 0) {
      setWidgetVisible((prevState) => !prevState);
    }
  };

  useEffect(() => {
    refetch();
    if (cartAPI?.length === 0 && widgetVisible) {
      setWidgetVisible((prevState) => !prevState);
    }
  }, [cartLocal, cartAPI]);

  return (
    <StyledWrapper>
      <StyledContainer onClick={() => handleClick()}>
        <CartIconComponent />
        <StyledText>Корзина</StyledText>
        <StyledTextCounter>
          ({cartAPI ? cartAPI.length : isLoading})
        </StyledTextCounter>
      </StyledContainer>
      {widgetVisible && <CartWidget />}
    </StyledWrapper>
  );
};

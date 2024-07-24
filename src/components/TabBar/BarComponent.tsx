import styled from 'styled-components';
import { TabBarLinkComponent } from './TabBarLinkComponent.tsx';
import { CartComponent } from './CartComponent.tsx';
import Logo from '../../assets/icons/Logo.svg';

const StyledBar = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 32px 0;
  box-sizing: border-box;
`;

const StyledLogo = styled.img`
  display: block;
  height: 24px;
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const BarComponent = () => {
  return (
    <StyledBar>
      <StyledLogo src={Logo} alt={'Синий куб'} />
      <StyledNav>
        <TabBarLinkComponent text={'Товары'} to={'/products?limit=10&page=1'} />
        <TabBarLinkComponent text={'Заказы'} to={'/age2'} />
      </StyledNav>
      <CartComponent />
    </StyledBar>
  );
};

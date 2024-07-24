import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../styles/colors.ts';

const StyledLink = styled(NavLink)`
  color: ${colors.black};
  font-weight: 700;
  font-size: 16px;
  padding: 8px;
  transition: 120ms;
  text-decoration: none;
  position: relative;

  &:hover {
    color: ${colors.brand.default};
  }

  &:active {
    color: ${colors.brand.default};
  }

  &.active {
    color: ${colors.brand.default};

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      border-radius: 1.5px;
      background: ${colors.brand.default};
    }
  }
`;

export interface TabBarLinkProps {
  text: string;
  to: string;
}

export const TabBarLinkComponent = ({ text, to }: TabBarLinkProps) => {
  return <StyledLink to={to}>{text}</StyledLink>;
};

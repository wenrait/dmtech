import { colors } from '@styles/colors';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const CartNotificationWrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 16px;
  right: 16px;
  padding: 16px;
  background-color: white;
  color: ${colors.black};
  border-radius: 16px;
  animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} 0.5s ease-in-out;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
`;

interface CartSuccessProps {
  visible: boolean;
  message: string;
}

export const CartNotification = ({ visible, message }: CartSuccessProps) => {
  return (
    <CartNotificationWrapper $visible={visible}>
      {message}
    </CartNotificationWrapper>
  );
};

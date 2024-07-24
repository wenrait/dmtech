import styled from 'styled-components';
import { CounterButtonComponent } from './CounterButtonComponent.tsx';
import { MinusIconComponent } from '../Icons/MinusIconComponent.tsx';
import { CounterInputComponent } from './CounterInputComponent.tsx';
import { PlusIconComponent } from '../Icons/PlusIconComponent.tsx';

const StyledCounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CounterComponent = () => {
  return (
    <StyledCounterWrapper>
      <CounterButtonComponent
        icon={<MinusIconComponent />}
        $function={'decrease'}
      />
      <CounterInputComponent />
      <CounterButtonComponent
        icon={<PlusIconComponent />}
        $function={'increase'}
      />
    </StyledCounterWrapper>
  );
};

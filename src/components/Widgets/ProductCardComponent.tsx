import styled from 'styled-components';
import { IProduct } from '../../types/types.ts';
import { RatingComponent } from '../RatingComponent.tsx';
import { handleProductPictireError } from '../../utils/helpers.ts';

const StyledProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  width: 250px;
  border-radius: 12px;
  background: white;

  transition: 120ms;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.15);
  }

  /* @media (max-width: 1199px) {
    width: 100%;
    max-width: 300px;
    flex-wrap: wrap;
  } */
`;

const StyledPictureWrapper = styled.div`
  max-width: 250px;
`;

const StyledPicture = styled.img`
  display: block;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 16px 16px 0 0;
  border: 2px solid white;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px 16px 16px;
  gap: 12px;
`;

const StyledInfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledTitle = styled.h2`
  margin: 0;
  font-size: 16px;
`;

const StyledPrice = styled.span`
  font-size: 22px;
  font-weight: 800;
`;

export interface ProductCardComponentProps
  extends Pick<IProduct, 'id' | 'picture' | 'title' | 'rating' | 'price'> {
  onClick: () => void;
}

export const ProductCardComponent = ({
  id,
  picture,
  title,
  rating,
  price,
  onClick,
}: ProductCardComponentProps) => {
  return (
    <StyledProductCard key={id} onClick={onClick}>
      <StyledPictureWrapper>
        <StyledPicture
          src={picture}
          alt={title}
          onError={handleProductPictireError}
        />
      </StyledPictureWrapper>
      <StyledInfo>
        <StyledInfoHeader>
          <StyledTitle>{title}</StyledTitle>
          <RatingComponent rating={Number(rating)} />
        </StyledInfoHeader>
        <StyledPrice>{price} ₽</StyledPrice>
      </StyledInfo>
    </StyledProductCard>
  );
};

import styled from 'styled-components';

const StyledRatingWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

export interface RatingComponentProps {
  rating: number;
}

export const RatingComponent = ({ rating }: RatingComponentProps) => {
  const int = Math.floor(rating);
  const fract = Math.floor((rating - Math.floor(rating)) * 100);

  let uniqueId: number;
  const getStar = (fill: string) => {
    uniqueId = Math.random();

    return (
      <svg
        key={uniqueId}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={`StarGradient-${uniqueId}`}
            x1="0"
            x2="1"
            y1="0"
            y2="0"
          >
            <stop offset={`${fract}%`} stopColor="#FABC22" />
            <stop offset={`${fract}%`} stopColor="#F2F2F2" />
          </linearGradient>
        </defs>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.81493 10.5999C4.34061 10.5999 3.29926 12.6523 2.10291 11.7872C0.90656 10.9221 2.53795 8.65117 2.10291 7.56977C1.66787 6.48838 -0.289791 6 0.0364866 4.65C0.362764 3.30001 2.75547 3.67675 3.51678 2.85305C4.2781 2.02935 4.4246 0 6.01824 0C7.61189 0 7.85485 2.28427 8.48644 2.85305C9.28102 3.56861 12 3.15728 12 4.65C12 6.14273 10.0646 6.37009 9.82482 7.56977C9.58504 8.76946 10.9124 10.7058 9.82482 11.5709C8.73722 12.4361 7.28926 10.5999 5.81493 10.5999Z"
          fill={fill}
        />
      </svg>
    );
  };

  const getStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        getStar(
          i <= int
            ? `#FABC22`
            : i == int + 1
              ? `url(#StarGradient-${uniqueId})`
              : `#F2F2F2`,
        ),
      );
    }
    return stars;
  };

  return <StyledRatingWrapper>{getStars()}</StyledRatingWrapper>;
};

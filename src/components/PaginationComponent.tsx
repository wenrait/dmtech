import styled from 'styled-components';
import { LeftIconComponent } from './Icons/LeftIconComponent.tsx';
import { RightIconComponent } from './Icons/RightIconComponent.tsx';
import { PaginationButtonComponent } from './Buttons/PaginationButtonComponent.tsx';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export interface PaginationComponentProps {
  pages: number;
  page: number;
}

export const PaginationComponent = ({
  pages,
  page,
}: PaginationComponentProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [buttons, setButtons] = useState([]);

  const handlePageChange = (newPage) => {
    params.set('page', newPage);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const newButtons = [];
    for (let i = 1; i <= pages; i++) {
      newButtons.push(
        <PaginationButtonComponent
          key={`pagination-button-${i}`}
          number={i}
          className={i === page ? 'active' : ''}
          onClick={() => handlePageChange(i)}
        />,
      );
    }

    setButtons(newButtons);
  }, [page, pages]);

  return (
    <PaginationWrapper>
      <PaginationButtonComponent
        icon={<LeftIconComponent />}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      />
      {buttons}
      <PaginationButtonComponent
        icon={<RightIconComponent />}
        disabled={page === pages}
        onClick={() => handlePageChange(page + 1)}
      />
    </PaginationWrapper>
  );
};

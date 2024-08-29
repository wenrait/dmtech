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
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  useEffect(() => {
    const newButtons = [];

    const startPage = Math.max(1, page - 1);
    const endPage = Math.min(pages, page + 1);

    if (startPage > 1) {
      newButtons.push(
        <PaginationButtonComponent
          key="page-1"
          number={1}
          className={1 === page ? 'active' : ''}
          onClick={() => handlePageChange(1)}
        />,
      );

      if (startPage > 2) {
        newButtons.push(
          <PaginationButtonComponent
            key={`${Math.random() * 1000}`}
            number={'...'}
          />,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      newButtons.push(
        <PaginationButtonComponent
          key={`page-${i}`}
          number={i}
          className={i === page ? 'active' : ''}
          onClick={() => handlePageChange(i)}
        />,
      );
    }

    if (endPage < pages) {
      if (endPage < pages - 1) {
        newButtons.push(
          <PaginationButtonComponent
            key={`${Math.random() * 1000}`}
            number={'...'}
          />,
        );
      }
      newButtons.push(
        <PaginationButtonComponent
          key={`page-${pages}`}
          number={pages}
          className={pages === page ? 'active' : ''}
          onClick={() => handlePageChange(pages)}
        />,
      );
    }

    setButtons(newButtons);
  }, [page, pages, navigate, location]);

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

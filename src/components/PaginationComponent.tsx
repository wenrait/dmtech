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

  const [buttons, setButtons] = useState<JSX.Element[]>([]);

  const handlePageChange = (newPage: number) => {
    params.set('page', newPage.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  useEffect(() => {
    const newButtons: JSX.Element[] = [];

    if (pages === 1) {
      newButtons.push(
        <PaginationButtonComponent
          key={`page-1`}
          number={1}
          className={'active'}
          onClick={() => handlePageChange(1)}
        />,
      );
    } else if (pages === 2) {
      for (let i = 1; i < 3; i++) {
        newButtons.push(
          <PaginationButtonComponent
            key={`page-${i}`}
            number={i}
            className={i === page ? 'active' : ''}
            onClick={() => handlePageChange(i)}
          />,
        );
      }
    } else {
      const startPage = Math.max(1, page - 1);
      const endPage = Math.min(pages, page + 1);

      for (let i = 1; i <= Math.min(2, pages); i++) {
        newButtons.push(
          <PaginationButtonComponent
            key={`page-${i}`}
            number={i}
            className={i === page ? 'active' : ''}
            onClick={() => handlePageChange(i)}
          />,
        );
      }

      if (startPage > 3) {
        newButtons.push(
          <PaginationButtonComponent key="left-ellipsis" number="..." />,
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i > 2 && i < pages - 1) {
          newButtons.push(
            <PaginationButtonComponent
              key={`page-${i}`}
              number={i}
              className={i === page ? 'active' : ''}
              onClick={() => handlePageChange(i)}
            />,
          );
        }
      }

      if (endPage < pages - 2) {
        newButtons.push(
          <PaginationButtonComponent key="right-ellipsis" number="..." />,
        );
      }

      for (let i = Math.max(pages - 1, 1); i <= pages; i++) {
        newButtons.push(
          <PaginationButtonComponent
            key={`page-${i}`}
            number={i}
            className={i === page ? 'active' : ''}
            onClick={() => handlePageChange(i)}
          />,
        );
      }
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

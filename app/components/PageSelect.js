import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PageSelect = ({ pages }) => {
  return (
    <Pagination>
      <Pagination.Prev />
      {Array.from({ length: pages }).map((_page, i) => (
        <Pagination.Item key={`page-${i + 1}`}>{i + 1}</Pagination.Item>
      ))}
      <Pagination.Next />
    </Pagination>
  );
};

export default PageSelect;

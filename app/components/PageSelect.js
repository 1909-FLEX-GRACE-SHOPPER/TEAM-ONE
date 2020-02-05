import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

class PageSelect extends React.Component {
  movePage(page) {
    const totalPages = this.props.pages;
    if (page === 0 || page > totalPages) return;
    this.props.history.push(`/products/page/${page}`);
  }
  render() {
    const { pages, selectedPage } = this.props;
    return (
      <Pagination>
        <Pagination.Prev
          onClick={() => {
            this.movePage(Number(selectedPage) - 1);
          }}
        />
        {Array.from({ length: pages }).map((_page, i) => (
          <Pagination.Item
            onClick={() => {
              this.movePage(Number(i + 1));
            }}
            key={`page-${i + 1}`}
            active={Number(i + 1) === Number(selectedPage)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => {
            this.movePage(Number(selectedPage) + 1);
          }}
        />
      </Pagination>
    );
  }
}

export default PageSelect;

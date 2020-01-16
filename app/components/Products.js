import React from 'react';
import Product from './Product.js';
import Pagination from 'react-bootstrap/Pagination';

const Products = ({ products }) => {
  return (
    <div>
      <div className="product-search-and-pagination">
        <div className="filter-and-sort">
          <select id="filter-by">
            <option value="">Filter By</option>
            <option value="option 1">Option 1</option>
            <option value="option 2">Option 2</option>
          </select>
          <select id="sort-by">
            <option value="">Sort By</option>
            <option value="option 1">Option 1</option>
            <option value="option 2">Option 2</option>
          </select>
        </div>
        <Pagination>
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>
      {products.length === 0
        ? 'No products'
        : products.map(_product => (
            <Product key={`product-${_product.id}`} product={_product} />
          ))}
    </div>
  );
};

export default Products;

import React from 'react';
import Product from './Product.js';
import PageSelect from './PageSelect.js';
import AddProductForm from './AddProductForm';

const Products = ({ products }) => {
  const PRODUCTS_PER_PAGE = 10;
  return (
    <div>
      <AddProductForm/>
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
        <PageSelect pages={products.length / PRODUCTS_PER_PAGE} />
      </div>
      <div className="all-products-container">
        {products.length === 0
          ? 'No products'
          : products.map(_product => (
              <Product key={`product-${_product.id}`} product={_product} />
            ))}
      </div>
      <PageSelect pages={products.length / PRODUCTS_PER_PAGE} />
    </div>
  );
};

export default Products;

import React from 'react';
import Product from './Product.js';
import PageSelect from './PageSelect.js';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/thunks/ProductThunks.js';
import Form from 'react-bootstrap/Form';

class Products extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    let { products } = this.props;
    products = products.rows || [];
    const PRODUCTS_PER_PAGE = 10;
    return (
      <div>
        <div className="product-search-and-pagination">
          <div className="filter-and-sort">
            <Form.Control as="select" id="filter-by">
              <option value="">Filter By</option>
              <option value="option 1">Option 1</option>
              <option value="option 2">Option 2</option>
            </Form.Control>
            <Form.Control as="select" id="sort-by">
              <option value="">Sort By</option>
              <option value="option 1">Option 1</option>
              <option value="option 2">Option 2</option>
            </Form.Control>
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
  }
}

const mapState = ({ products }) => ({ products });
const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(Products);

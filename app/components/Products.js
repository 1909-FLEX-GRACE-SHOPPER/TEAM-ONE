import React from 'react';
import Product from './Product.js';
import PageSelect from './PageSelect.js';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/thunks/ProductThunks.js';
import Form from 'react-bootstrap/Form';

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      tag: ''
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  filterProducts(tag) {
    this.setState({ tag });
  }
  render() {
    let { products } = this.props;
    const { tag } = this.state;
    products = products.rows || [];
    const PRODUCTS_PER_PAGE = 10;
    return (
      <div>
        <div className="product-search-and-pagination">
          <div className="filter-and-sort">
            <Form.Label>Filters</Form.Label>
            <Form.Control
              as="select"
              id="filter-by"
              onChange={e => {
                this.filterProducts(e.target.value);
              }}
            >
              <option value="">None</option>
              <option value="Accessory">Accessory</option>
              <option value="Charger">Charger</option>
              <option value="Device">Device</option>
              <option value="Pod">Pod</option>
            </Form.Control>
          </div>
          <PageSelect pages={products.length / PRODUCTS_PER_PAGE} />
        </div>
        <div className="all-products-container">
          {products.length === 0
            ? 'No products'
            : products.map(_product =>
                tag === '' || _product.tags === tag ? (
                  <Product key={`product-${_product.id}`} product={_product} />
                ) : (
                  ''
                )
              )}
        </div>
        <PageSelect pages={products.length / PRODUCTS_PER_PAGE} />
      </div>
    );
  }
}

const mapState = ({ products }) => ({ products });
const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  };
};

export default connect(mapState, mapDispatch)(Products);

import React from 'react';
import Product from './Product.js';
import PageSelect from './PageSelect.js';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/thunks/ProductThunks.js';
import Form from 'react-bootstrap/Form';
import { ITEMS_PER_PAGE } from '../redux/constants';

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      tag: ''
    };
  }
  componentDidMount() {
    this.props.fetchProducts(this.props.match.params.page);
  }
  filterProducts(tag) {
    this.setState({ tag });
  }
  render() {
    let { products } = this.props;
    const { tag } = this.state;
    const productsThisPage = products.rows || [];
    const totalProducts = products.count || 0;
    const selectedPage = this.props.match.params.page;
    const { history } = this.props;
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
          <PageSelect
            pages={Math.floor(totalProducts / ITEMS_PER_PAGE)}
            selectedPage={selectedPage}
            history={history}
          />
        </div>
        <div className="all-products-container">
          {productsThisPage.length === 0
            ? 'No products'
            : productsThisPage.map(_product =>
                tag === '' || _product.tags === tag ? (
                  <Product key={`product-${_product.id}`} product={_product} />
                ) : (
                  ''
                )
              )}
        </div>
        <PageSelect
          pages={Math.floor(totalProducts / ITEMS_PER_PAGE)}
          selectedPage={selectedPage}
          history={history}
        />
      </div>
    );
  }
}

const mapState = ({ products }) => ({ products });
const mapDispatch = dispatch => {
  return {
    fetchProducts: page => dispatch(fetchProducts(page))
  };
};

export default connect(mapState, mapDispatch)(Products);

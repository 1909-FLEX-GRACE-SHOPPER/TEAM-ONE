import React from 'react';
import Product from './Product.js';
import PageSelect from './PageSelect.js';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/thunks/ProductThunks.js';
import Form from 'react-bootstrap/Form';
import { ITEMS_PER_PAGE } from '../redux/constants';

import Nav from 'react-bootstrap/Nav'
import emoji from 'node-emoji';

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
      <div 
        style={
          {
            margin: '3rem',
          }
        }
      >
        <div className="product-search-and-pagination">
          <div className="filter-and-sort">
            <Form.Control
              as="select"
              id="filter-by"
              onChange={e => {
                this.filterProducts(e.target.value);
              }}
              style={
                {
                  width: '10rem',
                  margin: '1rem',
                  border: '1px black solid',
                  borderRadius: 'none',
                }
              }
            >
              <option value="">Filters</option>
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
        <div
          className='all-products-container'
          style={
            {
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }
          }
        >
          {
            this.props.user.userType === 'Admin'
            ? <Nav.Link
                href='/products/add'
                style={
                  {
                    height: '350px',
                    border: '2px solid black',
                    color: 'black'
                  }
                }
              >
              <div
                style={
                  {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '50% 0',
                  }
                }
              >
                { emoji.get('heavy_plus_sign')}
                <p>Add a new product</p>
              </div>
            </Nav.Link>
            : null
          }
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

const mapState = ({ products, user }) => ({ products, user });
const mapDispatch = dispatch => {
  return {
    fetchProducts: page => dispatch(fetchProducts(page))
  };
};

export default connect(mapState, mapDispatch)(Products);

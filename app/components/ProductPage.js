import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchSingleProduct,
  fetchProducts
} from '../redux/thunks/ProductThunks';
import Button from 'react-bootstrap/Button';
import Product from './Product.js';

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0
    };
  }
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
    this.props.fetchProducts();
  }
  render() {
    const { singleProduct, products } = this.props;
    return (
      <div>
        {!singleProduct ? (
          <div>Product Not Found. :(</div>
        ) : (
          <div>
            <Link to="/products">Back</Link>
            <div className="product-page">
              <div className="product-hero">
                <img
                  className="product-image-small"
                  src={singleProduct.productImage}
                />
                <div className="product-details">
                  <div className="product-name">{singleProduct.name}</div>
                  <div className="product-price">{singleProduct.price}</div>
                  <div className="product-quantity-select-container">
                    <input
                      type="number"
                      className="product-quantity-select"
                      max={singleProduct.inventory}
                      value={this.state.quantity}
                      onChange={e => {
                        this.setState({ quantity: e.target.value });
                      }}
                    />
                    <div className="product-sub-total">
                      SUBTOTAL{' '}
                      {`$${(
                        this.state.quantity * singleProduct.unitPrice
                      ).toFixed(2)}`}
                    </div>
                  </div>
                  <Button>ADD TO CART</Button>
                  <Button>ADD TO WISHLIST</Button>
                  <div className="product-description">
                    {singleProduct.description}
                  </div>
                  <div className="social-media-icons">
                    <div>TWITTER</div>
                    <div>INSTAGRAM</div>
                    <div>FACEBOOK</div>
                  </div>
                </div>
              </div>
              <div className="similar-products-container">
                <h5>SIMILAR PRODUCTS</h5>
                {products.map(_sp => (
                  <Product key={`product-${_sp.id}`} product={_sp} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

//TODO: This should fetch similar products not just all products
//TODO: Add wishlist thunk
//TODO: Add cart thunk

const mapState = ({ singleProduct, products }) => ({ singleProduct, products });
const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    fetchProducts: () => dispatch(fetchProducts())
  };
};

export default connect(mapState, mapDispatch)(ProductPage);

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchSingleProduct,
  fetchSimilarProducts
} from '../redux/thunks/ProductThunks';
import { updateCart } from '../redux/thunks/CartThunks';
import { postWishlist } from '../redux/thunks/WishlistThunks';
import Product from './Product';
import Button from 'react-bootstrap/Button';

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0
    };
  }
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
    this.props.fetchSimilarProducts(this.props.match.params.id);
  }

  handleAddToCart = async ({ productId, userId, productQuantity }) => {
    console.log('calling handleAddtoCart');
    console.log(userId);
    await this.props.addToCart(productId, userId, productQuantity);
  };

  postWishlist = async ({ productId, userId }) => {
    await this.props.postWishlist(productId, userId);
  };

  render() {
    const { singleProduct, user, similarProducts } = this.props;
    return (
      <div>
        {!singleProduct ? (
          <div>Product Not Found. :(</div>
        ) : (
          <div>
            <Link to='/products'>Back</Link>
            <div className='product-page'>
              <div className='product-hero'>
                <img
                  className='product-image-small'
                  src={singleProduct.productImage}
                />
                <div className='product-details'>
                  <div className='product-name'>{singleProduct.name}</div>
                  <div className='product-price'>{singleProduct.price}</div>
                  <div className='product-quantity-select-container'>
                    <input
                      type='number'
                      className='product-quantity-select'
                      max={singleProduct.inventory}
                      min='0'
                      value={this.state.quantity}
                      onChange={e => {
                        this.setState({ quantity: e.target.value });
                      }}
                    />
                    <div className='product-sub-total'>
                      SUBTOTAL{' '}
                      {`$${(
                        this.state.quantity * singleProduct.unitPrice
                      ).toFixed(2)}`}
                    </div>
                  </div>
                  <Button
                    disabled={this.state.quantity === 0}
                    onClick={() => {
                      this.handleAddToCart({
                        productId: singleProduct.id,
                        userId: user.id,
                        productQuantity: this.state.quantity
                      });
                    }}
                  >
                    ADD TO CART
                  </Button>
                  <Button
                    disabled={user.userType === 'Guest'}
                    onClick={() =>
                      this.postWishlist({
                        productId: singleProduct.id,
                        userId: user.id
                      })
                    }
                  >
                    ADD TO WISHLIST
                  </Button>
                  <div className='product-description'>
                    {singleProduct.description}
                  </div>
                  <div className='social-media-icons'>
                    <div>TWITTER</div>
                    <div>INSTAGRAM</div>
                    <div>FACEBOOK</div>
                  </div>
                </div>
              </div>
              <div className='similar-products-container'>
                <h5>SIMILAR PRODUCTS</h5>
                <div>
                  {similarProducts.length > 0
                    ? similarProducts.map(_sp => (
                        <Product
                          key={`simililar-product-${_sp.id}`}
                          product={_sp}
                        />
                      ))
                    : 'No similar Products'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

//TODO: This should fetch similar products not just all products
//TODO: Add cart thunk
const mapState = ({ singleProduct, user, similarProducts }) => ({
  singleProduct,
  user,
  similarProducts
});
const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    fetchSimilarProducts: productId =>
      dispatch(fetchSimilarProducts(productId)),
    postWishlist: (productId, userId) =>
      dispatch(postWishlist(productId, userId)),
    addToCart: (productId, userId, productQuantity) =>
      dispatch(updateCart(productId, userId, productQuantity))
  };
};

export default connect(mapState, mapDispatch)(ProductPage);

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchSingleProduct,
  fetchSimilarProducts
} from '../redux/thunks/ProductThunks';
import { addToCart, updateCartItemQuantity } from '../redux/thunks/CartThunks';
import { postWishlist } from '../redux/thunks/WishlistThunks';
import Product from './Product';
import Button from 'react-bootstrap/Button';

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
      updateCartItem: false
    };
  }
  componentDidMount() {
    console.log('calling componentDidMount in Product Page');
    this.props.fetchSingleProduct(this.props.match.params.id);
    this.props.fetchSimilarProducts(this.props.match.params.id);
  }

  // componentDidUpdate() {
  //   console.log('calling componentDidUpdate in Product Page');
  //   this.checkProductInCart();
  // }

  //TO DO: how to make updateCartItem stay true once a product is added to cartList
  handleAddToCart = ({
    productId,
    cartId,
    productQuantity,
    userId,
    subtotal
  }) => {
    // const { isInCart } = this.props.cartList;
    // const { updateCartItem } = this.state;
    // console.log(this.state);
    // if (updateCartItem) {
    //   console.log('product exists in cart');
    //   const newQuantity = productQuantity;
    //   const newSubtotal = subtotal;
    //   this.props.updateCartItemQuantity(
    //     newQuantity,
    //     newSubtotal,
    //     productId,
    //     userId
    //   );
    // } else {
    //   console.log('product doesnt exist in cart');
    //   this.setState({ updateCartItem: true });
    //   this.props.addToCart(
    //     productId,
    //     cartId,
    //     productQuantity,
    //     userId,
    //     subtotal
    //   );
    // }
    // this.setState({ quantity: 0 });

    this.props.addToCart(productId, cartId, productQuantity, userId, subtotal);
    this.setState({ quantity: 0 });
  };

  checkProductInCart = () => {
    const { cartList, singleProduct } = this.props;
    const {
      productId,
      productIdList,
      updateCartItem,
      selectedCartItem
    } = this.state;

    let tempProductIdList = [];
    cartList.map(item => {
      tempProductIdList.push(item.productId);
    });

    if (!tempProductIdList.includes(productId) && !updateCartItem) {
      this.setState({
        productId: singleProduct.id,
        productIdList: tempProductIdList
      });
    } else if (tempProductIdList.includes(productId) && !updateCartItem) {
      cartList.map(item => {
        if (productId === item.productId) {
          this.setState({ selectedCartItem, item });
        }
      });
    }
  };

  postWishlist = async ({ productId, userId }) => {
    await this.props.postWishlist(productId, userId);
  };

  render() {
    const { singleProduct, user, cart, similarProducts } = this.props;
    return (
      <div className='container mt-4'>
        {!singleProduct ? (
          <div>Product Not Found. :(</div>
        ) : (
          <div>
            <Button
              href="/products"
              style={
                {
                  borderRadius: '0',
                  backgroundColor:'white',
                  color: 'black',
                  border: '2px solid black',
                }
              }
            >
              Back
            </Button>
            <div
              className="product-page"
              style={
                {
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '2rem',
                }
              }
            >
              <div
                style={
                  {
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }
                }
              >
              <div
                className='product-hero-container'
              >
                <div className="product-hero">
                  <img
                    className="product-image-small"
                    src={singleProduct.productImage}
                    style={
                      {
                        width: '50vw',
                      }
                    }
                  />
                </div>
              </div>
              <div>
                <div className="product-details">
                  <div className="product-name">{singleProduct.name}</div>
                  <div className="product-price">{singleProduct.price}</div>
                  <div 
                    className="product-quantity-select-container"
                    style={
                      {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                    }
                  >
                    <input
                      type="number"
                      className="product-quantity-select"
                      max={singleProduct.inventory}
                      min="0"
                      value={this.state.quantity}
                      onChange={e => {
                        this.setState({ quantity: e.target.value });
                      }}
                      style={
                        {
                          width: '300px'
                        }
                      }
                    />
                    <div
                      className="product-sub-total"
                      style={
                        {
                          paddingTop: '1rem',
                        }
                      }
                    >
                      SUBTOTAL{' '}
                      {`$${(
                        this.state.quantity * singleProduct.unitPrice
                      ).toFixed(2)}`}
                    </div>
                  </div>
                  <div
                    style={
                      {
                        display: 'flex',
                        margin: '1rem',
                      }
                    }
                  >
                    <div
                      style={
                        {
                          display: 'flex',
                          flexDirection: 'column',
                        }
                      }
                    >

                    <Button
                      disabled={this.state.quantity === 0}
                      onClick={() => {
                        this.handleAddToCart({
                          productId: singleProduct.id,
                          cartId: cart.id,
                          productQuantity: this.state.quantity,
                          userId: user.id,
                          subtotal: this.state.quantity * singleProduct.unitPrice
                        });
                      }}
                      style={
                        {
                          margin: '1rem',
                          backgroundColor: 'black',
                          border: 'none',
                          borderRadius: '0',
                          width: '300px'
                        }
                      }
                    >
                      ADD TO CART
                    </Button>
                    {
                      this.props.user.userType === 'Existing customer'
                    ? <Button
                      disabled={user.userType === 'Guest'}
                      onClick={() =>
                        this.postWishlist({
                          productId: singleProduct.id,
                          userId: user.id
                        })
                      }
                      style={
                        {
                          margin: '1rem',
                          backgroundColor: 'black',
                          border: 'none',
                          borderRadius: '0',
                          width: '300px'
                        }
                      }
                    >
                      ADD TO WISHLIST
                    </Button>
                    : null
                    }
                    </div>
                  </div>
                  <div className="product-description">
                    {singleProduct.description}
                  </div>
                </div>
              </div>
              </div>
              <div>
              <div>
                <div
                  className="similar-products-container"
                  style={
                    {
                      margin: '2rem',
                    }
                  }
                >
                  <h5>PRODUCTS YOU MAY BE INTERESTED IN</h5>
                  <div
                    style={
                      {
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                    }
                  >
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
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = ({
  singleProduct,
  user,
  cart,
  similarProducts,
  cartList
}) => ({
  singleProduct,
  user,
  cart,
  similarProducts,
  cartList
});
const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    fetchSimilarProducts: productId =>
      dispatch(fetchSimilarProducts(productId)),
    postWishlist: (productId, userId) =>
      dispatch(postWishlist(productId, userId)),
    addToCart: (productId, cartId, productQuantity, userId, subtotal) =>
      dispatch(addToCart(productId, cartId, productQuantity, userId, subtotal)),
    updateCartItemQuantity: (productId, productQuantity, subtotal) =>
      dispatch(updateCartItemQuantity(productId, productQuantity, subtotal))
  };
};

export default connect(mapState, mapDispatch)(ProductPage);

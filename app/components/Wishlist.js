import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchWishlist } from '../redux/thunks/WishlistThunks';
import WishlistItem from './WishlistItem.js';

class Wishlist extends React.Component {
  componentDidMount() {
    this.props.fetchWishlist(this.props.match.params.id);
  }
  render() {
    const { wishlist } = this.props;
    console.log('RENDERING WISHLIST ');
    return (
      <div>
        {wishlist.length === 0 ? (
          <div>Your wishlist is empty</div>
        ) : (
          <div>
            <Link>Back</Link>
            <div className="wishlist-product-listing">
              {wishlist.map(_product => (
                <WishlistItem key={`wl-${_product.id}`} product={_product} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = ({ wishlist }) => ({ wishlist });
const mapDispatch = dispatch => {
  return {
    fetchWishlist: userId => dispatch(fetchWishlist(userId))
  };
};

export default connect(mapState, mapDispatch)(Wishlist);

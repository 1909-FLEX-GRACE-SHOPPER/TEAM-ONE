import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchWishlist } from '../redux/thunks/WishlistThunks';
import WishlistItem from './WishlistItem.js';

class Wishlist extends React.Component {
  componentDidMount() {
    console.log('USER IS ', this.props.user);
    if (
      this.props.user.userType !== 'Guest' &&
      this.props.user.userType !== undefined
    ) {
      this.props.fetchWishlist(this.props.match.params.userId);
    }
  }
  render() {
    const { wishlist, user } = this.props;
    if (user.userType === 'Guest') {
      return <div>Please create an account to create a wishlist.</div>;
    } else {
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
}

const mapState = ({ wishlist, user }) => ({ wishlist, user });
const mapDispatch = dispatch => {
  return {
    fetchWishlist: userId => dispatch(fetchWishlist(userId))
  };
};

export default connect(mapState, mapDispatch)(Wishlist);

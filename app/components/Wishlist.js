import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchWishlist, deleteWishlist } from '../redux/thunks/WishlistThunks';
import WishlistItem from './WishlistItem.js';
import Loading from './Loading';

class Wishlist extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchWishlist(this.props.match.params.userId);
  }

  handleRemoveItem = async item => {
    await this.props.removeItem(item);
  };

  render() {
    const { wishlist, user } = this.props;
    console.log('calling Wishlist render');
    console.log(wishlist);
    if (user.userType === 'Guest' || user.userType === undefined) {
      return <div>Please create an account to create a wishlist.</div>;
    }
    return (
      <div>
        {wishlist.length === 0 ? (
          <div>
            <h4>WISHLIST</h4>
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          <div>
            <Link to='/products/page/1'>Back</Link>
            <h4>WISHLIST</h4>
            <ListGroup className='wishlist-product-list'>
              {wishlist.map(item => (
                <ListGroup.Item key={item.id}>
                  <WishlistItem key={item.id} item={item} />
                  <Button onClick={() => this.handleRemoveItem(item)}>
                    Remove
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  const wishlist = state.wishlist;
  const user = state.user;
  return { wishlist, user };
};

const mapDispatch = dispatch => {
  return {
    fetchWishlist: userId => dispatch(fetchWishlist(userId)),
    removeItem: item => dispatch(deleteWishlist(item))
  };
};

export default connect(mapState, mapDispatch)(Wishlist);

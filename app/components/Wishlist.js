import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchWishlist, deleteWishlist } from '../redux/thunks/WishlistThunks';
import WishlistItem from './WishlistItem.js';

class Wishlist extends React.Component {
  componentDidMount() {
    if (
      this.props.user.userType !== 'Guest' &&
      this.props.user.userType !== undefined
    ) {
      console.log(this.props.match.params.userId);
      this.props.fetchWishlist(this.props.match.params.userId);
    }
  }

  handleRemoveItem = async item => {
    await this.props.removeItem(item);
  };

  render() {
    const { wishlist, user } = this.props;
    console.log('calling Wishlist render');
    console.log(wishlist);
    if (user.userType === 'Guest') {
      return <div>Please create an account to create a wishlist.</div>;
    } else {
      return (
        <div>
          {wishlist.length === 0 ? (
            <div>
              <h4>WISHLIST</h4>
              <p>Your wishlist is empty.</p>
            </div>
          ) : (
            <div>
              <Link>Back</Link>
              <h4>WISHLIST</h4>
              <ListGroup className='wishlist-product-list'>
                {wishlist.map(item => (
                  <ListGroup.Item key={item.id}>
                    {/* bring in associated product */}
                    <WishlistItem key={item.id} />

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
}

const mapState = ({ wishlist, user }) => ({ wishlist, user });
const mapDispatch = dispatch => {
  return {
    fetchWishlist: userId => dispatch(fetchWishlist(userId)),
    removeItem: item => dispatch(deleteWishlist(item))
  };
};

export default connect(mapState, mapDispatch)(Wishlist);

import React from 'react';
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';

import { fetchFeaturedProducts } from '../redux/thunks/ProductThunks'

import Product from './Product';
import Loading from './Loading';

class WelcomeMessage extends React.Component {
  componentDidMount() {
    this.props.fetchFeaturedProducts();
  }

  render() {
    return (
      <div>
        <div id='hero-image-container'>
          <img
            id="hero-image"
            src='https://d3i6fh83elv35t.cloudfront.net/static/2019/08/vaping-1024x683.jpg'
          />
          <h1 className='hero-text'>Check out what the cool kids are doing</h1>
        </div>
        <div className='container featured-products section'>
          <h3 className='mt-3 header'>Featured Products</h3>
          <div className='featured-products-container'>
            {
              this.props.featuredProducts
              ? this.props.featuredProducts.map(product => {
                return (
                  <Product key={`product-${product.id}`} product={product} />
                )
              })
              : <Loading message='Retrieving Featured Products' />
            }
          </div>
        </div>
        <div className='home-image-div'>
          <img
            src='https://wi-images.condecdn.net/image/z3P1QYD83Xa/crop/2040/f/wired-vaping-1.jpg'
            className='home-image'
          />
          <div className='home-text-button'>
            <h2>Premium vaping devices in stylish colors</h2>
            <Button
              to='/shop'
              className='home-button'
            >
              Explore the whole collection
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ products, featuredProducts }) => ({ products, featuredProducts })

const mapDispatch = dispatch => {
  return {
    fetchFeaturedProducts: () => dispatch(fetchFeaturedProducts())
  }
}

export default connect(mapState, mapDispatch)(WelcomeMessage)

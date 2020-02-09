import React from 'react';
import { connect } from 'react-redux'


class WelcomeMessage extends React.Component {
  render() {
    return (
      <div>
        <div>
          <img
            id="hero-image"
            src='https://d3i6fh83elv35t.cloudfront.net/static/2019/08/vaping-1024x683.jpg'
          />
        </div>
        <div className='container featured-products'>
          {

          }
        </div>
      </div>
    );
  }
}

const mapState = ({ products }) => ({ products })

export default connect(mapState)(WelcomeMessage)

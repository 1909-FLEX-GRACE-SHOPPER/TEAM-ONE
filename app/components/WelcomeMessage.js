import React from 'react';
import { connect } from 'react-redux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';


class WelcomeMessage extends React.Component {
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

const mapState = ({ products }) => ({ products })

export default connect(mapState)(WelcomeMessage)

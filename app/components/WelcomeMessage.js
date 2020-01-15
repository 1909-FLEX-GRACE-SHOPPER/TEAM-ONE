import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';

class WelcomeMessage extends React.Component {
  constructor() {
    super();
    this.state = {
      showToast: false
    };
  }
  toggleShow() {
    const { showToast } = this.state;
    this.setState({ showToast: !showToast });
  }
  render() {
    return (
      <Jumbotron>
        <Toast show={this.state.showToast} onClose={() => this.toggleShow()}>
          <Toast.Header>
            <strong className="mr-auto">It's Toasty!</strong>
          </Toast.Header>
          <Toast.Body>I am a toast in Bootstrap</Toast.Body>
        </Toast>
        <h1 className="header">Welcome to the Juul Store</h1>
        <p className="lead">
          We can do cool stuff with{' '}
          <a
            href="https://getbootstrap.com/docs/4.0/getting-started/introduction/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bootstrap
          </a>
        </p>
        <hr className="my-4" />
        <Button
          onClick={() => {
            this.toggleShow();
          }}
        >
          Click Me
        </Button>
      </Jumbotron>
    );
  }
}

export default WelcomeMessage;

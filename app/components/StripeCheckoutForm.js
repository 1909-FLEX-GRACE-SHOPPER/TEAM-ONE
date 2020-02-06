import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { CardSection } from './CardSection';

class StripeCheckoutForm extends Component {

    handleOnClick = e => {
        e.preventDefault();
        this.props.stripe.confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
            payment_method: {
                card: this.props.elements.getElement('card'),
                billing_details: {
                    name: 'meow',
                },
            }
        });
    };

    render() {
        return (
            <Form>
                <CardSection />
                <Button onClick={ this.handleOnClick }>Confirm order</Button>
            </Form>
        )
    }
}

export default injectStripe(StripeCheckoutForm);
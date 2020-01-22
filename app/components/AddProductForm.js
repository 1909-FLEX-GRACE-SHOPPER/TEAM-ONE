import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const { Row, Group, Label, Control, Col } = Form

import { connect } from 'react-redux';

import { postProduct } from '../redux/thunks/ProductThunks';

//TODO: add state and input for file upload

class AddProductForm extends Component {
	constructor() {
		super();
		this.state = {
			productName: '',
			productDescription: '',
			unitPrice: 0,
			inventory: 0,
		}
	}

	handleOnChange = ({ target: { name, value } }) => {
		this.setState({ [name]: value })
	}

	handleOnSubmit = e => {
		e.preventDefault();
		this.props.postProduct(this.state);
	}

	render() {
		const { productName, productDescription, unitPrice, inventory } = this.state;
		return (
			<div>
				<Form>
					<Group controlId='productName'>
						<Label>Product Name</Label>
						<Control placeholder='Product Name' value={ productName } name='productName' onChange={ this.handleOnChange }/>
					</Group>

					<Group controlId='ProductDescription'>
						<Label>Product Description</Label>
						<Control placeholder='Product Description' value={ productDescription } name='productDescription' onChange={ this.handleOnChange }/>
					</Group>

					<Row>
						<Group as={ Col } controlId="unitPrice">
							<Label>Unit Price</Label>
							<Control placeholder='0.00' value={ unitPrice } name='unitPrice' onChange={ this.handleOnChange }/>
						</Group>

						<Group as={ Col } controlId="inventory">
							<Label>Inventory</Label>
							<Control placeholder='0' value={ inventory } name='inventory' onChange={ this.handleOnChange }/>
						</Group>
					</Row>

					<Button onClick={ this.handleOnSubmit }>Submit</Button>
				</Form>
			</div>
		)
	}
}

const mapDispatch = dispatch => ({ postProduct: state => dispatch(postProduct(state)) })

export default connect(null, mapDispatch)(AddProductForm);
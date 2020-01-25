import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const { Row, Group, Label, Control, Col } = Form

import { connect } from 'react-redux';

import { postProduct } from '../redux/thunks/ProductThunks';

//TODO: error-handling
//TODO: add tagging system

class AddProductForm extends Component {
	constructor() {
		super();
		this.state = {
			productName: '',
			productDescription: '',
			unitPrice: '',
			inventory: '',
			file: [],
			fileName: '',
			errors: {
				productName: '',
				unitPrice: '',
				inventory: '',
			}
		}
	}

	handleOnChange = ({ target: { name, value } }) => {
		this.setState({ [name]: value })
	}

	handleBrowse = e => {
		this.setState({
			file: e.target.files[0],
			fileName: e.target.files[0].name,
		})
	}

	handleOnSubmit = e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('productImage', this.state.file)

		Object.keys(this.state).forEach(key => {
			formData.append(`${ [key] }`, this.state[key])
		})

		this.props.postProduct( formData );
		this.setState({
			productName: '',
			productDescription: '',
			unitPrice: '',
			inventory: '',
			file: [],
			fileName: ''
		})
	}

	render() {
				console.log(this.state.productImage)
				console.log(this.state)
		const { productName, productDescription, unitPrice, inventory, file, fileName } = this.state;
		return (
			<div className='container mt-4'>
				<Form encType="multipart/form-data">
					<Group controlId='productName'>
						<Label>Product Name</Label>
						<Control
							value={ productName }
							name='productName'
							onChange={ this.handleOnChange }
						/>
					</Group>

					<Group controlId='ProductDescription'>
						<Label>Product Description</Label>
						<Control
							value={ productDescription }
							name='productDescription'
							onChange={ this.handleOnChange }
						/>
					</Group>

					<Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
						<Group as={ Col } controlId="unitPrice">
							<Label>Unit Price</Label>
							<Control
								placeholder='0.00'
								value={ unitPrice }
								name='unitPrice'
								onChange={ this.handleOnChange }
							/>
						</Group>

						<Group as={ Col } controlId="inventory">
							<Label>Inventory</Label>
							<Control
								placeholder='0'
								value={ inventory }
								name='inventory'
								onChange={ this.handleOnChange }
							/>
						</Group>

						<Group as={ Col }>
							<Label>Product Image</Label>
							<div className="custom-file">
								<label className="custom-file-label" htmlFor="customFile">{ fileName }</label>
								<Control type="file" className="custom-file-input" id="customFile" onChange={ this.handleBrowse }/>
							</div>
						</Group>
					</Row>

					<Button disabled={ !productName || !unitPrice ? true : false } onClick={ this.handleOnSubmit }>Create Product</Button>
				</Form>
			</div>
		)
	}
}

const mapDispatch = dispatch => ({ postProduct: state => dispatch(postProduct(state)) })

export default connect(null, mapDispatch)(AddProductForm);
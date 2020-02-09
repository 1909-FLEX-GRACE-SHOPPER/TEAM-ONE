import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const { Row, Group, Label, Control, Col, Check } = Form;

import { connect } from 'react-redux';

import { postProduct } from '../redux/thunks/ProductThunks';

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
      tags: '',
      featured: false,
      errors: {
        productNameError: '',
        fileError: '',
        unitPriceError: '',
        inventoryError: ''
      }
    };
  }

  validate = (field, value) => {
    const { file, fileName, errors } = this.state;
    switch (field) {
      case 'fileName':
        if (!fileName.match(/.(jpg|png|gif)$/i)) {
          this.setState({
            errors: {
              ...errors,
              fileError: 'File type not valid. Choose another file.'
            }
          });
        } else if (file.size > 1024 * 1024 * 5) {
          this.setState({
            errors: {
              ...errors,
              fileError: 'File size too large. Choose another file.'
            }
          });
        } else {
          this.setState({ errors: { fileError: '' } });
        }
        break;

      case 'unitPrice':
        if (isNaN(value * 1)) {
          this.setState({
            errors: {
              ...errors,
              unitPriceError: 'Price not valid'
            }
          });
        } else if(!value) {
          this.setState({
            errors: {
              ...errors,
              unitPriceError: 'Required field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              unitPriceError: ''
            }
          });
        }
        break;

      case 'inventory':
        if (isNaN(value * 1)) {
          this.setState({
            errors: {
              ...errors,
              inventoryError: 'Inventory not valid'
            }
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              inventoryError: ''
            }
          });
        }
        break;

      case 'productName':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              productNameError: 'Required Field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              productNameError: '',
            }
          })
        }
        break;

      default:
        break;
    }
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.validate(name, value);
    });
  };

  handleOnCheck = () => {
    this.setState({ featured: !this.state.featured })
  }

  handleBrowse = e => {
    if (e.target.files[0]) {
      this.setState(
        {
          file: e.target.files[0],
          fileName: e.target.files[0].name
        },
        () => {
          this.validate('fileName', this.state.fileName);
        }
      );
    }
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productImage', this.state.file);
    Object.keys(this.state).forEach(key => {
      formData.append(`${[key]}`, this.state[key]);
    });

    this.props.postProduct(formData);
    this.setState({
      productName: '',
      productDescription: '',
      unitPrice: '',
      inventory: '',
      file: [],
      fileName: '',
      tags: ''
    });
  };

  render() {
    const {
      productName,
      productDescription,
      unitPrice,
      inventory,
      fileName,
      tags,
      errors: {
        productNameError,
        fileError,
        unitPriceError,
        inventoryError
      }
    } = this.state;
    return (
      <div className="container mt-4">
        <Form encType="multipart/form-data">
          <Group controlId="productName">
            <Label>
              Product Name{' '}
              <span style={{ color: 'red', fontSize: '10px' }}>*required</span>
            </Label>
            <Control
              value={productName}
              name="productName"
              onChange={this.handleOnChange}
              isInvalid={ !!productNameError }
              required
            />
            <Control.Feedback
              type='invalid'
              className='text-danger'
            >
              { productNameError }
            </Control.Feedback>
          </Group>

          <Group controlId="ProductDescription">
            <Label>Product Description</Label>
            <Control
              value={productDescription}
              name="productDescription"
              onChange={this.handleOnChange}
            />
          </Group>

          <Group controlId="tags">
            <Label>Tags</Label>
            <Control
              as="select"
              value={tags}
              name="tags"
              onChange={this.handleOnChange}
            >
              <option value="">None</option>
              <option value="Pod">Pod</option>
              <option value="Device">Device</option>
              <option value="Charger">Charger</option>
              <option value="Accessory">Accessory</option>
            </Control>
          </Group>

          <Group
            controlId='featured'
            style={
              {
                display: 'flex'
              }
            }
          >
            <Label>Featured</Label>
            <Check
              type='checkbox'
              onChange={ this.handleOnCheck }
            />
          </Group>

          <Row
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end'
            }}
          >
            <Group
              as={Col}
              controlId="unitPrice"
              style={{ width: 'calc(50% - 1rem)' }}
            >
              <Label>
                Unit Price{' '}
                <span style={{ color: 'red', fontSize: '10px' }}>
                  *required
                </span>
              </Label>
              <Control
                value={unitPrice}
                name="unitPrice"
                onChange={this.handleOnChange}
                isInvalid={ !!unitPriceError }
                style={{ WebkitAppearance: 'none' }}
              />
              <Control.Feedback
                type='invalid'
                className='text-danger'
              >
                {unitPriceError}
              </Control.Feedback>
            </Group>

            <Group
              as={Col}
              controlId="inventory"
              style={{ width: 'calc(50% - 1rem)' }}
            >
              <Label>Inventory</Label>
              <Control
                placeholder="0"
                value={inventory}
                name="inventory"
                onChange={this.handleOnChange}
                required
                isInvalid={ !!inventoryError }
              />
              <Control.Feedback 
                className="text-danger"
                type='invalid'
              >
                {inventoryError}
              </Control.Feedback>
            </Group>

            <Group as={Col}>
              <Label>
                Product Image{' '}
                <span style={{ color: 'red', fontSize: '10px' }}>
                  *File Size must not exceed 5MB. Accepted formats: .jpg .png
                  .gif
                </span>
              </Label>
              <div className="custom-file">
                <label className="custom-file-label" htmlFor="customFile">
                  {fileName}
                </label>
                <Control
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                  onChange={this.handleBrowse}
                  isInvalid={ !!fileError }
                />
                <Control.Feedback
                  className='text-danger'
                  type='invalid'
                >
                  { fileError }
                </Control.Feedback>
              </div>
            </Group>
          </Row>

          <Button
            disabled={
              !productName ||
              !unitPrice ||
              productNameError ||
              fileError ||
              unitPriceError ||
              inventoryError
            }
            onClick={this.handleOnSubmit}
          >
            Create Product
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    postProduct: form => dispatch(postProduct(form))
  };
};

export default connect(null, mapDispatch)(AddProductForm);

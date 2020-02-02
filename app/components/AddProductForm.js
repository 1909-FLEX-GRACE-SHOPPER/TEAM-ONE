import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const { Row, Group, Label, Control, Col } = Form;

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
      errors: {
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

      default:
        break;
    }
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.validate(name, value);
    });
  };

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
      fileName: ''
    });
  };

  render() {
    const {
      productName,
      productDescription,
      unitPrice,
      inventory,
      fileName,
      errors: { fileError, unitPriceError, inventoryError }
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
              required
            />
          </Group>

          <Group controlId="ProductDescription">
            <Label>Product Description</Label>
            <Control
              value={productDescription}
              name="productDescription"
              onChange={this.handleOnChange}
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
                required
                style={{ WebkitAppearance: 'none' }}
              />
              <p show={unitPriceError} className="danger">
                {unitPriceError}
              </p>
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
              />
              <p show={inventoryError} className="danger">
                {inventoryError}
              </p>
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
                />
              </div>
            </Group>
            <p show={fileError} className="danger">
              {fileError}
            </p>
          </Row>

          <Button
            disabled={
              !productName ||
              !unitPrice ||
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

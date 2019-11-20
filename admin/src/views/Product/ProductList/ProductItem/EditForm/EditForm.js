import React, { Component } from 'react';
import {
  Button,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from 'reactstrap';
import { SIZE_M_ID, SIZE_L_ID } from '../../../../../constants/sizeId';
import callApi from '../../../../../utils/apiCaller';
import { FETCH_CATEGORIES } from '../../../../../constants/category.actiontypes';
import { connect } from 'react-redux';
import { UPDATE_PRODUCT } from '../../../../../constants/product.actiontypes';
import { PRODUCT_IMAGE_FOLDER } from '../../../../../constants/media'

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      image: '',
      categoryId: '',
      sizes: [],
      priceOfSizeM: "",
      priceOfSizeL: "",
      files: []
    };
  }

  componentWillReceiveProps(nextProps) {
    let { id, name, category, image, sizes } = nextProps.product;
    this.setState({
      id,
      name,
      categoryId: category.id,
      image,
      sizes,
      priceOfSizeM: sizes[0].sizeName === "M" ? sizes[0].price : sizes[1].price,
      priceOfSizeL: sizes[0].sizeName === "L" ? sizes[0].price : sizes[1].price
    });
  }

  componentWillMount() {
    let { id, name, category, image, sizes } = this.props.product;
    this.setState({
      id,
      name,
      categoryId: category.id,
      image,
      sizes,
      priceOfSizeM: sizes[0].sizeName === "M" ? sizes[0].price : sizes[1].price,
      priceOfSizeL: sizes[0].sizeName === "L" ? sizes[0].price : sizes[1].price
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onChangeFiles = e => {
    let files = this.state.files ? this.state.files : [];
    for (const key in e.target.files) {
      if (e.target.files.hasOwnProperty(key)) {
        files.push(e.target.files[key])
      }
    }
    this.setState({ ...this.state, files })
  }

  uploadImages = async () => {
    const { files } = this.state;
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file)
      formData.append('filenames', file.name)
    });
    formData.append('folder', PRODUCT_IMAGE_FOLDER);
    return await callApi('media/uploads', 'POST', formData);
  }

  onSave = async (e) => {
    e.preventDefault()
    let imageUrl = this.props.product.image;
    if (this.state.files.length > 0) {
      imageUrl = await this.uploadImages();
    }
    const { id, name, categoryId, priceOfSizeM, priceOfSizeL } = this.state;
    const data = {
      id,
      name: name,
      image: imageUrl,
      categoryId,
      productSizes: [
        {
          sizeId: SIZE_M_ID,
          price: priceOfSizeM
        },
        {
          sizeId: SIZE_L_ID,
          price: priceOfSizeL
        }
      ]
    };
    await this.props.onUpdateProduct(data);
  }

  render() {
    const { categories } = this.props.data;
    const { name, image, priceOfSizeM, priceOfSizeL, categoryId } = this.state;
    return (
      <ModalBody>
        <Form onSubmit={this.onSave}>
          <FormGroup>
            <Label>Product Name</Label>
            <Input type="text" name="name" defaultValue={name} onChange={this.onChange} required ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Category Name</Label>
            <select name="categoryId" className='form-control' defaultValue={categoryId} onChange={this.onChange} required>
              {categories.map((data, i) => {
                return <option key={i} value={data.id}>{data.name}</option>
              })}
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Price</Label>
            <Row>
              <Col xs="6">
                <Input type="number" name="priceOfSizeM" placeholder="Size M" defaultValue={priceOfSizeM} onChange={this.onChange} required />
              </Col>
              <Col xs="6">
                <Input type="number" name="priceOfSizeL" placeholder="Size L" defaultValue={priceOfSizeL} onChange={this.onChange} required />
              </Col>
            </Row>
          </FormGroup>
          <Row>
            <Col xs="6">
              <Label>Upload New Image</Label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Image</span>
                </div>
                <div className="custom-file">
                  <Input
                    type="file"
                    className="custom-file-input"
                    id="image"
                    onChange={this.onChangeFiles}
                    multiple="multiple"
                    accept="image/*"
                  />
                  <Label
                    className="custom-file-label"
                    for="inputGroupFile01"
                  >
                    Choose
                    </Label>
                </div>
              </div>
            </Col>
            <Col xs="6">
              <img src={image} width='100px' alt="demo" />
            </Col>
          </Row>
          <hr></hr>
          <Button color="success" style={{float: 'right'}}>Save</Button>
        </Form>
      </ModalBody>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => {
      dispatch({ type: FETCH_CATEGORIES })
    },
    onUpdateProduct: (product) => {
      dispatch({ type: UPDATE_PRODUCT, product })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);

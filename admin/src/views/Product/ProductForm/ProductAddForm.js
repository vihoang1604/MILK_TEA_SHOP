import React, { Component } from "react";
import { connect } from "react-redux";
import { ADD_PRODUCT } from "../../../constants/product.actiontypes";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";
import "./ProductAddForm.css";
import { FETCH_CATEGORIES } from "../../../constants/category.actiontypes";
import callApi from "../../../utils/apiCaller";
import {SIZE_M_ID, SIZE_L_ID } from '../../../constants/sizeId';

class ProductAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      categoryId: "",
      imageUrl: '',
      priceOfSizeM: "",
      priceOfSizeL: "",
      folder: 'ProductImage',
      files: [],
      products: [],
      categories: [],
      collapse: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){
    this.props.fetchCategories();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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
    const { files, folder } = this.state;
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file)
      formData.append('filenames', file.name)
    });
    formData.append('folder', folder);
    return await callApi('media/uploads', 'POST', formData)
  }

  onSave = async (e) => {
    e.preventDefault()
    var imageUrl = await this.uploadImages();
    const { productName, categoryId, priceOfSizeM, priceOfSizeL } = this.state;
    const data = {
      name: productName,
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
    await this.props.onAddProduct(data);
    this.toggle();
  }

  toggle() {
    this.setState(state => ({
      collapse: !state.collapse
    }));
  }


  render() {
    const { productName, categoryId, priceOfSizeM, priceOfSizeL } = this.state;
    const { categories } = this.props.data;
    return (
      <div>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          <i className="fas fa-plus-circle" /> Add New Product
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <Form onSubmit={this.onSave}>
                <Row>
                  <Col xs="8">
                    <Row>
                      <Col xs="6">
                        <FormGroup>
                          <Label for="productName">Product Name</Label>
                          <Input
                            type="text"
                            name="productName"
                            defaultValue={productName}
                            onChange={this.onChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="6">
                        <FormGroup>
                          <Label for="category">Category</Label>
                          <select name="categoryId" className="form-control" defaultValue={categoryId} onChange={this.onChange} required>
                            <option>Choose Category</option>
                            {categories.map((category, index) => {
                              return <option key={index} value={category.id} >{category.name}</option>
                            })}
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <FormGroup>
                          <Label for="description">Price of Medium Size</Label>
                          <Input
                            type="number"
                            name="priceOfSizeM"
                            defaultValue={priceOfSizeM}
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="6">
                        <FormGroup>
                        <Label for="description">Price of Large Size</Label>
                          <Input
                            type="number"
                            name="priceOfSizeL"
                            defaultValue={priceOfSizeL}
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="4">
                    <Row>
                      <Col xs="12">
                        <Label for="exampleFile">Image</Label>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">Upload</span>
                          </div>
                          <div className="custom-file">
                            <Input
                              type="file"
                              className="custom-file-input"
                              id="image"
                              onChange={this.onChangeFiles}
                              multiple="multiple"
                              accept="image/*"
                              required
                            />
                            <Label
                              className="custom-file-label"
                              for="inputGroupFile01"
                            >
                              Choose file
                            </Label>
                          </div>
                        </div>
                      </Col>
                      <Col xs="12" className="mt-20 float-right">
                        <Button type="submit" color="success mr-10">
                          <i className="fas fa-check-circle" /> Add
                        </Button>
                        <Button color="danger" onClick={this.toggle}>
                          <i className="fa fa-ban" /> Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Collapse>
      </div>
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
    onAddProduct: product => {
      dispatch({ type: ADD_PRODUCT, product });
    },
    fetchCategories: () => {
      dispatch({type: FETCH_CATEGORIES});
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductAddForm);

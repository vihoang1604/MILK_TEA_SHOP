import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductAddForm from '../ProductForm/ProductAddForm'
import { FETCH_PRODUCTS, SEARCH_PRODUCT } from '../../../constants/product.actiontypes';
import ProductItem from './ProductItem/ProductItem';
import { Spinner } from 'reactstrap';
import { Empty } from 'antd';
import './ProductItem/ProductItem';
import './css/ProductList.css';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Form
} from "reactstrap";

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state={
      searchKey:''
    }
  }
  componentDidMount() {
    this.props.fetchProducts();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSearch = (e) => {
      e.preventDefault();
      const { searchKey } = this.state;
      var product = searchKey;
      this.props.onSearchProduct(product);
  }

  render() {
    const { fetched, error, message, products } = this.props.data;
    const { searchKey } = this.state;
    return (
      <>
        <ProductAddForm />
        <div className="panel panel-default">
          <div className="panel-heading" style={{height: '55px'}}>
            <span>
              <Form onSubmit={this.onSearch}>
                <InputGroup style={{width: '50%', float: 'right'}} >
                  <Input type="text" name="searchKey" onChange={this.onChange} defaultValue={searchKey} placeholder="Search ..." />
                  <InputGroupAddon addonType="append">
                    <InputGroupText><i className="fas fa-search"></i></InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
              <h3 className="panel-title" style={{paddingTop: '5px'}}>Product List</h3>
            </span>
          </div>
          <div className="panel-body">
            {error ?
              <div>An error occur: {message}</div> : (fetched ?
                  <table className="table table-bordered">
                    <thead>
                        <tr height="50" className="tb-title">
                          <th className="pd-20" rowSpan="2">#</th>
                          <th className="pd-20" rowSpan="2">Name</th>
                          <th className="pd-20" rowSpan="2">Category</th>
                          <th className="pd-20" rowSpan="2">Image</th>
                          <th className="pd-5" colSpan="2">Price</th>
                          <th className="pd-20" rowSpan="2">Actions</th>
                        </tr>
                        <tr>
                          <th width="150">Medium Size</th>
                          <th width="150">Large Size</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                      {(products.length > 0 ? products.map((product, index) => (
                        product.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 ||
                        product.category.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1
                        ? <ProductItem key={index} index={index + 1} product={product}/> : null
                      )) :
                        <tr>
                          <td colSpan="7" className="text-center">
                            <Empty/>
                          </td>
                        </tr>
                      )}
                    </tbody>
                </table> : <div className="text-center"> <Spinner color="primary" /></div>
            )}
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch({ type: FETCH_PRODUCTS })
    },
    onSearchProduct: (product) => {
      dispatch({ type: SEARCH_PRODUCT, product })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

import React, { Component } from 'react';
import './ProductItem.css';
import { connect } from 'react-redux';
import * as Types from '../../../../constants/product.actiontypes';
import { confirmDelete } from '../../../../utils/confirmer';
import {
  Button,
  Modal,
  ModalHeader,
} from 'reactstrap';
import callApi from '../../../../utils/apiCaller';
import EditForm from './EditForm/EditForm';
import { NumberFormat } from '../../../../utils/formater';
// import { Empty } from 'antd';

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      category: '',
      image:'',
      sizes:[],
      modal: false,
      itemEdit: ''
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    let { id, name, category, image, sizes } = this.props.product;
    this.setState({
      id,
      name,
      category,
      image,
      sizes
    });
  }

  onDelete = (id) => {
    confirmDelete().then((result) => {
      if (result.value) {
        this.props.onDeleteProduct(id)
      }
    })
  }

  onEdit = async (id) => {
    const product = await callApi(`products/${id}`, 'GET', null);
    this.setState({
      modal: !this.state.modal,
      product: product
    });
  }

  render() {
    const { id, name, category, sizes, image, product } = this.state;
    return (
      <tr>
        <td>{this.props.index}</td>
        <td>{name}</td>
        <td>{category.name}</td>
        <td className="text-center"><img src={image} alt={name} /></td>
        {
          sizes.map((data, i) => {
            return <td key={i}>{NumberFormat(data.price)}</td>
          })
        }
        <td className="text-center">
          <span>
            <Button color="warning" className="mr-10" onClick={() => this.onEdit(id)}><i className="fa fa-pencil"></i></Button>
            <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} style={{ width: "100%", display: "block" }}>
              <ModalHeader toggle={this.toggle}>
                Edit Form
                </ModalHeader>
              <EditForm
                product={product}
              />
            </Modal>
            <Button color="danger" onClick={() => this.onDelete(id)}><i className="fa fa-trash-o"></i></Button> &nbsp;
            </span>
        </td>
      </tr>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteProduct: (id) => {
      dispatch({ type: Types.DELETE_PRODUCT, id })
    }
  }
}

export default connect(null, mapDispatchToProps)(ProductItem);

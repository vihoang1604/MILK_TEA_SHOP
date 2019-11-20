import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryAddForm from '../CategoryForm/CategoryAddForm'
import { FETCH_CATEGORIES, SEARCH_CATEGORY } from '../../../constants/category.actiontypes';
import CategoryItem from './CategoryItem/CategoryItem';
import { Spinner } from 'reactstrap';
import { Empty } from 'antd';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Form
} from "reactstrap";

class CategoryList extends Component {
  constructor(props) {
    super(props)
    this.state={
      searchKey:''
    }
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSearch = (e) => {
      e.preventDefault();
      const { searchKey } = this.state;
      var category = searchKey;
      this.props.onSearchCategory(category);
  }

  render() {
    const { fetched, error, message, categories } = this.props.data;
    const { searchKey } = this.state;

    return (
      <>
        <CategoryAddForm />
        <div className="panel panel-default">
          <div className="panel-heading" style={{height: '55px'}}>
              <Form onSubmit={this.onSearch}>
                <InputGroup style={{width: '50%', float: 'right'}} >
                  <Input type="text" name="searchKey" onChange={this.onChange} defaultValue={searchKey} placeholder="Search ..." />
                  <InputGroupAddon addonType="append">
                    <InputGroupText><i className="fas fa-search"></i></InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
              <h3 className="panel-title" style={{paddingTop: '5px'}}>Category List</h3>
          </div>
          <div className="panel-body">
            {error ?
              <div>An error occur: {message}</div> : (fetched ?
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                      {(categories.length > 0 ? categories.map((category, index) => (
                        category.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1 ? <CategoryItem key={index} index={index + 1} category={category} /> : null
                      )) :
                        <tr>
                          <td colSpan="6" className="text-center">
                            <Empty/>
                          </td>
                        </tr>
                      )}
                    </tbody>
                </table> : <div className="text-center"><Spinner color="primary" /></div>
            )}
          </div>
        </div>
      </>
    )
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
    onSearchCategory: (category) => {
      dispatch({ type: SEARCH_CATEGORY, category })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);

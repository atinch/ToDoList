import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {

    state = {
    modal: false,
    name: '',
    description: '',
    invalid: false
  }; 

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if(this.state.description !== '') {
      
      const newItem = {
        name: this.state.name,
        description: this.state.description
      };

      // Add item via addItem action
      this.props.addItem(newItem);
      this.setState({
        name:'',
        description:'',
        invalid: false})
      // Close modal
      this.toggle();
    } else this.setState({invalid: true})
  };

  render() {
    return (
      <div className='search-area'> 
        {this.props.isAuthenticated ? (
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <h4 className='mb-3 ml-4'>Please log in to manage items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To ToDo List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Title</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Title of the ToDo'
                  onChange={this.onChange}
                />
                <Label for='description'>Description</Label>
                <Input
                  type='text'
                  name='description'
                  id='description'
                  placeholder='Description of the ToDo'
                  onChange={this.onChange}
                  invalid = {this.state.invalid} 
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);

import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, updateItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import { RSA_PKCS1_OAEP_PADDING } from 'constants';

import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class ToDoList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool,
    loadItems: PropTypes.bool
  };

  state = {
    modal: false,
    updateName: '',
    updateId: ''
  }
  static getDerivedStateFromProps(props, state) {
    if(props.loadItems) props.getItems()
    return state
  }

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  onUpdateClick = (id, name) => {
    this.setState({
      updateName : name,
      updateId : id,
      modal: !this.state.modal
    });
    //this.props.deleteItem(id);
  };

  onChange = (e) => {
    this.setState({updateName : e.target.value})
  }
  onSubmit = e => {
    e.preventDefault();

    const updateItem = {
      id: this.state.updateId,
      name: this.state.updateName
    };

    // Add item via addItem action
    this.props.updateItem(updateItem);

    // Close modal
    this.toggle();
  };

  toggle = () => { 
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { items } = this.props;
    if(!items) return null
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className='ToDo-list'>
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <div>
                    <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                     <Button
                     className='update-btn'
                     color='info'
                     size='sm'
                     onClick={this.onUpdateClick.bind(this, _id, name)}
                   >
                     Edit
                   </Button>
                   </div>
                  ) : null}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Update ToDo Item</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Update ToDo item'
                  onChange={this.onChange.bind(this)}
                  defaultValue={this.state.updateName}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Update Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.todoItems.items,
  isAuthenticated: state.auth.isAuthenticated,
  loadItems: state.todoItems.loadItems
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, updateItem }
)(ToDoList);

import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import { RSA_PKCS1_OAEP_PADDING } from 'constants';

class ToDoList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool,
    loadItems: PropTypes.bool
  };

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
                     onClick={this.onDeleteClick.bind(this, _id)}
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
  { getItems, deleteItem }
)(ToDoList);

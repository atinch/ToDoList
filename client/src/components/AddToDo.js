import React, { Component } from 'react';
import  Button from 'reactstrap';
//import PropTypes from 'prop-types';

class AddToDo extends Component {
 
  state = {
    modal: false,
    name: ''
  }
/*   static propTypes = {
    isAuthenticated: PropTypes.bool
  }; */

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.props.AddToDo}
          >
            Add Item
          </Button>
      </div>
    )
  }
}

export default AddToDo

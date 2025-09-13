import React, { Component, createRef } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {connect } from 'react-redux';
import {addItem, getItems, deleteItem}from '../actions/itemAction';
import PropTypes from 'prop-types';



class ShoppingList extends Component {
  static propTypes = {
   getItems: PropTypes.func.isRequired,
   item: PropTypes.object.isRequired,
   isAuthenticated: PropTypes.bool.isRequired
  };
  
  componentDidMount(){
    this.props.getItems();
  }
  onDeleteClick=(id)=>{
    console.log('Deleting item with ID:', id);
    if (!id) {
      console.error('Invalid item ID');
      return;
    }
    this.props.deleteItem(id);
  }
  render() {
    const { items } = this.props.item;
    console.log('Items:', items); // Check what items contains
    
    return (
      <Container>
        {/* Add Item Button */}
        

        {/* Items List */}
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {Array.isArray(items) && items.map(({ _id, name }) => {
              const nodeRef = createRef(); // ✅ Fix findDOMNode issue
              return (
                <CSSTransition
                  key={_id}
                  timeout={500}
                  classNames="fade"
                  nodeRef={nodeRef}
                >
                  <ListGroupItem ref={nodeRef} className="d-flex justify-content-between align-items-center">
                    {name}
                    {this.props.isAuthenticated ? (
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >
                        &times;
                      </Button>
                    ):null}
                  </ListGroupItem>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}
  
const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem, addItem })(ShoppingList);

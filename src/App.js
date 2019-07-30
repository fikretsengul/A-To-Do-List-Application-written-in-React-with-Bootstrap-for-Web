import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Header from './components/Header';
import Item from './components/Item';
import './App.css';
import { connect } from "react-redux";
import { getTodos } from './actions/actionCreator'
import { bindActionCreators } from "redux";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "./actions/actionsTypes";

class App extends React.Component {

  componentWillMount = () => {
    this.props.getTodos()
  }

  render() {
    return (
      <Container className="app">
        <Row className="row">
            <Col>
            <h1>my to-do list</h1>
            </Col>
        </Row>

        <Header />

        {!this.props.others.loaded 
          ? (
            <Alert className="list-alert" variant="warning">
              Your to-do list is loading from firebase, please wait...
            </Alert>
          ) : (
            this.props.todos.length !== 0 ? (
              this.props.todos.map(todo => (
                <Item key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} />
              ))
          ) : (
            <Alert className="list-alert" variant="danger">
              Your to-do list is empty or filter results show no results.
            </Alert>
          )
        )}
        
      </Container>
  );
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => {
  return { todos: getVisibleTodos(state.todos, state.visibilityFilter),
    others: state.others
 };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getTodos
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

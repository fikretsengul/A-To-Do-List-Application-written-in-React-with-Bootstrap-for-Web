import React from 'react';
import { Row, Col, InputGroup, Button, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import '../App.css';
import { connect } from 'react-redux'
import { addTodo, setVisibilityFilter } from '../actions/actionCreator'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../actions/actionsTypes";
import { bindActionCreators } from "redux";
import uuid from 'uuid'

class Header extends React.Component {

  constructor(props){
    super(props)

      this.state = {
        id: null,
        text: ''
      }

      this.handleUpdateInput = this.handleUpdateInput.bind(this)
    }

    handleUpdateInput = (e) => {
      this.setState({
        id: uuid.v4(),
        text: e.target.value
      })
    }

    render() {
        return(
          <Row>
            <Col>
              <InputGroup className="list-header">
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant="outline-success"
                  title="Filter"
                  id="input-group-dropdown-1"
                  >
                  <Dropdown.Item
                    onClick={() => this.props.setVisibilityFilter(SHOW_ALL)}>
                      Show All
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => this.props.setVisibilityFilter(SHOW_COMPLETED)}>
                      Show Completeds
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => this.props.setVisibilityFilter(SHOW_ACTIVE)}>
                      Show Actives
                  </Dropdown.Item>
                </DropdownButton>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Today I need to </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  onChange={this.handleUpdateInput}
                  value={this.state.text}
                />
                <InputGroup.Append>
                <Button
                  onClick={() => {this.setState({ text: ''});
                  this.props.addTodo(this.state.id, this.state.text);}}
                  className="group" variant="success">
                    Add
                </Button>
              </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
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
    visibilityFilter: state.visibilityFilter
 };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addTodo,
      setVisibilityFilter
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
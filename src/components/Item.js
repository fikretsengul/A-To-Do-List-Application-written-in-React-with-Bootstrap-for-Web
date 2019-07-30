import React from 'react';
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import '../App.css';
import { connect } from "react-redux";
import { removeTodo, toggleTodo, updateTodo } from "../actions/actionCreator";
import { bindActionCreators } from "redux";

class Item extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            key: this.props.id,
            text: this.props.text,
            completed: this.props.completed,
            editing: false,
            test: ''
          }

          this.form = React.createRef()
          this.handleChangeStatus = this.handleChangeStatus.bind(this)
          this.handleUpdateInput = this.handleUpdateInput.bind(this)
          this.handleSetCompleted = this.handleSetCompleted.bind(this)
    }

    handleChangeStatus = () => {
      if (this.state.editing) {
        this.setState({editing: false})
        this.props.updateTodo(this.state.key, this.state.text)
      } else {
        this.setState({editing: true})
      }
    };

    handleUpdateInput = (e) => {
        this.setState({
          text: e.target.value
        })
    }

    handleSetCompleted = () => {
        this.setState({completed: !this.state.completed})
        this.props.toggleTodo(this.state.key, this.state.completed)
    }

    render() {
      console.log(this.form.current)
        return (
            <Row>
              <Col>
              <InputGroup className="list-items">
                <InputGroup.Prepend>
                  <InputGroup.Checkbox
                    checked={this.state.completed}
                    onChange={this.handleSetCompleted}
                  />
                </InputGroup.Prepend>
                  <FormControl
                      onChange={this.handleUpdateInput}
                      disabled={!this.state.editing}
                      value={this.state.text}
                      style={{ 
                        backgroundColor: this.state.editing ? '#FFF' : '#E9ECEF',
                        textDecoration: this.state.completed ? 'line-through' : 'none' }}
                  />
                  <InputGroup.Append>
                  <Button 
                    variant="primary"
                    onClick={this.handleChangeStatus}>{this.state.editing ? "Save" : "Edit"}
                  </Button>
                  </InputGroup.Append>
                  <InputGroup.Append>
                  <Button
                    onClick={() => this.props.removeTodo(this.state.key)}
                    variant="danger">
                      Remove
                  </Button>
                  </InputGroup.Append>
              </InputGroup>
              </Col>
            </Row>
        );
    }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      removeTodo,
      toggleTodo,
      updateTodo
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Item);
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import uuidv1 from "uuid";
import { addProyect, updateProyect } from "../actions/index";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const mapDispatchToProps = dispatch => {
  return {
    addProyect: article => dispatch(addProyect(article)),
    updateProyect: article => dispatch(updateProyect(article))
  };
};

class ConnectedFormProyect extends Component {
  constructor() {
    super();
    const idx = uuidv1();
    this.state = {
      title: "sin titulo",
      content: "sin contenido",
      id: idx,
      created: null,
      type: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }*/
  handleChange(id, event) {
    console.log(event);
    const field = event.target.id;
    const value = event.target.value;
    console.log("lll + " + field + value + id);
    //   this.props.updateArticle({ field, value, id });
    this.setState({ [event.target.id]: event.target.value });
  }

  handleChangeType = (event, index, value) => {
    this.setState({ type: value});
   }

  handleSubmit(event) {
    event.preventDefault();
    const created = Date.now();
    const { title, content, type } = this.state;
    const id = uuidv1();
    this.props.addProyect({ title, content, id, created, type });
    this.setState({ title: title, content: content, id: id, created: created, type: type});
  }

  render() {
    const { title, content, id, type } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
        <h2>Add a new proyect </h2> {type}
          <label htmlFor="title">Title</label>

          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            //  onChange={this.handleChange}
            onChange={(e) => this.handleChange(id, e)}
          />
          <label htmlFor="content">Content</label>
          <textarea
            type="textarea"
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => this.handleChange(id, e)}
          />
          <SelectField
            id="type"
            floatingLabelText="Proyect type"
            value={type}
            onChange={this.handleChangeType}
          >
            <MenuItem value={1} primaryText="Movie - Screenplay" />
            <MenuItem value={2} primaryText="Comic" />
            <MenuItem value={4} primaryText="Literature" />
            <MenuItem value={5} primaryText="Uncategorized" />
          </SelectField>
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}

const ProyectForm = connect(null, mapDispatchToProps)(ConnectedFormProyect);

ConnectedFormProyect.propTypes = {
  addProyect: PropTypes.func.isRequired
};

export default ProyectForm;

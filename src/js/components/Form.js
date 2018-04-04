import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addArticle, updateArticle, saveTag } from "../actions/index";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import TagsInput from './TagsInput';
import SketchPad from './SketchPad';
import Dialog from 'material-ui/Dialog';

const sketchModalStyle = {
  width: '100%',
  maxWidth: 'none',
  height: '90%'
};

const mapStateToProps = state => {
  return { proyects: state.proyects, articles: state.articles, tags: state.tags };
};
const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => dispatch(addArticle(article)),
    updateArticle: article => dispatch(updateArticle(article))
  };
};

class ConnectedForm extends Component {
  constructor() {
    super();
    // const idx = uuidv1(); 
    //get this object from either store, or prop when new form. 
    this.state = {
      title: "sin titulo",
      content: "sin contenido",
      id: '',
      created: null,
      type: 1,
      proyectid: 1,
      tags: [],
      sketch: [],
      saveorupdate: "save"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentDidMount() {
    this.setState({ id: this.props.idx });
    const formdata = this.props.fillData;
    this.setState(formdata);
  }

  /*handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }*/
  handleChange(id, event) {
    console.log(event);
    const field = event.target.id;
    const value = event.target.value;

    //do stuff in case it's the tag field 
    console.log("lll => " + field + " Value " + value + " ID " + id);
    this.setState({ [event.target.id]: event.target.value });
  }
  handleChangeTags = (value) => {
    console.log("Tags = " + value);
    this.setState({ tags: value }, () => {
      console.log('state updated');
      console.log(this.state.tags);
    });
  }
  handlAddSketch = (data) => {
    console.log("Data = " + data);
    this.setState({ sketch: data }, () => {
      console.log('sketch updated');
      console.log(this.state.sketch);
    });
  }
  handleChangeType = (event, index, value) => {
    this.setState({ type: value });
  }
  handleChangeProyect = (event, index, value) => {
    this.setState({ proyectid: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const created = Date.now();
    const { title, content, id, type, proyectid, tags, sketch } = this.state;

    if (this.state.saveorupdate === "save") {
      this.props.addArticle({ title, content, id, created, type, proyectid, tags, sketch });
      this.setState({ saveorupdate: "update" });
    }
    else {
      this.props.updateArticle({ title, content, id, created, type, proyectid, tags, sketch });
    }

    this.setState({ title: title, content: content, id: id, created: created, type: type, tags: tags, sketch: sketch });
  }

  render() {
    const proyects = this.props.proyects;
    const { title, content, id, type, tags } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">

          <h2>Add a new article</h2>
          <TextField
            id="title"
            floatingLabelText="Title"
            value={title}
            onChange={(e) => this.handleChange(id, e)}
            margin="normal"
          />

          <TextField
            id="content"
            floatingLabelText="Add Content"
            value={content}
            onChange={(e) => this.handleChange(id, e)}
            margin="normal"
          />
          <SelectField
            id="type"
            floatingLabelText="Note type"
            value={type}
            onChange={this.handleChangeType}
          >
            <MenuItem value={1} primaryText="Character" />
            <MenuItem value={2} primaryText="Action" />
            <MenuItem value={3} primaryText="Location" />
            <MenuItem value={4} primaryText="Dialogue" />
            <MenuItem value={5} primaryText="Shot / Composition" />
            <MenuItem value={6} primaryText="Plot / Structure" />
            <MenuItem value={7} primaryText="Concept / Idea" />
            <MenuItem value={8} primaryText="General  / Undefined" />
          </SelectField>
          <h4>Proyectos</h4>



          <SelectField
            id="type"
            floatingLabelText={"Proyect"}
            value={this.state.proyectid}
            onChange={this.handleChangeProyect}
          >
            {proyects.slice(0).reverse().map(el => (
              <MenuItem key={el.id} value={el.id} primaryText={el.title} />
            ))}
          </SelectField>
          <hr />
          <TagsInput id="title" sendData={this.handleChangeTags} />
        </div>
        <hr />
        <SketchPad sendData={this.handlAddSketch} />
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}

const Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);

ConnectedForm.propTypes = {
  fillData: PropTypes.object,
  idx: PropTypes.string,
  addArticle: PropTypes.func.isRequired,
  updateArticle: PropTypes.func.isRequired,
  // saveTag: PropTypes.func.isRequired,
  // deleteTag: PropTypes.func.isRequired
};

export default Form;

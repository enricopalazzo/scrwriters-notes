import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import { deleteArticle, updateArticle } from "../actions/index";
import TextField from 'material-ui/TextField';
import Sugar from 'sugar';


const mapStateToProps = state => {
  return { articles: state.articles, proyects: state.proyects };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteArticle: article => dispatch(deleteArticle(article)),
    updateArticle: article => dispatch(updateArticle(article)), 
  };
};
class ConnectedListItem extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      id: ''
    };
     this.deleteItem = this.deleteItem.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }
  componentWillMount() {
    this.setState({ title: this.props.data.title, content: this.props.data.content, id: this.props.data.id });
  }
  componentDidUpdate(){
    alert("adas");
  }
  deleteItem(thisid) {
    console.log(this.props.articles);
    //...state.messages.filter(m => m.id === action.id)
    let algo = this.props.articles.filter((item) => item.id !== thisid);
    this.props.deleteArticle(thisid);
    //this.setState({ [event.target.id]: event.target.value });
  }
  //handleChange(id, event) {
  // console.log(event.target.id +  " " + event.target.value);
  //event.preventDefault();
  /*const field = event.target.id;
  const value = event.target.value;*/
  //  console.log(field + " - " + value + id);
  //this.props.updateArticle({ field, value, id });
  //}
  handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    const field = event.target.name;
    /*     console.log("pipi " + this.state.id);
      */

    this.setState({ [field]: value });
    this.props.updateArticle(this.state);
  };
  openDialog = (noteid) => {
    const data = this.props.data;
    const formobject = { formtype: 'note', id: noteid, data: data };
    console.log(formobject);
    this.props.openDialog(formobject);
  }
  render() {
    const articles = this.props.articles;
    const proyects = this.props.proyects;
    const itemData = this.props.data;
    //get proyect name (find a better way)
    const azucar = Sugar.Array.filter(this.props.proyects, function (val) {
      console.log("xxx " + val.id + " asdsa " + itemData.proyectid);
      return val.id == itemData.proyectid;
    });
    const proyectname = azucar[0].title;

    return (
      <li className="list-group-item" key={itemData.id} >
        <div>

          <TextField
            name="title"
            id={itemData.id}
            defaultValue={itemData.title}
            onChange={this.handleChange}
          />
          {itemData.id} |  {itemData.content} | {proyectname}</div>
        <img src={itemData.sketch} alt="Red dot" />
        <div>
          <IconButton tooltip={itemData.id} onClick={() => this.openDialog(itemData.id)}>
            <ActionHome />
          </IconButton>
          <IconButton tooltip={itemData.id} onClick={(e) => this.deleteItem(itemData.id)}>
            <ActionHome />
          </IconButton></div>
      </li>

    );
  }
}

const ListItem = connect(mapStateToProps, mapDispatchToProps)(ConnectedListItem);

ConnectedListItem.propTypes = {
  openDialog: PropTypes.func, //ugly, let's make this part of redux store
  deleteArticle: PropTypes.func,
  updateArticle: PropTypes.func,
  articles: PropTypes.array.isRequired
};

export default ListItem;



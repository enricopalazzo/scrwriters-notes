import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import { deleteArticle, updateArticle } from "../actions/index";
import ListItem from './ListItem';

const mapStateToProps = state => {
  return { articles: state.articles, currentproyect: state.currentproyect };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteArticle: article => dispatch(deleteArticle(article)),
    updateArticle: article => dispatch(updateArticle(article)),
  };
};
class ConnectedList extends Component {
  constructor() {
    super();
    this.deleteItem = this.deleteItem.bind(this);
  }
  deleteItem(thisid) {
    console.log(this.props.articles);
    //...state.messages.filter(m => m.id === action.id)
    let algo = this.props.articles.filter((item) => item.id !== thisid);
    console.log(algo);
    this.props.deleteArticle(thisid);
    //this.setState({ [event.target.id]: event.target.value });
  }
  handleChange(id, event) {
    const field = event.target.id;
    const value = event.target.value;
    console.log(field + " - " + value + id);
    //this.props.updateArticle({ field, value, id });
  }
  render() {
    const articles = this.props.articles;
    const currentproyect = this.props.currentproyect;
    let notes;
    let lista;
    if (currentproyect === 0) {
      lista = articles;
    }
    else {
      lista = articles.filter(function (obj) {
        if (obj.proyectid === currentproyect) {
          return true;
        }
        return false;
      });

    }

    notes = lista;

    return (
      <ul className="list-group list-group-flush">
        {notes.slice(0).reverse().map(el => (
          <ListItem data={el} key={el.id} openDialog={this.props.openDialog} />
        ))}
      </ul>
    );
  }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

ConnectedList.propTypes = {
  openDialog: PropTypes.func, //ugly, let's make this part of redux store
  deleteArticle: PropTypes.func,
  updateArticle: PropTypes.func,
  articles: PropTypes.array.isRequired,

};

export default List;



import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MenuItem from 'material-ui/MenuItem';



class ConnectedListItemProyect extends Component {
  constructor() {
    super();  
  }
  
  /*goToStore(event) {
    console.log('You Changed the URL ' + event);
  }
  deleteItem(thisid) {
    console.log(this.props.articles);
    let algo = this.props.articles.filter((item) => item.id !== thisid);
    console.log(algo);
    this.props.deleteArticle(thisid);
  }
    handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    const field = event.target.name;
 
    this.setState({ [field]: value });
    this.props.updateArticle(this.state);
    };*/
  render() {
    const itemData = this.props.data;
    return (
      <MenuItem value={itemData.id} primaryText={itemData.title} />

    );
  }
}

const ListItemProyects = connect(null, null)(ConnectedListItemProyect);

ConnectedListItemProyect.propTypes = {
  deleteArticle: PropTypes.func,
  updateArticle: PropTypes.func,
};

export default ListItemProyects;



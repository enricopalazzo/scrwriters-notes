import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MenuItem from 'material-ui/MenuItem';
import { changeProyect, changeTab } from "../actions/index";


const mapStateToProps = state => {
  return { proyects: state.proyects, articles: state.articles, currenttab:state.currenttab };
};
const mapDispatchToProps = dispatch => {
  return {
    changeProyect: currenproyect => dispatch(changeProyect(currenproyect)),
    changeTab: currenttab => dispatch(changeTab(currenttab))
  };
};
class ConnectedNavMenu extends Component {
  constructor() {
    super();
  }

  handleOpen = (id) => {
    this.props.changeProyect(id);
    this.props.changeTab(2);
  };

  handleClose = (id) => {
    alert(id);
  };

  render() {
    const proyects = this.props.proyects;
    var proyectlist;
    if (proyects) {
      proyectlist = proyects;
    } else {
      proyectlist = "nada";
    }
    return (
      <div>
        <h3>Proyects: </h3>
        <MenuItem key={"0"} value={"0"} primaryText={"Untitled"} onClick={() => this.handleOpen('0')} />
        {proyects.slice(0).reverse().map(el => (
          <MenuItem key={el.id} value={el.id} primaryText={el.title} onClick={() => this.handleOpen(el.id)} />
        ))}
      </div>
    );
  }
}
const NavMenu = connect(mapStateToProps, mapDispatchToProps)(ConnectedNavMenu);
ConnectedNavMenu.propTypes = {
  changeProyect: PropTypes.func,
 // currenttab: PropTypes.object,
  changeTab: PropTypes.func
};


export default NavMenu;



import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
/*TABS */
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import List from "./List";
import ProyectForm from "./ProyectForm";

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};
const mapStateToProps = state => {
  return { proyects: state.proyects, articles: state.article, currenttab:state.currenttab };
};

class ConnectedTabs extends Component {
  constructor() {
    super();
    this.state = {
      slideIndex: 0,
      selectedIndex: 0
    };
  }
  componentWillMount() {
    this.setState({
      slideIndex: this.props.currenttab,
      selectedIndex: this.props.currenttab
    });
  }
  
  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
  
  select = (index) => this.setState({ selectedIndex: index });
  render() {

    return (
      <div>
      {this.props.currenttab}
      {this.state.slideIndex}
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Notas" value={0} />
          <Tab label="Add Proyect" value={1} />
          <Tab label="Tab Three" value={2} />
        </Tabs>
        <SwipeableViews

          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            aQUÍ VA OTRA COSA
            </div>
          <div style={styles.slide}>

            {<ProyectForm />}
          </div>
          <div style={styles.slide}>
            <h2>Articles</h2>
            <List />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
const TabsContent = connect(mapStateToProps, null)(ConnectedTabs);


export default TabsContent;



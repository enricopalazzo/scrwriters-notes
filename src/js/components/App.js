import React, { Component } from "react";
import Form from "./Form";
import ProyectForm from "./ProyectForm";
import NavMenu from "./NavMenu";
import List from "./List";
import uuidv1 from "uuid";
//import TabsContent from "./TabsContent";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

/*floating button*/
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


/* BOTTOM NAV */
/*import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;*/



/* MODAL FOR FORMS */
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FullscreenDialog from 'material-ui-fullscreen-dialog'

const styles = {
  floatbutton: {
    bottom: 20,
    right: 20,
    position: 'fixed'
  }
};

const mapStateToProps = state => {
  return { proyects: state.proyects, articles: state.articles };
};
const customContentStyle = {
  width: '100%',
  height: '100%',
  maxWidth: 'none',
};


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      currentModal: 'note',
      openadd: false,
      opendrawer: false,
      idx: 0, 
      formData:{}
    };
  }

  handleOpen = (formobject) => {
    let noteid = '';
     if (!formobject.id) {
      noteid = uuidv1();
    }
    else {
      noteid = formobject.id;
      formobject.data["saveorupdate"] = "update";
    }
    this.setState({ formData: formobject.data });
    this.setState({ idx: noteid });
    this.setState({ currentModal: formobject.formtype });
    this.setState({ open: true });
    this.setState({
      openadd: false,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpenAdd = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      openadd: true,
      anchorEl: event.currentTarget,
    });
  };
  handleToggleDrawer = () => {
    this.setState({ opendrawer: !this.state.opendrawer });
  }
  handleCloseDrawer = () => this.setState({ open: false });


  handleRequestClose = () => {
    this.setState({
      openadd: false,
    });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Discard"
        primary={true}
        onClick={this.handleClose}
      />,
    ];
    /* Constant objects get passed to handleOpen of  dialog to select which form to load  */
    const noteform = { formtype: 'note', data:{title:'no title'} };
    const proyectform = { formtype: 'proyect' };
    var modalForm;
    if (this.state.currentModal === 'note') {
      modalForm = <Form idx={this.state.idx} fillData={this.state.formData}/>;
    } else {
      modalForm = <ProyectForm />;
    }
    return (
      <MuiThemeProvider>

        <div className="full-page">
          <Drawer
            docked={false}
            width={200}
            open={this.state.opendrawer}
            onRequestChange={(opendrawer) => this.setState({ opendrawer })}
          >
            <NavMenu />
          </Drawer>
          <AppBar
            title="Writers Notes"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonClick={this.handleToggleDrawer}
          />
          <FullscreenDialog
            open={this.state.open}
            onRequestClose={() => this.setState({ open: false })}
            title={'Demo dialog'}
            actionButton={<FlatButton
              label='Done'
              onClick={() => this.setState({ open: false })}
            />}
          >

            {modalForm}
          </FullscreenDialog>
          {/*<Dialog
            title="Dialog With Date Picker"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            contentStyle={customContentStyle}
            autoScrollBodyContent={true}
          >
            <h2>Add a new articless</h2>
            <Form />
          </Dialog>*/}
          <div className="full-page">
            <List openDialog={this.handleOpen} />
            {/*<TabsContent />*/}

            <FloatingActionButton style={styles.floatbutton} onClick={this.handleOpenAdd}>
              <ContentAdd />
            </FloatingActionButton>
            <Popover

              open={this.state.openadd}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.handleRequestClose}
            >
              <Menu>
                <MenuItem primaryText="Add Note" onClick={() => this.handleOpen(noteform)} />
                <MenuItem primaryText="Add Proyect" onClick={() => this.handleOpen(proyectform)} />
              </Menu>
            </Popover>
            {/*<Paper zDepth={1}>
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="Add Note"
                icon={recentsIcon}
                onClick={() => this.handleOpen('note')}
              />
              <BottomNavigationItem
                label="Add Proyect"
                icon={favoritesIcon}
                onClick={() => this.handleOpen('proyect')}
              />
              <BottomNavigationItem
                label="Search?"
                icon={nearbyIcon}
                onClick={() => this.select(2)}
              />
            </BottomNavigation>
          </Paper>*/}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { WithContext as ReactTags } from 'react-tag-input';
import { saveTag, deleteTag } from "../actions/index";
import uuidv1 from "uuid";

const mapStateToProps = state => {
  return { tags: state.tags };
};
const mapDispatchToProps = dispatch => {
  return {
    saveTag: tags => dispatch(saveTag(tags)),
    deleteTag: tags => dispatch(deleteTag(tags)),
  };
};

class ConnectedTags extends React.Component {
    constructor(props) {
        super(props);
 
        this.state = { // TODO 
                       // GET TAGS WHERE FROM STORE A PARTIR DE NOTE ID 
                        // get all tags para suggestions
                        // fuck local state
            tags: this.props.tags,
            suggestions: ['USA', 'Germany', 'Austria', 'Costa Rica', 'Sri Lanka', 'Thailand']
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }
 
    handleDelete(i) {
        alert("borando");
        // only delete tag from local state. Do not delete from STORE 
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: this.state.tags});
        this.props.deleteTag(i);
      
 
        let result = this.state.tags.map(a => a.id);
        console.log("resultadoxx = " + result);
        this.props.sendData(result);
    }
 
    handleAddition(tag) { 
        // add to TAG state only if tag doesn't exist
        // then add ID of tag to NOTE STATE tag array.
        let tags = this.state.tags;
        const idx = uuidv1();
        tags.push({
            id: idx,
            text: tag
        });
        this.setState({tags: tags});
        this.props.saveTag({id:idx, text:tag});
        let result = this.state.tags.map(a => a.id);
        this.props.sendData(result);
    }
 
    handleDrag(tag, currPos, newPos) { //fuck this drag shit
        let tags = this.state.tags;
 
        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: tags });
    }
 
    render() {
        const { tags, suggestions } = this.state;
        const { tagis } = this.props
        return (
            <div>
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag} />
            </div>
        )
    }
};
 
const TagsInput = connect(mapStateToProps, mapDispatchToProps)(ConnectedTags);

ConnectedTags.propTypes = {
  saveTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired, 
  sendData:  PropTypes.func.isRequired
};

export default TagsInput;

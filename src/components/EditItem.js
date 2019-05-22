import React, { Component } from 'react';

class EditItem extends Component {
    constructor(props) {
        super(props);
    
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    
      componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
    

      setWrapperRef(node) {
        this.wrapperRef = node;
      }
    

      handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.cancelEdit(this.props.index);
        }
      }

	render() {
		return (
            <div className="editItemRow row" ref={this.setWrapperRef}>
                <div className="col-sm-6"></div>
                <div className="editItem col-sm-6">
                    <form className="editForm form-control" ref={(input) => {this.editForm = input}} onSubmit={(e) => {this.props.updateItem(this.props.index, e, this.editItem)}}>
                            <div className="input-group">
                                <div>
                                    <input className="editInput form-control" ref={(input) => {this.editItem = input}} type="text" placeholder="text" id="editTodoInput"></input>
                                </div>
                                <div>
                                    <button className="cancelButton btn btn-outline-success" onClick={ () => this.props.cancelEdit(this.props.index) } >Cancel</button>
                                    <button className="submitEditButton btn btn-outline-success" type="submit">Submit</button>
                                </div>
                            </div>     
                    </form>
                </div>
            </div>
		);
	}
}

export default EditItem;
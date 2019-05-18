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
            <div ref={this.setWrapperRef}>
            <form ref={(input) => {this.editForm = input}} onSubmit={(e) => {this.props.updateItem(this.props.index, e, this.editItem)}}>
                    <button onClick={ () => this.props.cancelEdit(this.props.index) } >cancel</button>
                    <label htmlFor="editTodoInput">Edit Item</label>
                    <div>
                        <div>
                            <input ref={(input) => {this.editItem = input}} type="text" placeholder="text" id="editTodoInput"></input>
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </div>     
            </form>
            </div>
		);
	}
}

export default EditItem;
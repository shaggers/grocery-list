import React, {Component} from 'react';
import EditItem from './EditItem.js';
import { isObjectTypeIndexer } from '@babel/types';

class ItemList extends Component {
    constructor(props){
        super(props)

        this.state = {
            todos: []
        }
        this._onEditClick = this._onEditClick.bind(this);
        this.todosRef = this.props.firebase.database().ref('todos');
    }

    componentDidMount() {
        this.todosRef.orderByChild('sentAt').on('child_added', snapshot => {
            const item = snapshot.val();
            item.key = snapshot.key;
            item.showEdit = false;
            this.setState({ todos : this.state.todos.concat(item) });
        });
    }

    getTime(time){
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const displayTime = hours + ':' + minutes;
        return displayTime;
    }

    checkUserName(name) {
        if(name == ''){return 'guest'}
        else {return name};
    }

    addItem(e){
        e.preventDefault();

        const newItem = this.newItem.value;
        if (newItem === '') {return};
        if (this.props.currentRoom === '') {return};
        this.todosRef.push({
            isCompleted: false,
            description: newItem,
            roomId: this.props.currentRoomKey,
            sentAt: Date(this.props.firebase.database.ServerValue.TIMESTAMP),
            username: this.checkUserName(this.props.user)
          });

        this.addForm.reset();
    }

    toggleComplete(index) {
        const todos = this.state.todos.slice();
        const todo = todos[index];
        const todoKey = todo.key;
        const complete = todo.isCompleted = todo.isCompleted ? false : true;
        let updates = {};
        updates['/' + todoKey + '/isCompleted'] = complete;
        this.todosRef.update(updates);
        this.setState({ todos: todos });
    }

    deleteItem(index){
        const todos = this.state.todos.slice();
        const todo = todos[index];
        const todoKey = todo.key;
        const path = this.todosRef.child('/' + todoKey);
        path.remove();
        todos.splice(index, 1);
        this.setState({todos: todos})
    }

    _onEditClick(index) {
        const todos = this.state.todos.slice();
        const todo = todos[index];
        todo.showEdit = true;
        this.setState({
          todos: todos
        });
    }

    updateItem(index, e, editItem){
        e.preventDefault();
        const todos = this.state.todos.slice();
        const todo = todos[index];
        const todoKey = todo.key;
        const editedItem = editItem.value;
        if (editedItem === '') {return};
        todo.description = editedItem
        todo.showEdit = false;
        let updates = {};
        updates['/' + todoKey + '/description'] = editedItem;
        this.todosRef.update(updates);
        this.setState({ todos: todos });
    }

    cancelEdit(index){
        const todos = this.state.todos.slice();
        const todo = todos[index];
        todo.showEdit = false;
        this.setState({
          todos: todos
        });
    }

    render(){
        return(
            <span>

            { 
                this.props.currentRoom == '' &&
                <h2 className="todoTitle">Select List</h2> 
            }
            { 
                this.props.currentRoom != '' &&
                <h2 className="todoTitle">{this.props.currentRoom}</h2>
            }



            <div className="">
                <ul className="todos list-group">
                    { this.state.todos.map( (todo, index) => 
                        this.props.currentRoomKey == todo.roomId &&
                        <li className="list-group-item">
                            <div className="row">
                                <div className="todoDescription col-sm-8 col-12">
                                    <b className="">{ todo.description }</b>
                                    <input className="isPurchased" type="checkbox" checked={ todo.isCompleted } onChange={ () => this.toggleComplete(index) }/>
                                </div>
                                <div className="editDelete col-sm-4 col-12">  
                                    <button className="editButton btn btn-outline-success" onClick={ () => this._onEditClick(index) }> edit </button>
                                    <button className="deleteButton btn btn-outline-success" onClick={ () => this.deleteItem(index)} > delete </button>  
                                </div>
                            </div> 

                                {this.state.todos[index].showEdit ?
                                    <EditItem 
                                        updateItem = {this.updateItem.bind(this)}
                                        cancelEdit = {this.cancelEdit.bind(this)}
                                        index = {index}              
                                        /> 
                                    :                                
                                        null
                                }

                            <div className="row">
                                <div className="todoUsername col-6">                 
                                    <p className="">{todo.username}</p>
                                </div>
                                <div className="todoDate col-6">
                                    <p className=""><small>{todo.sentAt}</small></p>
                                </div>
                            </div>
                        </li>

                    )}
                </ul>
            </div>

            { this.props.currentRoom !== '' && 
                <form className="newTodo form-control border border-success" ref={(input) => {this.addForm = input}} onSubmit={(e) => {this.addItem(e)}}>   
                    <div className="form-row">
                        <div className="col-10">
                            <input className="form-control" ref={(input) => {this.newItem = input}} type="text" placeholder="text" id="newTodoInput"></input>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-block" type="submit">Add</button>
                        </div>
                    </div>     
                </form>
            }            

            </span>
           
        )
    }
}

export default ItemList;
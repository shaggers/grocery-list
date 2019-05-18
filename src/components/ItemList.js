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
                <h2>Select Conversation</h2> 
            }
            { 
                this.props.currentRoom != '' &&
                <h2>{this.props.currentRoom}</h2>
            }



            <div className="ItemList">
                <ul>
                    { this.state.todos.map( (todo, index) => 
                        this.props.currentRoomKey == todo.roomId &&
                        <li>
                            <input type="checkbox" checked={ todo.isCompleted } onChange={ () => this.toggleComplete(index) }/>  
                            <button onClick={ () => this.deleteItem(index)} > delete </button>  
                            <button onClick={ () => this._onEditClick(index) }> edit </button>   
                            {this.state.todos[index].showEdit ?
                                <EditItem 
                                updateItem = {this.updateItem.bind(this)}
                                cancelEdit = {this.cancelEdit.bind(this)}
                                index = {index}              
                                /> 
                            :
                                null
                            }                 
                            <p className="text-left float-left"><b>{todo.username}</b></p>
                            <p className="text-right"><small>{todo.sentAt}</small></p>
                            <span>{ todo.description }</span>
                        </li>
                        //<ToDo key={ index } description={ todo.description } isCompleted={ todo.isCompleted } />
                    )}
                </ul>
            </div>

            { this.props.currentRoom !== '' && 
                <form ref={(input) => {this.addForm = input}} onSubmit={(e) => {this.addItem(e)}}>
                        <label htmlFor="newTodoInput">New Item</label>
                    <div>
                        <div>
                            <input ref={(input) => {this.newItem = input}} type="text" placeholder="text" id="newTodoInput"></input>
                        </div>
                        <div>
                            <button type="submit">Send</button>
                        </div>
                    </div>     
                </form>
            }            

            </span>

            /*
            <span>
                { 
                    this.props.currentRoom == '' &&
                    <h2 className="border border-secondary">Select Conversation</h2> 
                }
                { 
                    this.props.currentRoom != '' &&
                    <h2 className="border border-secondary">{this.props.currentRoom}</h2>
                }
                        
                <ul className="list-group">
                    {
                        this.state.messages.map((message, index) => 
                                this.props.currentRoomKey == message.roomId && 
                                <li className="list-group-item bg-dark">
                                    <p className="text-left float-left"><b>{message.username}</b></p>
                                    <p className="text-right"><small>{message.sentAt}</small></p>
                                    <p className="text-left">{message.content}</p>  
                                </li>
                        )
                    }
                </ul>

                { this.props.currentRoom !== '' && 
                <form ref={(input) => {this.addForm = input}} className="form-control fixed-bottom bg-dark border-secondary w-100 mx-auto" onSubmit={(e) => {this.addItem(e)}}>
                        <label htmlFor="newMessageInput" className="text-secondary">New Message</label>
                    <div className="form-row">
                        <div className="col-10">
                            <input ref={(input) => {this.newItem = input}} type="text" placeholder="text" id="newMessageInput" className="form-control"></input>
                        </div>
                        <div className="col-2">
                            <button type="submit" className="btn btn-outline-info btn-block">Send</button>
                        </div>
                    </div>     
                </form>
                }
            </span>
            */
           
        )
    }
}

export default ItemList;
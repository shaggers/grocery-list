import React from 'react';

class RoomList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rooms: []
        }
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }


    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });
    }

    addItem(e) {
        e.preventDefault();

        const newRoom = this.newItem.value;
        if (newRoom === '') {return};
        this.roomsRef.push({
            name: newRoom
          });

        this.addForm.reset();
    }

    handleClick(item) {
        this.props.callbackFromParent(item);
    }

    render() {
        return (
            <span>

                <form className="roomForm" ref={(input) => {this.addForm = input}} onSubmit={(e) => {this.addItem(e)}}>
                    <div className="form-row">
                        <div className="col-lg-8 col-7">
                            <input className="addRoom form-control" ref={(input) => {this.newItem = input}} type="text" placeholder="text" id="newItemInput"></input>
                        </div>
                        <div className="col-lg-4 col-5">    
                            <button className="form-control btn btn-outline-success" type="submit">Add</button>             
                        </div>
                    </div>
                </form>

                <ul className="list-group list-group-flush">
                {
                    this.state.rooms.map((room, index) =>
                        <li className="roomItem list-group-item" key={index} onClick={() => this.handleClick(room)}> {room.name} </li>
                    )
                }
                </ul>
            </span>
        )
    }

} 

export default RoomList;
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

    render() {
        return (
            <span>
                <section className="roomList">
                    List of rooms will go here.
                </section>

                <hr/>

                <form ref={(input) => {this.addForm = input}} onSubmit={(e) => {this.addItem(e)}}>
                        <label htmlFor="newItemInput">Add New Room</label>
                    <div>
                        <div>
                            <input ref={(input) => {this.newItem = input}} type="text" placeholder="text" id="newItemInput"></input>
                        </div>
                        <div>
                            <button type="submit">Add</button>
                        </div>
                    </div>              
                </form>

                <hr/>

                <ul>
                {
                    this.state.rooms.map((room, index) =>
                        <li className="room" key={index}> {room.name} </li>
                    )
                }
                </ul>
            </span>
        )
    }

} 

export default RoomList;
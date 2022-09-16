import React from 'react';
import { createChat } from '../lib/api';
import { useNavigate } from 'react-router-dom';

function CreateChatRoom() {
  const navigate = useNavigate();

  const [usersArray, setUsersArray] = React.useState({
    users: []
  });

  const [chatroom, setChatroom] = React.useState({
    name: '',
    image: ''
  });

  function handleChange(event) {
    setChatroom({
      ...chatroom,
      [event.target.name]: event.target.value
    });
  }

  function handleChangeForArray(event) {
    setUsersArray({
      ...usersArray,
      [event.target.name]: Array.from(event.target.value)
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const chatroomObject = { ...chatroom, ...usersArray };

    const getData = async () => {
      try {
        const data = await createChat(chatroomObject);
        const navigateToChat = data.data.chatroomId.id;
        navigate(`/chatrooms/${navigateToChat}/`);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form
            className="column is-half is-offset-one-quarter box"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  value={chatroom.name}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Image</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Image URL"
                  name="image"
                  onChange={handleChange}
                  value={chatroom.image}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Other Users</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Joe Bloggs, Steve Bloggs"
                  name="users"
                  onChange={handleChangeForArray}
                  value={chatroom.users}
                />
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-success is-fullwidth">
                Create Chat!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateChatRoom;

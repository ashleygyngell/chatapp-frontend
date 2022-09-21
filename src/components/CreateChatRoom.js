import React from 'react';
import { createChat, getAllUsers } from '../lib/api';
import { useNavigate } from 'react-router-dom';

function CreateChatRoom() {
  const navigate = useNavigate();

  const [usersArray, setUsersArray] = React.useState({
    users: []
  });

  const [chatroom, setChatroom] = React.useState({
    name: ''
  });

  const [allUsers, setAllUsers] = React.useState('');

  function handleChange(event) {
    setChatroom({
      ...chatroom,
      [event.target.name]: event.target.value
    });
  }

  function handleChangeForDropdown(event) {
    setUsersArray({
      ...usersArray,
      users: Array.from(event.target.value)
    });
    console.log(usersArray);
  }

  function handleChangeForArray(event) {
    setUsersArray({
      ...usersArray,
      [event.target.name]: Array.from(event.target.value)
    });
    console.log(usersArray);
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

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllUsers();
        setAllUsers(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [chatroom]);

  return (
    <section className="section pt-1">
      <div className="container has-text-centered">
        <span className="not-homepage-text ">New Chat</span>

        <div className="columns mt-4">
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
              <label className="label">
                Other Users
                <div className="control">
                  <div className="select is-multiple is-fullwidth">
                    <select multiple size="4">
                      {!allUsers ? (
                        <p>Loading chat...</p>
                      ) : (
                        allUsers.data.map((user) => {
                          {
                            return (
                              <option
                                name="users"
                                onClick={handleChangeForDropdown}
                                value={user.id}
                              >
                                {user.username}
                              </option>
                            );
                          }
                        })
                      )}
                    </select>
                  </div>
                </div>
              </label>
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

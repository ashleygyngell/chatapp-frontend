import React from 'react';
import { createChat, getAllUsers, getUserCredentials } from '../lib/api';
import { useNavigate } from 'react-router-dom';

function CreateChatRoom() {
  const navigate = useNavigate();

  const [usersArray, setUsersArray] = React.useState([]);

  const [others, setOthers] = React.useState([]);

  const [chatroom, setChatroom] = React.useState({
    name: ''
  });

  const [userCredentials, setUserCredentials] = React.useState([]);

  const [allUsers, setAllUsers] = React.useState('');

  function handleChange(event) {
    setChatroom({
      ...chatroom,
      [event.target.name]: event.target.value
    });
  }

  function handleChangeForDropdown(event) {
    event.preventDefault();
    if (usersArray.includes(event.target.value)) {
      event.target.style.background = 'none';
      event.target.style.color = 'black';
      const arrayIndex = usersArray.indexOf(event.target.value);
      if (arrayIndex > -1) {
        usersArray.splice(arrayIndex, 1);
      }
    } else {
      event.target.style.background = 'mediumseagreen';
      event.target.style.color = 'white';
      setUsersArray([...usersArray, event.target.value]);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newArray = { users: usersArray.concat(userCredentials) };
    console.log('newArray', newArray);
    const chatroomObject = {
      ...chatroom,
      ...newArray
    };
    const getData = async () => {
      try {
        const data = await createChat(chatroomObject);
        const navigateToChat = data.data.chatroomId.id;
        console.log('chatroomData', data.data);
        navigate(`/mychats/${navigateToChat}/`);
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
        const data2 = await getUserCredentials();
        setAllUsers(data.data);
        setUserCredentials([data2.data.id.toString()]);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

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
              <label className="label ">Other Users</label>

              <div className="control">
                <div className="select is-multiple is-fullwidth">
                  <p id="select" multiple size="4">
                    {!allUsers ? (
                      <p>Loading chat...</p>
                    ) : (
                      allUsers.data.map((user) => {
                        {
                          return (
                            <option
                              className="list-item"
                              id={`list-item-${user.id}`}
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
                  </p>
                </div>
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

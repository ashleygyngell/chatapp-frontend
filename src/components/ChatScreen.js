import React from 'react';
import { useParams } from 'react-router-dom';

import { getChatroom } from '../lib/api';
import { getChat } from '../lib/api';
import { sendMessage } from '../lib/api';

import { getLoggedInUserToken } from '../lib/auth.js';

document.addEventListener('keyup', function (event) {
  if (event.code === 'Enter') {
    console.log('Enter is pressed!');
  }
});

const ChatScreen = () => {
  const chatId = useParams().id;
  const [chat, setChat] = React.useState(null);
  const [chatData, setChatData] = React.useState(null);
  const [message, setMessage] = React.useState({
    message: '',
    ChatroomID: `${chatId}`,
    senderId: `${getLoggedInUserToken}`
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    sendMessage(chatId, message);
  };

  function handleChange(event) {
    setMessage({ ...message, [event.target.name]: event.target.value });
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const someResult = getChatroom(chatId);
        const anotherResult = getChat(chatId);
        const finalResult = [await someResult, await anotherResult];
        setChat(finalResult[0].data);
        setChatData(finalResult[1].data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [chatId]);

  return (
    <section className="section">
      <div className="container">
        {!chat ? (
          <p>Loading chat...</p>
        ) : (
          <>
            <div className="chat-image">
              <figure>
                <img src={chat.image} alt={chat.image} />
              </figure>
            </div>
            <div>
              <h2 className="title has-text-centered">{chat.name}</h2>{' '}
              <h2 className="subtitle has-text-centered">{chat.users}</h2>
              <hr />
              <div>
                <p>Chat:</p>{' '}
                {!chatData ? (
                  <p>Loading chat...</p>
                ) : (
                  <section className="columns">
                    <div className="column is-6">
                      {chatData.data.map((data) => (
                        <>
                          <p key={data.chat_id}>
                            {data.creation_time} {data.message}
                          </p>
                          <br />
                        </>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </>
        )}
        <form
          className="box column is-half is-offset-one-quarter"
          onSubmit={handleSubmit}
        >
          <div className="field">
            <label className="label">Message:</label>
            <div className="control">
              <input
                className="input"
                name="message"
                onChange={handleChange}
                value={message.message}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" id="submit">
                Send
              </button>
            </div>
            <div className="control">
              <button type="submit" className="button is-danger is-light">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChatScreen;

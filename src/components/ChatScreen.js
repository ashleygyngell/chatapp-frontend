import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { getChatroom } from '../lib/api';
import { getChat } from '../lib/api';
import { sendMessage } from '../lib/api';

import { getLoggedInUserToken } from '../lib/auth.js';

const messageField = document.getElementById('message');

document.addEventListener('keyup', function (event) {
  if (event.code === 'Enter') {
    console.log('Message Sent with Enter');
  }
});

const ChatScreen = () => {
  const navigate = useNavigate();
  const chatId = useParams().id;
  const userId = getLoggedInUserToken();
  const [chat, setChat] = React.useState(null);
  const [chatData, setChatData] = React.useState(null);

  const [message, setMessage] = React.useState({
    message: '',
    ChatRoomID: `${chatId}`,
    sender_id: `${userId}`
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendMessage(chatId, message);
    try {
      const someResult = getChatroom(chatId);
      const anotherResult = getChat(chatId);
      const finalResult = [await someResult, await anotherResult];
      setChat(finalResult[0].data);
      setChatData(finalResult[1].data);
    } catch (err) {
      console.error(err);
    }
    messageField.value = '';
  };

  function handleChange(event) {
    setMessage({ ...message, [event.target.name]: event.target.value });
  }

  function handleClear() {
    messageField.value = '';
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
  }, []);

  return (
    <section className="section pt-4">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button pb-2 ">
          <span className="subtitle">
            <i className="fa-solid fa-arrow-left "></i> <strong>Back</strong>
          </span>
        </button>
        {!chat ? (
          <p>Loading chat...</p>
        ) : (
          <>
            <div>
              <p className="title is-2 has-text-centered">{chat.name}</p>{' '}
              <div className="subtitle has-text-centered chat-info">
                {chat.users.map((data) => (
                  <>
                    <div className=" chat-rooms pr-5 pl-5 pt-6 ">
                      <img
                        key={data.image}
                        src={`${data.image}`}
                        alt={data.image}
                      />
                      <div className="pr-2 pl-2 pt-4 pb-0" key={data.username}>
                        {data.username}
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <hr />
              <div>
                {!chatData ? (
                  <p>Loading chat...</p>
                ) : (
                  <>
                    <section className="columns">
                      <div className="column">
                        {chatData.data.map((data) => {
                          if (data.sender_id.id === userId) {
                            // console.log(data.creation_time.split('T')[0]);
                            return (
                              <>
                                <div>
                                  <div
                                    className="sent-message"
                                    key={data.chat_id}
                                  >
                                    <p>{data.message}</p>
                                    <span className="message-data">
                                      {data.creation_time
                                        .split('T')[1]
                                        .split('.')[0]
                                        .slice(0, 5)}
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <div
                                  className="recieved-message"
                                  key={data.chat_id}
                                >
                                  <div className=" ">
                                    <p className="message-data-username">
                                      {data.sender_id.username}
                                    </p>
                                    <p>{data.message}</p>
                                  </div>
                                  <span className="message-data">
                                    {data.creation_time
                                      .split('T')[1]
                                      .split('.')[0]
                                      .slice(0, 5)}
                                  </span>
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                    </section>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        <form
          id="compose-message-box"
          className="box column is-half is-offset-one-quarter"
          onSubmit={handleSubmit}
        >
          <div className="message compose-message-box">
            <label className="label">Compose Message:</label>
            <div id="message-box" className="control">
              <input
                id="message"
                className="input is-success"
                name="message"
                onChange={handleChange}
                value={message.message}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-link"
                id="submit"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
            <div className="">
              <button
                className="button is-danger is-light"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChatScreen;

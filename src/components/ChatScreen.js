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
    console.log('Enter is pressed!');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    sendMessage(chatId, message);
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
        // setInitialDate(finalResult[1].data.data[0].creation_time.split('T')[0]);
        // console.log(
        //   finalResult[1].data.data.filter((i) =>
        //     `${userId}`.includes(i.sender_id)
        //   )
        // );
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [chatId]);

  // React.useEffect(() => {
  //   const getChatEverySecond = async () => {
  //     try {

  //     }
  //   }
  // }

  return (
    <section className="section">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button ">
          <span>
            <i className="fa-solid fa-arrow-left "></i> Back
          </span>
        </button>
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
              <p className="title has-text-centered">{chat.name}</p>{' '}
              <p className="subtitle has-text-centered">{chat.users}</p>
              <hr />
              <div>
                {!chatData ? (
                  <p>Loading chat...</p>
                ) : (
                  <>
                    <section className="columns">
                      <div className="column">
                        {chatData.data.map((data) => {
                          if (data.sender_id === userId) {
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
                            //   <br />{' '}
                            // </>;
                          } else {
                            console.log('recieved');
                            return (
                              <>
                                {/* <div className="sender-id">
                                  {data.sender_id}
                                </div> */}
                                <div
                                  className="recieved-message"
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
                              </>
                            );
                            // <>
                            //   {' '}
                            //   <p
                            //     className="recieved-message"
                            //     key={data.chat_id}
                            //   >
                            //     {data.creation_time} {data.message}
                            //   </p>{' '}
                            //   <br />
                            // </>;
                          }
                        })}
                      </div>
                      {/* <div className="column is-6">
                        {chatData.data.map((data) => (
                          <>
                            <p key={data.chat_id}>
                              {data.creation_time} {data.message}
                            </p>
                            <br />
                          </>
                        ))}
                      </div> */}
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
            <div className="control">
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

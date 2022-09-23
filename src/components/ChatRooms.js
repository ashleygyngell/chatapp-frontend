import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { getAllChatrooms, getUserCredentials } from '../lib/api';

const ChatRooms = () => {
  const chatId = useParams().id;
  console.log(chatId);
  const [chatData, setChatData] = React.useState(null);

  const [userCredentials, setUserCredentials] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const [firstResponse, secondResponse] = await Promise.all([
          getUserCredentials(),
          getAllChatrooms(chatId)
        ]);
        setUserCredentials(firstResponse.data);
        setChatData(secondResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [chatId]);

  return (
    <section className="section">
      <div className="container">
        <p className="title has-text-centered">My Chats</p>{' '}
        {!chatData ? (
          <p>Loading chat...</p>
        ) : (
          <>
            {chatData.data == 0 ? (
              <>
                <div className="has-text-centered">
                  <p className="title is-3 pt-5">
                    No chats ... Start a new chat
                  </p>
                  <Link to="/newchat">
                    <button className=" button has-text-success">
                      New Chat
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="chatrooms-container">
                {console.log(chatData.data)}
                {chatData.data.map((data) => (
                  <>
                    <hr />
                    <div className="columns chat-rooms has-text-centered ">
                      <Link key={data.id} className="column " to={`${data.id}`}>
                        <div className="column chatroom-image p-0 "></div>
                        <div className="chat-room-info">
                          <p className="title is-3 pb-2 " key={data.name}>
                            {' '}
                            {data.name}
                          </p>

                          <div className="subtitle is-5 chatrooms-members">
                            {data.users.map((data) => {
                              if (data.username !== userCredentials.username) {
                                return (
                                  <>
                                    <div className=" chat-rooms pr-5 pl-5 pt-5  ">
                                      <img
                                        key={data.image}
                                        src={`${data.image}`}
                                        alt={data.image}
                                      />
                                      <div
                                        className="pr-2 pl-2 pt-4 pb-0 "
                                        key={data.username}
                                      >
                                        {data.username}
                                      </div>
                                    </div>
                                  </>
                                );
                              }
                            })}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ChatRooms;

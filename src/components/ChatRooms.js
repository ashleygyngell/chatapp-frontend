import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { getAllChatrooms } from '../lib/api';

const ChatRooms = () => {
  const chatId = useParams().id;
  const [chatData, setChatData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllChatrooms(chatId);
        setChatData(res.data);
        console.log(res.data);
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
            {/* <div className="chat-image">
              <figure>
                <img src={chat.image} alt={chat.image} />
              </figure>
            </div> */}
            <div>
              {/* <h2 className="title has-text-centered">{chat.name}</h2>{' '}
              <h2 className="subtitle has-text-centered">{chat.users}</h2> */}
              <hr />
              <div>
                <p>Chats:</p>{' '}
                {!chatData ? (
                  <p>Loading chat...</p>
                ) : (
                  <div
                    className="column is-2
                  "
                  >
                    {chatData.data.map(
                      (data) => (
                        console.log(data),
                        (
                          <>
                            <div className="chat-rooms">
                              <Link to={`${data.id}`}>
                                <p key={data.name}> {data.name}</p>
                                <p>{data.users}</p>
                                <img src={`${data.image}`} alt="" />
                              </Link>
                            </div>
                          </>
                        )
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ChatRooms;

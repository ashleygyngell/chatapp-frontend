import React from 'react';
import { useParams } from 'react-router-dom';

import { getChatroom } from '../lib/api';
import { getChat } from '../lib/api';

const ChatScreen = () => {
  const chatId = useParams().id;
  const [chat, setChat] = React.useState(null);
  const [chatData, setChatData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const someResult = getChatroom(chatId);
        const anotherResult = getChat(chatId);
        const finalResult = [await someResult, await anotherResult];
        setChat(finalResult[0].data);
        setChatData(finalResult[1].data);
        console.log(chatData);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [chatId]);
  6;
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
              <div className="columns">
                <div className="column is-half">
                  <p>Chat: {}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ChatScreen;

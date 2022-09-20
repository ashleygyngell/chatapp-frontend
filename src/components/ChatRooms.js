import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import image1 from '../assets/images/logo-part-1.png';
import image2 from '../assets/images/logo-part-2.png';

import { getAllChatrooms, getUserById } from '../lib/api';

const ChatRooms = () => {
  const chatId = useParams().id;
  const [chatData, setChatData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllChatrooms(chatId);
        setChatData(data.data);
        console.log(await (await getUserById(2)).data.data[0].username);
        // const testing = data.users.forEach((e) => getUserById(e));
        // console.log(testing.data.data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [chatId]);

  return (
    <section className="section pt-1">
      <div className="container has-text-centered">
        <span className="not-homepage-text">My Chats</span>

        {!chatData ? (
          <p>Loading chats...</p>
        ) : (
          <>
            {!chatData ? (
              <p>No Chats ... Create a Chat</p>
            ) : (
              <div className="chatrooms-container">
                {chatData.data.map((data) => (
                  <>
                    <hr />
                    <div className="columns chat-rooms has-text-centered ">
                      <Link className="column " to={`${data.id}`}>
                        <div className="column chatroom-image pb-5 ">
                          <img src={`${data.image}`} alt="" />
                        </div>
                        <div className="chat-room-info">
                          <p className="title is-3 pb-2" key={data.name}>
                            {' '}
                            {data.name}
                          </p>

                          <p className="subtitle is-5">
                            {/* {data.users.join(', ')} */}

                            {(data = data.users.forEach((e) => getUserById(e)))}

                            {/* {console.log(
                              data.users.forEach((e) => getUserById(e)).data
                                .data[0].username
                            )} */}
                          </p>
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

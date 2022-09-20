import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { getUserCredentials } from '../lib/api';

const Profile = () => {
  const chatId = useParams().id;
  const [userCredentials, setUserCredentials] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await getUserCredentials();
        setUserCredentials(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [chatId]);

  return (
    <section className="section has-text-centered pt-1">
      <span className="not-homepage-text ">My Profile</span>
      <div className="credentials-container has-text-centered mt-5 ">
        {!userCredentials ? (
          <p>Loading Profile Data...</p>
        ) : (
          <>
            {!userCredentials ? (
              <p>No user found...</p>
            ) : (
              <div className="">
                <img
                  className="credentials-image"
                  src={`${userCredentials.image}`}
                  alt=""
                />
                <hr />
                <p className="title">Username: {userCredentials.username}</p>
                <p className="title">Email: {userCredentials.email}</p>
                <p>
                  <strong>Member since:</strong>{' '}
                  {userCredentials.date_joined.split('T')[0]}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Profile;

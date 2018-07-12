import React from 'react';
import EmailAddress from './EmailAddress';

const Contact = () => {
  const team = [
    {
      id: 'anthony',
      name: 'Anthony Catalfo',
      email: 'anthonycatalfo@yahoo.com',
      picture: 'https://ca.slack-edge.com/T4JUEB3ME-U8CBJCJ7K-d19907ad71bb-72',
    },
    {
      id: 'peter',
      name: 'Peter Grey',
      email: 'peter@petergraycreative.com',
      picture: 'https://ca.slack-edge.com/T4JUEB3ME-U7P5N0KEC-5c660ff183b4-48',
    },
    {
      id: 'richard',
      name: 'Richard Reis',
      email: 'richardreis@yahoo.com',
      picture: 'https://ca.slack-edge.com/T4JUEB3ME-U7J9CUMU2-2749fb51b912-48',
    },
    {
      id: 'igor',
      name: 'Igor Yermak',
      email: 'igoryermak@yahoo.com',
      picture: 'https://ca.slack-edge.com/T4JUEB3ME-U6PLJKDC1-9f8ccee199de-48',
    },
  ];
  return (
    <div className="developer d-flex flex-row justify-content-center">
      {team.map(member => (
        <div className="" key={member.id}>
          <h1>{member.name}</h1>
          <img
            alt={member.name}
            width={100}
            height={100}
            src={member.picture}
          />
          <EmailAddress email={member.email} />
        </div>
      ))}
    </div>
  );
};

export default Contact;

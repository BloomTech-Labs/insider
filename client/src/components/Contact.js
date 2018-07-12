import React from 'react';
import EmailAddress from './EmailAddress';

const Contact = () => {
  const team = [
    {
      id: 'anthony',
      name: 'Anthony Catalfo',
      email: 'anthonycatalfo@yahoo.com',
      github: '',
      linkedin: '',
      picture: 'anthony-catalfo.png',
    },
    {
      id: 'peter',
      name: 'Peter Grey',
      email: 'peter@petergraycreative.com',
      github: 'https://github.com/PeterGrayCreative',
      linkedin: 'https://www.linkedin.com/in/petergraycreative/',
      picture: 'peter-gray.jpg',
    },
    {
      id: 'richard',
      name: 'Richard Reis',
      email: 'richardreis@yahoo.com',
      github: '',
      linkedin: '',
      picture: 'richard-reis.jpg',
    },
    {
      id: 'igor',
      name: 'Igor Yermak',
      email: 'igoryermak@yahoo.com',
      github: '',
      linkedin: 'https://www.linkedin.com/in/igoryermak/',
      picture: 'igor-yermak.jpg',
    },
  ];
  return (
    <div className="row d-flex flex-row dev-block">
      {team.map((member) => {
        const {
          id,
          name,
          email,
          github,
          linkedin,
          picture,
        } = member;

        return (
          <div className="developer col-6 col-lg-3" key={id}>
            <img alt={name} src={`/images/${picture}`} />
            <h3>{name}</h3>
            <a href={github}>Github</a>
            <a href={linkedin}>LinkedIn</a>
            <EmailAddress email={email} linkText={{ text: 'Email' }} />
          </div>
        );
      })}
    </div>
  );
};

export default Contact;

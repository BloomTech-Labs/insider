import axios from 'axios';

const apiURI = 'http://localhost:5050/api/';

export const getMessages = () => {
  const messages = 'recent_messages';
  axios
    .get(apiURI + messages)
    .then(({ data }) => {
      return data.messages;
    })
    .catch(err => console.error(err));
};

export const sendSMS = (formData) => {
  const send = 'send';
  axios
    .post(apiURI + send, formData)
    .then((res) => {
      return res;
    })
    .catch(error => console.error(error));
};

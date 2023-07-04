import axios from 'axios'
import 'dotenv/config'
import SMSService from '../service/SMSService'

export const sendSMS = (recipients, message) => {
const username = process.env.INTOUCH_USERNAME
const password = process.env.INTOUCH_PASSWORD;

const url = 'https://www.intouchsms.co.rw/api/sendsms/.json'

const data = new FormData();
  data.append('recipients', `${recipients}`); // 0722601591
  data.append('message', `${message}`);
  data.append('sender', `${process.env.INTOUCH_SENDER_NAME}`);

axios.post(url, data, {
  auth: {
    username: username,
    password: password
  },
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
  .then(response => {
    const { messageid, receipient, message } = response?.data?.details[0]
    const { time, totalmessages } = response?.data?.summary

    SMSService.createSMS({
      messageid,
      receipient,
      message,
      time,
      totalmessages,
      status: response.status
    })
  })
  .catch(error => {
    console.error(error);
  });
}

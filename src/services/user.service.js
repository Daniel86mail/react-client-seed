import axios from 'axios';
const SERVER_BASE_URL = '//localhost:8081/'
export const getUsersNames = () => axios.get(`${SERVER_BASE_URL}api/user/list`)
  .then((response) => response.data
  , (error) => {
    console.log(error);
    throw error;
  });
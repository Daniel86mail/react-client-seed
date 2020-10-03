import axios from 'axios';
export const getUsersNames = () => axios.get('/api/user/list')
  .then((response) => response.data
  , (error) => {
    console.log(error);
  });
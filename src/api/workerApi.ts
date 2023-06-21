import axios from 'axios';

interface User {
  id: number;
  name: string;
}

export const getUserById = async (id: number): Promise<User> => {
  const response = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
  return response.data;
};
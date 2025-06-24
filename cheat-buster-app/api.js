 
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

 
const searchUser = async (params) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};
module.exports=searchUser;


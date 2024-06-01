// src/services/userService.js
/**
 * Retrieves a list of users from the API.
 * @returns {Promise<User[]>} - A promise that resolves to an array of user objects.
 */
import axios from "axios";

const API_URL = "http://127.0.0.1:1230";

const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/list`, {
      headers: {
        "x-access-token":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIn0.1Al8RHoDdEiGxSQ8jYfIdh3l6PFXTsWvaEL_4SHw-yg",
      },
    });
    return response.data.Users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getUsers,
};

import axios from "axios";
import { base_url } from "../../base_url";
import { getAuthToken } from "../../utils/auth";

console.log('base_url:', base_url)
export const fetchExercises = () => async (dispatch) => {
  dispatch({ type: "EXERCISE_LOADING" });

  try {
    const token = await getAuthToken();
    console.log('Токен:', token);  

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    console.log('URL запроса:', `${base_url}/exercises/exercises/`);
    console.log('Заголовки:', headers);

    const response = await axios.get(`${base_url}/exercises/exercises/`, { headers });

    console.log('Ответ от сервера:', response);  
    dispatch({ type: "EXERCISE_SUCCESS", payload: response.data });
  } catch (error) {
    console.error('Ошибка запроса:', error.message);  
    dispatch({
      type: "EXERCISE_FAILURE",
      payload: error.response?.data?.detail || error.message || "Ошибка сети",
    });
  }
};

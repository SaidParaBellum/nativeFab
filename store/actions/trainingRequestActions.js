import axios from "axios";
import { base_url } from "../../base_url";


export const FETCH_REQUESTS_SUCCESS = "FETCH_REQUESTS_SUCCESS";
export const FETCH_REQUESTS_FAILURE = "FETCH_REQUESTS_FAILURE";

export const fetchTrainingRequests = () => async (dispatch) => {
  try {
    const response = await axios.get(`${base_url}/training/training-requests/`);
    dispatch({ type: FETCH_REQUESTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_REQUESTS_FAILURE, error: error.response?.data || "Ошибка сети" });
  }
};

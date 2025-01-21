const initialState = {
  exercises: [],
  loading: false,
  error: null,
};

const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EXERCISE_LOADING":
      return { ...state, loading: true, error: null };
    case "EXERCISE_SUCCESS":
      return { ...state, loading: false, exercises: action.payload };
    case "EXERCISE_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default exerciseReducer;

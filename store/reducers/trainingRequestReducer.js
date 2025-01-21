const initialState = {
    trainingRequests: [],
    loading: false,
    error: null,
  };
  
  const trainingRequestReducer = (state = initialState, action) => {
    switch (action.type) {
      case "TRAINING_LOADING":
        return { ...state, loading: true, error: null };
      case "TRAINING_SUCCESS":
        return { ...state, loading: false, trainingRequests: action.payload };
      case "TRAINING_FAILURE":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default trainingRequestReducer;
  
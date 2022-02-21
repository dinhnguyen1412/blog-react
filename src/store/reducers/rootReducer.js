const initialState = {
  users: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return { ...state, users: action.data };
    case "CREATE_BLOG":
      return { ...state, users: [...state.users, action.data] };
    default:
      return state;
  }
};

export default rootReducer;

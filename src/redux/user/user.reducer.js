import UserActionTypes from "./user.types";
const initialState = {
  currentUser: null,
  isFetching: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}

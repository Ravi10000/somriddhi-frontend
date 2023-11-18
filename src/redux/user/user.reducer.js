import UserActionTypes from "./user.types";
const initialState = {
  currentUser: null,
  isFetching: true,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    default:
      return state;
  }
}

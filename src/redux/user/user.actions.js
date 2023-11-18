import UserActionTypes from "./user.types";

// export function setCurrentUser(user) {
//   console.log(user);
//   return {
//     type: UserActionTypes.SET_CURRENT_USER,
//     payload: user,
//   };
// }

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const setIsFetching = (isFetching) => ({
  type: UserActionTypes.SET_IS_FETCHING,
  payload: isFetching,
});

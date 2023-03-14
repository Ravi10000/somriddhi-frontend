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

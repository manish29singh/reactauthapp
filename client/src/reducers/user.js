export default (state = {}, action) => {
  switch (action.type) {
    case "ACTIVE_USER":
      console.log("USER REDUCER : ", action.data);
      return {
        ...state,
        user: action.data
      };
    default:
      return state;
  }
};

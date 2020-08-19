const accountDefaultState = false;

export default (state = accountDefaultState, { account, type }) => {
  switch (type) {
    case "INIT_ACCOUNT":
      return { ...account };
    case "LOG_OUT":
      return false;
    default:
      return state;
  }
};

const loginInitialState = {
  token: '',
  userInfo: {},
  isLoading: false
};

function login(state = loginInitialState, action) {
  switch (action.type) {
    case 'LOGIN_POST_REQUEST':
      return { ...state, isLoading: true };

    case 'LOGIN_POST_FAILURE':
      return { ...state, errorMessage: action.errorMessage, isLoading: false };

    case 'LOGIN_POST_SUCCESS':
      return {
        token: action.json.result[0].token,
        userInfo: {
          ...action.json.result[0]
        },
        isLoading: false
      };

    default:
      return state;
  }
}

export default {
  login
};

const initialState = {
  config: null,
  loading: false
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'config:LOAD':
      return {
        ...state,
        loading: true
      };

    case 'config:LOADED':
      return {
        config: action.config,
        loading: false
      }

    default:
      return state;
  }
};

export { configReducer };

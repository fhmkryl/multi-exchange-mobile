const initState = {
    exchanges: []
  }
  
  const mainReducer = (state: any = initState, action: any) => {
    switch (action.type) {
      case 'GET_ALL_EXCHANGES_ACTION':
        return {
          ...state,
          exchanges: action.exchanges
        };
      default:
        break;
    }
    return state;
  }

  export default mainReducer;
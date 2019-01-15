// const homeInitialState = {
//   data: '',
//   isLoading: false,
// };

//  function homeInfo(state = homeInitialState, action) {
//   switch (action.type) {
//     case 'HOME_POST_REQUEST':
//       return { ...state, isLoading: true };

//     case 'HOME_POST_FAILURE':
//       return { ...state, errorMessage: action.errorMessage, isLoading: false };

//     case 'HOME_POST_SUCCESS':
//       return {
//         data: {
//           ...action.json,
//         },
//         isLoading: false,
//       };
    
//     default:
//       return state;
//   }
// }

// export default {
//   homeInfo,
// };
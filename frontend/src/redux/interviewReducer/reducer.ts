import {
  POST_STARTINTERVIEW_ERROR,
  POST_STARTINTERVIEW_LOADING,
  POST_STARTINTERVIEW_SUCCESS,
  PATCH_ANSWER_ERROR,
  PATCH_ANSWER_LOADING,
  PATCH_ANSWER_SUCCESS,
  POST_ENDINTERVIEW_ERROR,
  POST_ENDINTERVIEW_LOADING,
  POST_ENDINTERVIEW_SUCCESS,
} from "./actionTypes";
interface Action {
  type: string;
  payload?: any;
}
interface Message {
  role: string;
  content: string;
}

interface State {
  isLoading: boolean;
  isError: boolean;
  interviewId: string; //id of the interview going on
  conversation: []; //to display on the screen
  latest: string;
}

const initState: State = {
  isLoading: false,
  isError: false,
  interviewId: "",
  conversation: [],
  latest: "",
};

export const reducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case POST_STARTINTERVIEW_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case POST_STARTINTERVIEW_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case POST_STARTINTERVIEW_SUCCESS:
      return {
        ...state,
        isError: false,
        isLoading: false,
        interviewId: action.payload.newInterview._id,
        conversation: action.payload.newInterview.conversation,
        latest: action.payload.latest,//first question
      };
    case PATCH_ANSWER_ERROR:
      return {
        ...state,
        isError: true,
      };
    case PATCH_ANSWER_SUCCESS:
      return {
        ...state,
        isError: false,
        isLoading: false,
        conversation: action.payload.updatedInterview.conversation,
        latest: action.payload.latest,
      };
    case POST_ENDINTERVIEW_ERROR:
      return {
        ...state,
      };
    case POST_ENDINTERVIEW_LOADING:
      return { ...state, isLoading: true };
    case POST_ENDINTERVIEW_SUCCESS:
      return {
        ...initState,
      };
    default:
      return state;
  }
};

import React, { useEffect } from "react";
import { AudioToText } from "./AudioToText";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  POST_STARTINTERVIEW_ERROR,
  POST_STARTINTERVIEW_LOADING,
  POST_STARTINTERVIEW_SUCCESS,
  POST_ENDINTERVIEW_ERROR,
  POST_ENDINTERVIEW_SUCCESS,
  POST_ENDINTERVIEW_LOADING,
} from "../redux/interviewReducer/actionTypes";
import { PATCH_LOGGEDUSER_SUCCESS } from "../redux/authReducer/actionTypes";
import { useNavigate } from "react-router-dom";
import { useToast } from "./custom/ToastProvider";

export const InterviewRoom: React.FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store: RootState) => store.authReducer.token);
  const { isLoading, isError, interviewId, conversation, latest } = useSelector(
    (store: RootState) => store.interviewReducer
  );

  console.log(interviewId, conversation, latest);
  useEffect(() => {
    //start request ot backend
    handleStartInterview()
  }, []);

  const handleStartInterview = async () => {
    dispatch({ type: POST_STARTINTERVIEW_LOADING });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/interview/start`,
        { type: "MERN" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      dispatch({ type: POST_STARTINTERVIEW_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e);
      dispatch({ type: POST_STARTINTERVIEW_ERROR });
    }
  };
  const handleEndInterview = async () => {
    dispatch({ type: POST_ENDINTERVIEW_LOADING });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/interview/end/${interviewId}`,
        { conversation: conversation },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      dispatch({ type: POST_ENDINTERVIEW_SUCCESS });
      dispatch({
        type: PATCH_LOGGEDUSER_SUCCESS,
        payload: response.data.updatedUser,
      });
      toast("success", `${response.data.message}`);
      navigate("/dashboard");
    } catch (e: any) {
      console.log(e);
      dispatch({ type: POST_ENDINTERVIEW_ERROR });
      toast("error", `${e.response.data.message}`);
    }
  };
  return (
    <div className="container">
      <div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : isError ? (
          <h1>Something went wrong</h1>
        ) : (
          conversation.length > 0 &&
          conversation.map((el: any, i) => {
            return (
              <div key={i}>
                {el.role == "user" ? "User:" : "Interviewer:"}
                {el.content}
              </div>
            );
          })
        )}
      </div>
      <div
        className="absolute bottom-0 left left-1/2 "
        style={{ transform: "translateX(-50%)" }}
      >
        <button className="btn mb-4 bg-red-500" onClick={handleEndInterview}>
          End Interview
        </button>
        <AudioToText></AudioToText>
      </div>
    </div>
  );
};

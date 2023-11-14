import React, { useEffect, useState } from "react";
import {
  GET_USERINTERVIEWS_ERROR,
  GET_USERINTERVIEWS_LOADING,
  GET_USERINTERVIEWS_SUCCESS,
} from "../redux/authReducer/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useToast } from "./custom/ToastProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SmallLoader } from "./common/SmallLoader";
import { Error } from "./common/Error";
import { Modal } from "./Modal";

export const UserInterviews: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, token, userInterviews, loggedInUser } =
    useSelector((store: RootState) => store.authReducer);
  console.log(userInterviews, "userInterviews");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (token) {
      getUserInterviews();
    } else {
      toast("error", "You must be logged in");
      navigate("/login");
    }
  }, []);

  const getUserInterviews = async () => {
    dispatch({ type: GET_USERINTERVIEWS_LOADING });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/interview`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data) {
        dispatch({
          type: GET_USERINTERVIEWS_SUCCESS,
          payload: response.data.userInterviews,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_USERINTERVIEWS_ERROR });
      toast("error", "Oops! Couldn't fetch you interviews!");
    }
  };

  return (
    <>
      {isLoading ? (
        <SmallLoader />
      ) : isError ? (
        <Error />
      ) : (
        userInterviews.length > 0 &&
        userInterviews.map((el: any) => {
          return (
            <div className="rounded-md shadow-md p-4 flex gap-4">
              <img src="https://placehold.co/300x200" alt="placeholder image" />
              <div className="flex flex-col justify-between">
                <div>
                  <h3>Type: {el.interviewType}</h3>
                  <p>Interview Score: {el.feedback.overallScore}/10</p>
                </div>
                <div>
                  <button className="btn-outline" onClick={openModal}>
                    View Details
                  </button>
                  <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className="p-8 mx-auto overflow-y-scroll">
                      <h2>Detailed Feedback</h2>
                      {el.feedback.strengths.length > 0 && (
                        <>
                          <h4>Strengths:</h4>
                          <ul>
                            {el.feedback.strengths.map((ele: any) => {
                              return <li>{ele}</li>;
                            })}
                          </ul>
                        </>
                      )}
                      {el.feedback.improvementAreas.length > 0 && (
                        <>
                          <h4>Improvement Areas:</h4>
                          <ul>
                            {el.feedback.improvementAreas.map((ele: any) => {
                              return <li>{ele}</li>;
                            })}
                          </ul>
                        </>
                      )}
                      <div>
                        <h4>Conversation :</h4>
                        <div className="h-64 w-96 overflow-y-scroll">
                          {el.conversation.length > 0 &&
                            el.conversation.map((ele: any) => {
                              return (
                                <div
                                  className={`shadow-md rounded-md p-4 my-2 flex flex-col gap-2 justify-between ${
                                    ele.role == "user"
                                      ? "bg-slate-400"
                                      : "bg-gray-200"
                                  }`}
                                >
                                  <div className="flex gap-4 items-center">
                                    <img
                                      className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                                      src={
                                        ele.role == "user"
                                          ? `${loggedInUser?.profileImage}`
                                          : "https://img.freepik.com/premium-vector/robot-icon-circle-vector-illustration_418020-199.jpg"
                                      }
                                      alt="Bordered avatar"
                                    />
                                    <div className="inline-block  min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
                                    <h3>
                                      {ele.role == "user"
                                        ? `${loggedInUser.username}:`
                                        : "Intellibot:"}
                                    </h3>
                                  </div>
                                  <p>{ele.content}</p>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                    <button className="btn-outline" onClick={closeModal}>
                      Close Details
                    </button>
                  </Modal>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

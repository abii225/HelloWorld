import React, { useEffect, useState } from "react";
import { useToast } from "./custom/ToastProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Modal } from "./Modal";
import { BsLaptop } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { CHANGE_INTERVIEW_TYPE } from "../redux/interviewReducer/actionTypes";
import { UserInterviews } from "./UserInterviews";
import { Button } from "flowbite-react";

interface Course {
  id: number;
  title: string;
  description: string;
}

const Interviews = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth: boolean = useSelector(
    (store: RootState) => store.authReducer.isAuth
  );
  const token: String | null = useSelector(
    (store: RootState) => store.authReducer.token
  );
  const loggedInUser = useSelector(
    (store: RootState) => store.authReducer.loggedInUser
  );
  // console.log(isAuth, token, loggedInUser, "Dashboard");
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  // const startInterview = async (type: any, toast: any, navigate: any) => {
  //   dispatch({ type: POST_STARTINTERVIEW_LOADING });
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/interview/start`,
  //       type,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     // console.log(response, "LOGIN");
  //     if (response.data) {
  //       dispatch({ type: POST_STARTINTERVIEW_SUCCESS, payload: response.data });
  //       toast("success", "Interview started successfully");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     dispatch({ type: POST_STARTINTERVIEW_ERROR });
  //     toast("error", "Oops! Login failed!");
  //   }
  // };

  const [type, setType] = useState<String>("");

  useEffect(() => {
    if (type) {
      dispatch({ type: CHANGE_INTERVIEW_TYPE, payload: type });
    }
  }, [type]);

  return (
    <div>
      <div className=" mx-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="mb-4">
          <ul className="flex gap-5">
            <li
              className={`mr-4 cursor-pointer ${
                selectedTab === 0 && "border-b-2 border-primary_green"
              }`}
            >
              <div onClick={() => handleTabChange(0)}>Get Started</div>
            </li>
            <li
              className={`cursor-pointer ${
                selectedTab === 1 && "border-b-2 border- border-primary_green"
              }`}
            >
              <div onClick={() => handleTabChange(1)}>Completed</div>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3.5">
          {selectedTab === 0 && (
            <button className="btn w-1/2 py-4 text-lg my-5" onClick={openModal}>
              Start Interview
            </button>
          )}
          {selectedTab === 1 && <UserInterviews />}
        </div>
      </div>
      <div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10%",
              textAlign: "center",
              gap: "20px",
            }}
          >
            <div
              className={`cursor-pointer hover:bg-primary_green hover:text-text bg-${
                type == "MERN" ? "primary_green" : "transparent"
              }`}
              style={{
                border: "1px solid black",
                width: "100px",
                height: "50px",
                paddingTop: "10px",
              }}
              onClick={() => setType("MERN")}
            >
              MERN
            </div>
            <div
              className={`cursor-pointer hover:bg-primary_green hover:text-text bg-${
                type == "Java" ? "primary_green" : "transparent"
              }`}
              style={{
                border: "1px solid black",
                width: "100px",
                height: "50px",
                paddingTop: "10px",
              }}
              onClick={() => setType("Java")}
            >
              JAVA
            </div>
            <div
              className={`cursor-pointer hover:bg-primary_green hover:text-text bg-${
                type == "DSA" ? "primary_green" : "transparent"
              }`}
              style={{
                border: "1px solid black",
                width: "100px",
                height: "50px",
                paddingTop: "10px",
              }}
              onClick={() => setType("DSA")}
            >
              DSA
            </div>
          </div>
          <div style={{ marginLeft: "25%" }}>
            <button
              className="btn"
              disabled={!type}
              onClick={() => navigate("/dashboard/start_interview")}
            >
              Start the Interview
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Interviews;

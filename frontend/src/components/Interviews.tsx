import React, { useState } from "react";
import { useToast } from "./custom/ToastProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import {
  POST_STARTINTERVIEW_ERROR,
  POST_STARTINTERVIEW_LOADING,
  POST_STARTINTERVIEW_SUCCESS,
} from "../redux/interviewReducer/actionTypes";
interface Course {
  id: number;
  title: string;
  description: string;
}

const Interviews = () => {
  const toast = useToast();
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
  console.log(isAuth, token, loggedInUser, "Dashboard");
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const startInterview = async (type: any, toast: any, navigate: any) => {
    dispatch({ type: POST_STARTINTERVIEW_LOADING });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/interview/start`,
        type,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response, "LOGIN");
      if (response.data) {
        dispatch({ type: POST_STARTINTERVIEW_SUCCESS, payload: response.data });
        toast("success", "Interview started successfully");
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: POST_STARTINTERVIEW_ERROR });
      toast("error", "Oops! Login failed!");
    }
  };

  const allCourses: Course[] = [
    { id: 1, title: "NEM 111", description: "Description for Course 1" },
    { id: 2, title: "NEM 111", description: "Description for Course 2" },
    // Add more courses as needed
  ];

  const inProgressCourses: Course[] = [
    { id: 3, title: "111", description: "Description for Course 3" },
    { id: 4, title: " 111", description: "Description for Course 4" },
  ];

  const completedCourses: Course[] = [
    { id: 5, title: "ggg 111", description: "Description for Course 5" },
    { id: 6, title: "NEM 111", description: "Description for Course 6" },
  ];

  const renderCourseCards = (courses: Course[]) => {
    return courses.map((course) => (
      <div
        key={course.id}
        className="border p-4 mb-4 rounded-md"
        style={{ width: "20rem" }}
      >
        <h3 className="text-xl font-semibold">{course.title}</h3>
        <p>{course.description}</p>
        <button className="btn">Start Interview</button>
      </div>
    ));
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg mt-10">
        <div className="mb-4">
          <ul className="flex">
            <li
              className={`mr-4 cursor-pointer ${
                selectedTab === 0 && "border-b-2 border-teal-500"
              }`}
            >
              <div onClick={() => handleTabChange(0)}>All Courses</div>
            </li>
            <li
              className={`mr-4 cursor-pointer ${
                selectedTab === 1 && "border-b-2 border-teal-500"
              }`}
            >
              <div onClick={() => handleTabChange(1)}>In Progress</div>
            </li>
            <li
              className={`cursor-pointer ${
                selectedTab === 2 && "border-b-2 border-teal-500"
              }`}
            >
              <div onClick={() => handleTabChange(2)}>Completed</div>
            </li>
          </ul>
        </div>

        <div>
          {selectedTab === 0 && renderCourseCards(allCourses)}
          {selectedTab === 1 && renderCourseCards(inProgressCourses)}
          {selectedTab === 2 && renderCourseCards(completedCourses)}
        </div>
      </div>
    </div>
  );
};

export default Interviews;

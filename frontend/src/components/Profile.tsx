
import { Modal } from "./Modal";
 import "../App.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "./custom/ToastProvider";
import { UPDATE_USER_ERROR, UPDATE_USER_LOADING, UPDATE_USER_SUCCESS } from "../redux/authReducer/actionTypes";
import { RootState } from "../redux/store";
 interface UserProfile {
    profilePicture: string;
    username: string;
    email: string;
    bio: string;
    password: string;
    confirm_password:string
  }
  const initialState={
    username:"",
    password:"",
    confirm_password:"",
    bio:""
  }

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch=useDispatch();
    const toast = useToast();
  const navigate = useNavigate();
  const loggedInUser = useSelector( (store: RootState) => store.authReducer.loggedInUser);
  const token: String | null = useSelector(
    (store: RootState) => store.authReducer.token
  );

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };
  const [updateUserData, setUpdateUserData] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {

    // Perform validation (e.g., check if passwords match)

    const {username, password,confirm_password,bio}= updateUserData;
    if (password !== confirm_password) {
      alert("Passwords do not match!");
      return;
    }
    else{
      console.log(updateUserData,"payload");
      updateUser(updateUserData,toast,navigate)
      // console.log(_id,"id")
      // setUpdateUserData(initialState)
    }
    // Call the onEditProfile function with updated data

    // Reset state and close the modal
    setIsEditing(false);
    // closeModal();
  };

  const updateUser = async (userObj: any, toast: any, navigate: any) => {
    dispatch({ type: UPDATE_USER_LOADING });
    try {
      const response = await axios.patch(
        `http://localhost:8080/user/update/${loggedInUser._id}`,
        userObj,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
          },
        }
      );
      // console.log(response,"response")
      // return navigate("/")
      if (response) {
      
        dispatch({
          type: UPDATE_USER_SUCCESS,
          paylad:response.data
        });
       
        toast("success", "User Details updates Please Login !");
        return navigate("/login");
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_USER_ERROR });
      toast("error", "Oops! Update failed!");
    }
  };
  let profile="";
  const {username, password,confirm_password,bio}= updateUserData;

  
  return (
    <>
       <button onClick={openModal}>Show Profile</button>  
     <div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="profile-container">
            <div className="profile-image">
              <img src={profile?profile:"https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"} alt="Profile" style={{borderRadius:"50%"}}/>
            </div>
            <div className="profile-data">
              <h1 style={{textAlign:"center",fontSize:"25px",marginBottom:"10px",color:"green"}}>Your Information</h1>

              <p style={{display:"flex",flexDirection:"column"}}> Username: {isEditing ? <input value={username} onChange={(e) => setUpdateUserData({...updateUserData,['username']:e.target.value})} 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary_green focus:border-primary_green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              /> : "Jahir Pendhari"}</p>
         
              <p style={{display:"flex",flexDirection:"column"}}>Bio: {isEditing ? <input value={bio} onChange={(e) => setUpdateUserData({...updateUserData,['bio']:e.target.value})} 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary_green focus:border-primary_green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              /> : "I'am Jahir Pendhari"}</p>

              {isEditing && (
                <div style={{display:"flex", flexDirection:"column"}}>
                  <label>New Password:</label>
                  <input type="password" value={password} onChange={(e) => setUpdateUserData({...updateUserData,['password']:e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary_green focus:border-primary_green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label>Confirm Password:</label>
                  <input type="password" value={confirm_password} onChange={(e) =>setUpdateUserData({...updateUserData,['confirm_password']:e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary_green focus:border-primary_green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              )}

              <button onClick={isEditing ? handleSaveClick : handleEditClick} className="btn mt-3">
                {isEditing ? "Save" : "Edit Profile and Password"}
              </button>
              {
                isEditing && <button className="btn-outline mt-3" onClick={()=> setIsEditing(!isEditing)}>Back</button>
              }
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Profile
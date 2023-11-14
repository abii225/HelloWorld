const User = require("../models/User.model");
const bcrypt = require("bcrypt");

exports.updateUser = async(req,res,next)=>{
  const { id } = req.params;
  const {username,password,bio}= req.body;
  console.log(id,"id")
  try{
    let user = await User.findOne({ _id: id });
    if(user)
    {
      bcrypt.hash(password, 8, async (err, hash)=> {
        // Store hash in your password DB.
        if (err) {
          return res.status(400).json({ message: "Couldn't hash password" });
        } else if (hash) {
          // Update user Data
          const updatedUser ={
            username,
            password: hash,
            bio,
          };
          console.log(updatedUser);
          await User.findByIdAndUpdate( id ,updatedUser);
          //send the updated User DEtails object as responsene 
          res.status(200).json({ message: "User Detailes Updated Successfully","User":req.body});
        }
      });
    }else{
      res.status(400).json({ message: "User Not Found" });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong while updating" });
  }
}
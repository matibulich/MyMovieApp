import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    nombre:{type:String, require:true},
    email:{type:String, required:true, unique:true },
    password:{type:String, required:true,}
  })

   export const User = mongoose.model("User", UserSchema)

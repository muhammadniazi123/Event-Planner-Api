import mongo, { Schema } from 'mongoose'; 
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const UserSchema = new mongo.Schema({
  Name: 
  { type: String, 
    required: true 
  },
  Email: 
  { type: String, 
    required: true 
  }, 
  Password: 
  { type: String, 
    required: true 
  },
  PhoneNO: 
  {type:String, 
    required:true
  }

});

UserSchema.pre('save', async function(next){

    const User= this;

    if(!User.isModified){
        next();
    }
    try {
      const saltrounds=10;
      const hash_password= await bcrypt.hash(User.Password, saltrounds)
      User.Password=hash_password;
    } catch (error) {
        next(error);
    }

})

//-------------------
//compare password using bycrpt
//--------------------
UserSchema.methods.comparePassword = async function (Password) {
  try {
    return bcrypt.compare(Password, this.Password)
    
  } catch (error) {
      console.error(error)

  }
  
}

//-------------------
//Jwt Logic
//--------------------
UserSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userID : this._id.toString(),
            email : this.email,

        },
    process.env.JWT_password,
    {
        expiresIn:"30d",
    }
);
    } catch (error) {
        console.error(error)
    }
    
}

const User = mongo.model('User', UserSchema);
export default User;
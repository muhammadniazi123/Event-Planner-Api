import User from "../schema/User_schema.js"

//-------------------
// Registeration Logic
//-------------------

const register= async(req,res)=>{
    const response =req.body;
    const {Name, Email, PhoneNO, Password} = response
    try {
        const UserExsit= await User.findOne({Email: Email});
        if(UserExsit){
            res.status(400).json({msg:"User with this email already exists"})
        }
        const UserCreated= await User.create({
            Name,
            Email,
            Password,
            PhoneNO,
        })
        res.status(201).json({
            msg:"User Created",
            userId: UserCreated._id.toString(),
            Token: await UserCreated.generateToken()

        })

        
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).send({msg :"internal error"})
                    

    }
}

//-------------------
// login Logic
//-------------------

const login= async(req,res)=>{
    const response =req.body;
    const {Email, Password} = response
    try {
        const UserExist= await User.findOne({Email: Email});
        if(!UserExist){
            res.status(400).json({msg:"Wrong email or password"})
        }
        const passwordcheck= await UserExist.comparePassword(Password)

      if(passwordcheck){
        res.status(200).json(
            {
                msg: "Login successfully", 
                userId: UserExist._id.toString(),
                Token: await UserExist.generateToken(),

            });
        }
        else{
            res.status(400).json({msg:"Invalid credentials Email or Password"})
        }

        
    } catch (error) {
                console.error('Error in register:', error);
                    res.status(400).send({msg :"internal error"});
                    

    }
}

export default {register, login}
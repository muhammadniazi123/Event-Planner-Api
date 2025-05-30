import zod from 'zod';

const signupSchema = zod.object({

Name: zod
    .string({ message: "Username should be a string" })
    .nonempty({ message: "Username should not be empty" })
    .trim()
    .min(3, { message: "Username should be atleast 3 characters long" })
    .max(255, { message: "Username should be atmost 255 characters long" }),  
Email: zod
    .string({ message: "email is req" })
    .nonempty({ message: "email should not be empty" })
    .trim()
    .min(3, { message: "email should be atleast 3 characters long" })
    .max(20, { message: "email should be atmost 20 characters long" }),  
PhoneNO: zod
    .string({ message: "phoneno is req" })
    .nonempty({ message: "phoneno should not be empty" })
    .trim()
    .min(10, { message: "phoneno should be atleast 10 characters long" })
    .max(20, { message: "phoneno should be atmost 20 characters long" }),
Password: zod
    .string({ message: "password is req" })
    .nonempty({ message: "password should not be empty" })
    .trim()
    .min(3, { message: "password should be atleast 3 characters long" })
    .max(40, { message: "password should be atmost 40 characters long" }),  

}) 

const loginSchema = zod.object({

    Email: zod
        .string({ message: "email is req" })
        .nonempty({ message: "email should not be empty" })
        .trim()
        .min(3, { message: "email should be atleast 3 characters long" })
        .max(20, { message: "email should be atmost 20 characters long" }),  
    Password: zod
        .string({ message: "password is req" })
        .nonempty({ message: "password should not be empty" })
        .trim()
        .min(3, { message: "password should be atleast 3 characters long" })
        .max(40, { message: "password should be atmost 40 characters long" }),  
    
    }) 

export default {signupSchema , loginSchema};
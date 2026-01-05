const { registerUser, loginUser, getProfile, logout } =require( '../controllers/Auth')

const express=require('express')
const Auth_Routes=express.Router()

Auth_Routes.post('/login',loginUser)
Auth_Routes.get('/profile',getProfile)
Auth_Routes.get('/logout',logout)
module.exports=Auth_Routes

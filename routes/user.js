const { Router } = require("express");
// const { models } = require("mongoose");
const User = require('../models/user');
const { render } = require("ejs");


const router =  Router();

router.get('/', (req, res) => {
    res.render('home', {
      user: req.user,
    })
  })
  
router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.get('/signup', (req, res) => {
    return res.render('signup');

});

router.post('/signin', async (req, res) => {
    const { email , password } = req.body;
 try{
  const token = await  User.matchPasswordAndGenerateToken(email, password)
     
  return res.cookie("token", token).redirect('/')
 }catch(error){
    return res.render("signin",{
        error: "Incorrect Email and Password",
        
    })
 }
})

router.post('/signup', async (req, res) => {
   
 try {
    const { fullName, email, password, } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/')
 } catch (error) {
    console.log(error.message);
    res.status(500).send('Error creating user');
 }
});

router.get('/logout',(req, res) => {
    res.clearCookie('token').redirect('/')
})
module.exports = router;
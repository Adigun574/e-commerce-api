const User = require("../models/user")
const bcrypt = require('bcryptjs');

const register = (req,res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
        res.status(400).json({success: false, msg: [...errors]})
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.status(400).json({success: false, msg: 'Email already exists'})
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                    res.status(200).json({success:true, msg: 'You are now registered and can log in'})
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
}

const login = async (req, res) => {
    try{
        let foundUser = await User.findOne({email:req.body.email})
        if (foundUser) {
            console.log(foundUser)
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                // let usrname = foundUser.username;
                res.status(200).json({success: true, msg: 'login successful', data : foundUser})
            } else {
                res.status(404).json({success: false, msg: 'invalid credentials'})
            }
        }
        else {
            res.status(404).json({success: false, msg: 'invalid credentials'})
    
            // let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            // await bcrypt.compare(req.body.password, fakePass);
    
            // res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{
        // res.send("Internal server error");
        res.status(500).json({success: false, msg: 'Internal server error'})
    }
}

const getAUser = async (req, res) => {
    try{
        let foundUser = await User.findOne({_id:req.params.id})
        if (foundUser) {
            console.log(foundUser)
            res.status(200).json({success: true, msg: 'user found', data : foundUser})
        }
        else {
            res.status(404).json({success: false, msg: 'user not found'})
        }
    } catch{
        res.status(500).json({success: false, msg: 'Internal server error'})
    }
}

module.exports = {
    login,
    register,
    getAUser
}

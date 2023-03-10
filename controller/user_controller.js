const User = require('../models/User')

// render the profile page
module.exports.profile = function (req, res) {
    User.findById(req.params.id, function(err, user) {
        return res.render('user_profile', {
            title: 'Profile',
            profile_user: user
        })
    })
}

module.exports.update = function(req, res) {
    if(req.user.id = req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
            return res.redirect('back')
        })
    } else {
        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    })
}

// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    })
}

//get the sign up data
module.exports.create = function (req, res) {
    console.log("req body", req.body)
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back')
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log("Error in finding user in signing up!"); return }



        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log("Error in creating user while in signing up!"); return }

                return res.redirect('/users/sign-in')
            })
        } else {
            return res.redirect('back')
        }
    })
}

//get the sign in data
module.exports.createSession = function (req, res) {
    return res.redirect('/')
}

//get the sign out
module.exports.destroySession = function (req, res, next) {
    // req.logout();
    // return res.redirect('/')
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}
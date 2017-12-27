import User from '../model/user';
import Debug from 'debug';

const debug = Debug(process.env.DEBUG);

/**
 * GET /dummy
 * Get Dummy Response
 */
exports.getDummy = (req, res) => {
    res.json({dummy: "My Dummy Response!!"});
};

/**
 * POST /login
 * Login using local authentication
 */
exports.postLogin = (req, res, next) => {
    req.assert('username', 'Username is not valid').notEmpty();
    req.assert('password', 'Password must be at least 4 characters long').len(4);

    const errors = req.validationErrors();

    if (errors) {
        return res.send(errors);
    }

    debug('session: ', req.session);


    const user = new User({
        username: req.body.username,
        password: req.body.password
    });


    User.findOne({username: req.body.username}, (err, existingUser) => {
            debug('postLogin err ', err, 'existingUser ', existingUser);
            if (err) {
                return res.send(err);
            }
            if (existingUser) {
                existingUser.comparePassword(user.password, (err, isMatch) => {
                    if (err) {
                        return res.send(err);
                    }
                    if (isMatch) {
                        return res.json({success: true, user:existingUser});
                    }else{
                        return res.json({success: false, error:"Wrong Password!"});
                    }
                });
            }else{
                return res.json({success: false, error:"User not found!"});
            }
        }
    );
};

/**
 * POST /signup
 * Create a new local user account.
 */
exports.postSignup = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('username', 'Username is not valid').notEmpty();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('passwordConf', 'Passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
        return res.send(errors);
    }


    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf
    });


    User.findOne({email: req.body.email}, (err, existingUser) => {
        if (err) {
            return res.send(err);
        }
        if (existingUser) {
            req.flash('errors', {msg: 'Account with that email address already exists.'});
            return res.json({success: false, error: "User already exists!"});
        }
        user.save((err, savedUser) => {
            if (err) {
                return res.send(err);
            }
            
            return res.json({success:true, user:savedUser});
        });
    });
};



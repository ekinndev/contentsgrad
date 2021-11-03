const express = require('express');
const passport = require('passport');
const User = require('../../models/user');
const Validator = require('async-validator').default;
const router = express.Router();

router.post('/register', async (req, res, next) => {
    const descriptor = {
        name: [
            { required: true, message: 'Your name is required.' },
            {
                min: 2,
                message: 'Name should have a minimum length of 2 characters.',
            },
            {
                max: 64,
                message: 'Name should have a maximum length of 64 characters.',
            },
        ],
        password: [
            { required: true, message: 'Password is required.' },
            {
                min: 8,
                message: 'Password should have a minimum length of 8 characters.',
            },
        ],
        passwordConfirmation: [
            { required: true, message: 'Password confirmation is required.' },
            {
                validator(rule, value, callback, source) {
                    return source.password === value || new Error('The passwords you entered are inconsistent.');
                },
            },
        ],
        email: [
            { type: 'email', message: 'E-mail is not valid.' },
            { required: true, message: 'E-mail is required.' },
        ],
    };

    const validator = new Validator(descriptor);
    try {
        await validator.validate(req.body);
    } catch ({ errors }) {
        return next({ message: errors.map(e => e.message).join(', ') });
    }

    const createdUser = new User(req.body);

    const user = await User.register(createdUser, req.body.password);

    req.session.userId = user._id;
    req.session.save();

    res.sendStatus(200);
});

router.post(
    '/session',
    passport.authenticate('local', { failWithError: true }),
    async (req, res) => {
        req.session.userId = req.user._id;
        req.session.save();
        res.send(req.user);
    },
    (err, req, res, next) => {
        if (err.status !== 401) return next(err);

        next({
            message:
                'The username and password you provided did not match our records. Please double-check and try again.',
            status: 401,
        });
    },
);

router.get('/logout', function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.status(200).send('OK');
});

module.exports = router;

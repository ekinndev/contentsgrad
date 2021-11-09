const express = require('express');
const passport = require('passport');
const User = require('../../models/user');
const Validator = require('async-validator').default;
const router = express.Router();

const ensureLogin = async (req, res, next) => {
    if (!req.user && process.env.NODE_ENV !== 'test') {
        return next({ message: 'Unauthorized', status: 401 });
    }
    next();
};
/**
 * @swagger
 * /user/register/:
 *   post:
 *     tags: [User]
 *     summary: Register an user
 *     responses:
 *       200:
 *         description: Create user and to start session.
 *         content:
 *           application/json:
 *             schema:
 *                type: String
 *                example: OK
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email.
 *                 example: hello@gmail.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: 123456
 *               passwordConfirmation:
 *                 type: string
 *                 description: Confirmation password
 *                 example: 123456
 *               name:
 *                 type: string
 *                 description: User's name
 *                 example: Ekin
 *
 *
 */

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

const preventLoginForLoggedInUsers = (req, res, next) => {
    if (req.user) {
        return next({ message: 'User is already logged in', status: 400 });
    }
    next();
};

/**
 * @swagger
 * /user/session/:
 *   post:
 *     tags: [User]
 *     summary: Logged in an existing user
 *     responses:
 *       200:
 *         description: Logged in an existing user and to start session
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   _id:
 *                      type: string
 *                      example: 6182c206874844d37934bfcb
 *                   name:
 *                      type: string
 *                      example: ekin
 *                   email:
 *                      type: string
 *                      example: hello@test.com
 *                   salt:
 *                      type: string
 *                      example: 72b78e625f60415bbee928c0e6273e2152c161c0ba1cb64fdedf4a227f85ec88
 *                   hash:
 *                      type: string
 *                   createdAt:
 *                      type: string
 *                   updatedAt:
 *                      type: string
 *       401:
 *         description: The credentials does not match from db
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                      example: The username and password you provided did not match our records. Please double-check and try again.
 *                  status:
 *                      type: integer
 *                      example: 401
 *       400:
 *         description: The user already logged in
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                      example: User is already logged in.
 *                  status:
 *                      type: integer
 *                      example: 400
 *
 *
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email.
 *                 example: hello@test.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: hellofromotherside
 *
 *
 */

router.post(
    '/session',
    preventLoginForLoggedInUsers,
    passport.authenticate('local', { failWithError: true }),
    async (req, res) => {
        req.session.userId = req.user._id;
        req.session.save();
        res.status(200).send(req.user);
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

/**
 * @swagger
 * /user/profile/:
 *   get:
 *     tags: [User]
 *     summary: To get current logged in user
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  _id:
 *                      type: string
 *                      example: 6182c206874844d37934bfcb
 *                  name:
 *                      type: string
 *                      example: ekin
 *                  email:
 *                      type: string
 *                      example: hello@test.com
 *                  createdAt:
 *                      type: string
 *                      example: 2021-11-03T17:08:22.823Z
 *                  updatedAt:
 *                      type: string
 *                      example: 2021-11-03T17:08:22.823Z
 *
 *
 *
 */
router.get('/profile', ensureLogin, function (req, res, next) {
    res.status(200).send(req.user);
});

/**
 * @swagger
 * /user/logout/:
 *   delete:
 *     tags: [User]
 *     summary: To logout and destroying the logged in user
 *     responses:
 *       200:
 *         description: To logout and destroying the logged in user
 *         content:
 *           application/json:
 *             schema:
 *                type: String
 *                example: OK
 *
 *
 */

router.delete('/logout', function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.status(200).send('OK');
});

module.exports = router;

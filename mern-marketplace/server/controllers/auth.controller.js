import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import User from '../models/user.model';
import config from '../../config/config';

const signin = (req, res) => {};

const signout = (req, res) => {};

const requireSignin = (req, res) => {};

const hasAuthorization = (req, res) => {};

export default {
   signin,
   signout,
   requireSignin,
   hasAuthorization,
};

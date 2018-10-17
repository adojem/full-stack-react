import _ from 'lodash';
import request from 'request';
import stripe from 'stripe';
import User from '../models/user.model';
import errorHandler from '../helpers/dbErrorHandler';
import config from '../../config/config';

const myStripe = stripe(config.stripe_test_secret_key);

const create = (req, res, next) => {
   const user = new User(req.body);
   user.save((err, result) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return res.status(200).json({
         message: 'Successfully signed up!',
      });
   });
};

const list = (req, res) => {
   User.find((err, users) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      return res.json(users);
   }).select('name email updated created');
};

const userByID = (req, res, next, id) => {
   User.findById(id).exec((err, user) => {
      if (err || !user) {
         return res.status(400).json({
            error: 'User not found',
         });
      }
      req.profile = user;
      return next();
   });
};

const read = (req, res) => {
   req.profile.hashed_password = undefined;
   req.profile.salt = undefined;
   return res.json(req.profile);
};

const update = (req, res, next) => {
   let user = req.profile;
   user = _.extend(user, req.body);
   user.updated = Date.now();
   user.save((err) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      return res.json(user);
   });
};

const remove = (req, res, next) => {
   const user = req.profile;
   user.remove((err, deletedUser) => {
      if (err) {
         return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
         });
      }
      deletedUser.hashed_password = undefined;
      deletedUser.salt = undefined;
      return res.json(deletedUser);
   });
};

const isSeller = (req, res, next) => {
   const isSeller = req.profile && req.profile.seller;
   if (!isSeller) {
      return res.status(403).json({
         error: 'User is not a seller',
      });
   }
   return next();
};

const stripe_auth = (req, res, next) => {
   request(
      {
         url: 'https://connect.stripe.com/oauth/token',
         method: 'POST',
         json: true,
         body: {
            client_secret: config.stripe_test_secret_key,
            code: req.body.stripe,
            grant_type: 'authorization_code',
         },
      },
      (error, response, body) => {
         if (body.error) {
            return res.status(400).json({
               error: body.error_description,
            });
         }
         req.body.stripe_seller = body;
         return next();
      },
   );
};

const stripeCustomer = (req, res, next) => {
   if (req.profile.stripe_customer) {
      // update stripe customer
      myStripe.customers.update(
         req.profile.stripe_customer,
         {
            source: req.body.token,
         },
         (err, customer) => {
            if (err) {
               return res.status(400).json({
                  error: errorHandler.getErrorMessage(err),
               });
            }
            req.body.order.payment_id = customer.id;
            return next();
         },
      );
   }
   else {
      myStripe.customers
         .create({
            email: req.profile.email,
            source: req.body.token,
         })
         .then((customer) => {
            User.updateOne(
               { _id: req.profile._id },
               { $set: { stripe_customer: customer._id } },
               (err, order) => {
                  if (err) {
                     return res.status(400).json({
                        error: errorHandler.getErrorMessage(err),
                     });
                  }
                  req.body.order.payment_id = customer.id;
                  return next();
               },
            );
         });
   }
};

const createCharge = (req, res, next) => {
   if (!req.profile.stripe_seller) {
      return res.status(400).json({
         error: 'Please connect your Stripe account',
      });
   }
   myStripe.tokens
      .create(
         {
            customer: req.order.payment_id,
         },
         {
            stripe_account: req.profile.stripe_seller.stripe_user_id,
         },
      )
      .then((token) => {
         myStripe.charges
            .create(
               {
                  amount: req.body.amount * 100,
                  currency: 'usd',
                  source: token.id,
               },
               {
                  stripe_account: req.profile.stripe_seller.stripe_user_id,
               },
            )
            .then(() => next());
      });
};

export default {
   create,
   createCharge,
   userByID,
   read,
   list,
   remove,
   stripe_auth,
   stripeCustomer,
   update,
   isSeller,
};

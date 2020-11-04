import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse, hashPassword, matchPassword } from '../modules/common/service';
import { IUser } from '../modules/users/model';
import UserService from '../modules/users/service';
import e = require('express');
import MailService from '../modules/common/mail';
import environment from "../environment";
import * as jwt from "jsonwebtoken";


export class UserController {

    private user_service: UserService = new UserService();
    private mail_service: MailService = new MailService();

    public async signup_user(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.first_name && req.body.last_name && req.body.email && req.body.password) {
            let hash_password = await hashPassword(req.body.password);

            const user_params: IUser = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hash_password
            };
            this.user_service.createUser(user_params, (err: any, user_data: IUser) => {
                if (err) {

                    failureResponse("Email already exist", null, res);
                } else {
                  this.mail_service.sendMail(
                    req.body.email,
                    'Welcome Email',
                    'Hey Welcome User');
                    successResponse('create user successfully', null, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
         }
    }

    public forgot_password(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.email) {
             const user_filter = { email: req.body.email };
            this.user_service.filterUser(user_filter, async (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                  if (!user_data) {
                    failureResponse("No record found for this email", null, res);
                  }else{

                    const jwtSecret = ""+ environment.getJwtToken();
                    const token = jwt.sign(
                      { resetPasswordUser: user_data.email },
                      jwtSecret,
                      { expiresIn: "600000" }
                    );
                        this.mail_service.sendMail(
                          req.body.email,
                          'Reset Password Email',
                          'Click here to reset your password '+ environment.getAppUrl()+"/reset-password/"+token);
                        successResponse('Forgot password requested', {token}, res);
                  }
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public login(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.email && req.body.password) {
             const user_filter = { email: req.body.email };
            this.user_service.filterUser(user_filter, async (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                  if (user_data && user_data.password) {
                    let savedPassword = ""+user_data.password;
                    let matchedPassword = await matchPassword(req.body.password, savedPassword);
                    if (!matchedPassword) {
                      failureResponse("Password not matched", null, res);
                    }else{
                      //Sing JWT, valid for 1 hour
                      const jwtSecret = ""+ environment.getJwtToken();
                      const token = jwt.sign(
                        { userId: user_data.email, username: user_data.email },
                        jwtSecret,
                        { expiresIn: "1h" }
                      );
                      successResponse("Login SUCCESS", {token}, res);
                    }
                  //
                  }else{
                    failureResponse('Error in Login', null, res);
                  }

                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public reset_password(req: Request, res: Response) {

        if (req.params.token && req.body.password && req.body.confirm_password) {
          if (req.body.password !== req.body.confirm_password) {
             failureResponse("Password doesn't match", null, res);
          }else{
            const jwtSecret = ""+ environment.getJwtToken();

            //sync
            try {
             const decoded: any = jwt.verify(req.params.token, jwtSecret);
             const user_filter = {email: decoded.resetPasswordUser};

             this.user_service.filterUser(user_filter, async (err: any, user_data: IUser) => {
                 if (err) {
                     mongoError(err, res);
                 } else {
                   if (!user_data) {
                     failureResponse('No data found for this token ', null, res);
                   }else{
                     let hash_password = await hashPassword(req.body.password);
                     user_data['password'] = hash_password;
                     this.user_service.updateUser(user_data, (err: any, user_data_1: IUser) => {
                       if (err) {
                           mongoError(err, res);
                       }else{
                         successResponse('Password Updated Success', null, res);

                       }
                     });
                   }

                 }
             });
            }
            catch (ex) {
               failureResponse("Error in Token", ex, res);
             }


          }

        } else {
            insufficientParameters(res);
        }
    }
}

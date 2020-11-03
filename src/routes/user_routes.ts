import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/userController';

export class AuthRoutes {

    private user_controller: UserController = new UserController();

    public route(app: Application) {

        app.post('/api/register', (req: Request, res: Response) => {
            this.user_controller.signup_user(req, res);
        });

        app.post('/api/forgot_password', (req: Request, res: Response) => {
            this.user_controller.forgot_password(req, res);
        });

        app.post('/api/login', (req: Request, res: Response) => {
            this.user_controller.login(req, res);
        });

        app.post('/api/reset_password/:token', (req: Request, res: Response) => {
            this.user_controller.reset_password(req, res);
        });

    }
}

import { Router } from "express";

import { SendForgotPasswordEmailController } from "@modules/accounts/useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController";

const passwordRoutes = Router();

const sendForgotPasswordEmailController = new SendForgotPasswordEmailController();

passwordRoutes.post("/forgot", sendForgotPasswordEmailController.handle);

export { passwordRoutes };

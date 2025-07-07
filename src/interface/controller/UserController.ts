import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { LoggerModule } from "../../infraesctucture";
import { LoggerModuleInterface } from "../../infraesctucture/module/interface/LoggerModuleInterface";
import { GetUsersUseCase } from "../../application/use-case/GetUsersUseCase";



@injectable()
export class UserControler {
    constructor(
        @inject(LoggerModule) private loggerModule: LoggerModuleInterface,
        @inject(GetUsersUseCase) private getUsersUseCase: GetUsersUseCase
    ) {
        this.loggerModule.info('UserController initialized');
    }

    async getUsers(req: Request, res: Response) {
        this.loggerModule.info('Received request to get users');

        const result = this.getUsersUseCase.execute();
        this.loggerModule.info('Users fetched successfully', { users: result });

        return res.status(200).json(result);
    }
}
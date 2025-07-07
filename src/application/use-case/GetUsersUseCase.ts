import { inject, injectable } from 'inversify'
import { GetUsersUseCaseInterface } from './interface/GetUsersUseCaseInterface';
import { LoggerModuleInterface } from '../../infraesctucture/module/interface/LoggerModuleInterface';
import { LoggerModule } from '../../infraesctucture';


@injectable()
export class GetUsersUseCase implements GetUsersUseCaseInterface {
    constructor(
        @inject(LoggerModule) private loggerModule: LoggerModuleInterface
    ) { }

    execute(): { id: number, name: string }[] {
        try {
            const users = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
            return users
        } catch (error) {
            this.loggerModule.error(error as Error, { context: 'GetUsersUseCase.execute' });
            throw new Error('Failed to fetch users');
        }
    }
}
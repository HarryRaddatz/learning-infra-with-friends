export interface GetUsersUseCaseInterface {
    execute(): { id: number, name: string }[];
}
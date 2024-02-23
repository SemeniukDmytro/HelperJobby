export interface ServerErrorDTO {
    type: string;
    title: string;
    status: string;
    detail: string;
}

export class ServerError extends Error {
    public ServerErrorDTO: ServerErrorDTO;

    constructor(message: string, serverErrorDTO: ServerErrorDTO) {
        super(message);
        this.ServerErrorDTO = serverErrorDTO;
    }
}
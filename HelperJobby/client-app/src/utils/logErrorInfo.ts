import {ServerError} from "../DTOs/errorDTOs/ServerErrorDTO";


export function logErrorInfo(error: unknown) {
    if (error instanceof ServerError) {
        const errorText = `\nType: ${error.ServerErrorDTO.type}\nTitle: ${error.ServerErrorDTO.title}\nStatus: ${error.ServerErrorDTO.status}\nDetail: ${error.ServerErrorDTO.detail}`
        console.error(errorText);
    }
    else {
        console.error(error);
    }
}
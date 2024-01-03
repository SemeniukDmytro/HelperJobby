import {ServerError} from "../ErrorDTOs/ServerErrorDTO";

export function logErrorInfo(error : ServerError){
    const errorText = `\nType: ${error.ServerErrorDTO.type}\nTitle: ${error.ServerErrorDTO.title}\nStatus: ${error.ServerErrorDTO.status}\nDetail: ${error.ServerErrorDTO.detail}`
    console.error(errorText);
}
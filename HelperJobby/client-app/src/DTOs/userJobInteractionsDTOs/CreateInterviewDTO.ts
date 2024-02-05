import {InterviewTypes} from "../../enums/modelDataEnums/InterviewTypes";

export interface CreateInterviewDTO {
    interviewDateTime: string;
    interviewStart: string;
    interviewEnd: string;
    interviewType: InterviewTypes;
    appointmentInfo: string;
}
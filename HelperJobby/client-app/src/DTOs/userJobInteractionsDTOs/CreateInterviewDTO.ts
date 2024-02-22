import {InterviewTypes} from "../../enums/modelDataEnums/InterviewTypes";

export interface CreateInterviewDTO {
    interviewStart: string;
    interviewEnd: string;
    interviewType: InterviewTypes;
    appointmentInfo: string;
}
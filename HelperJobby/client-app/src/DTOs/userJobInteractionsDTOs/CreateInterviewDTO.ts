import {InterviewTypes} from "../../enums/InterviewTypes";

export interface CreateInterviewDTO {
    interviewDateTime: string;
    interviewStart: string;
    interviewEnd: string;
    interviewType: InterviewTypes;
    appointmentInfo: string;
}
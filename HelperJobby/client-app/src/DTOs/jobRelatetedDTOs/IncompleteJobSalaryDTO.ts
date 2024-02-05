import {ShowPayByOptions} from "../../enums/modelDataEnums/ShowPayByOptions";
import {IncompleteJobDTO} from "./IncompleteJobDTO";

export interface IncompleteJobSalaryDTO {
  id: number;
  showPayByOption: ShowPayByOptions;
  minimalAmount: number;
  maximalAmount?: number | null;
  salaryRate: string;
  incompleteJobId: number;
  incompleteJob: IncompleteJobDTO;
}
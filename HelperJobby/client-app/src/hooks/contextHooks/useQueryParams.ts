import {useContext} from "react";
import JobQueryParamsContext from "../../contexts/JobQueryParamsContext";

export default function useQueryParams() {
    return useContext(JobQueryParamsContext);
} 
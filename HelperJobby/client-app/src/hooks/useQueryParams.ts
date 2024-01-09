import {useContext} from "react";
import QueryParamsContext from "../contexts/QueryParamsContext";

export default function useQueryParams(){
    return useContext(QueryParamsContext);
} 
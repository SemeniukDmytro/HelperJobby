import {useContext} from "react";
import {CurrentEmployerJobContext} from "../../contexts/CurrentEmployerJobContext";

export default function useCurrentEmployerJob(){
    return useContext(CurrentEmployerJobContext);
}
import {useContext} from "react";
import CurrentJobApplicationContext from "../../contexts/CurrentJobApplicationContext";

export default function useCurrentJobApplication() {
    return useContext(CurrentJobApplicationContext);
}
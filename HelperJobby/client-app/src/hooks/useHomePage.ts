import {useContext} from "react";
import HomePageContext from "../contexts/HomePageContext";

export function useHomePage(){
    return useContext(HomePageContext);
}
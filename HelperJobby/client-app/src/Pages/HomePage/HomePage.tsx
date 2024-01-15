import React, {FC} from "react";
import {HomePageContextProvider} from "../../contexts/HomePageContext";
import HomeComponent from "./PageComponents/HomeComponent/HomeComponent";

interface HomePageProps{

}

const HomePage: FC<HomePageProps> = () => {
    console.log("dsa")
    return(
        <HomePageContextProvider>
            <HomeComponent/>
        </HomePageContextProvider>
    )
}

export default HomePage;
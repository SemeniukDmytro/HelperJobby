import React, {FC} from "react";
import HomeComponent from "../../Components/HomeComponent/HomeComponent";
import {HomePageContextProvider} from "../../context/HomePageContext";

interface HomePageProps{

}

const HomePage: FC<HomePageProps> = () => {

    return(
        <HomePageContextProvider>
            <HomeComponent/>
        </HomePageContextProvider>
    )
}

export default HomePage;
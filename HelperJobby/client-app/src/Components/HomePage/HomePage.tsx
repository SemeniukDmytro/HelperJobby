import React, { FC } from 'react';
import {useAuth} from "../../Contexts/AuthContext";


interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
    const [authUser, setAuthUser] = useAuth();
    return (
  <div>
      {authUser?.user.email}
  </div>
)
};

export default HomePage;

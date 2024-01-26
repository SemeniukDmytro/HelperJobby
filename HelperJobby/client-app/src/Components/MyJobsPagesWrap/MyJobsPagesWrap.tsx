import React, { FC } from 'react';
import './MyJobsPagesWrap.scss';
import {JobSeekerJobInteractionsProvider} from "../../contexts/JobSeekerJobInteractionsContext";
import {Outlet} from "react-router-dom";

interface MyJobsPagesWrapProps {}

const MyJobsPagesWrap: FC<MyJobsPagesWrapProps> = () => (
  <JobSeekerJobInteractionsProvider>
      <Outlet/>
  </JobSeekerJobInteractionsProvider>
);

export default MyJobsPagesWrap;

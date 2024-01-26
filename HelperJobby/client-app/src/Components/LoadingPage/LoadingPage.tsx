import React, { FC } from 'react';
import './LoadingPage.scss';
import {Oval} from "react-loader-spinner";

interface LoadingPageProps {}

const LoadingPage: FC<LoadingPageProps> = () => (
  <div className="loading-page-layout">
      <Oval strokeWidth={5} color={"#2557a7"} secondaryColor={"#767676"} height={"40px !important"}></Oval>
  </div>
);

export default LoadingPage;

import React, { FC } from 'react';
import './EmployerMessagingWrap.scss';
import {EmployerMessagingConversationProvider} from "../../contexts/EmployerMessagingConversationContext";
import {Outlet} from "react-router-dom";

interface EmployerMessagingWrapProps {}

const EmployerMessagingWrap: FC<EmployerMessagingWrapProps> = () => (
  <EmployerMessagingConversationProvider>
      <Outlet/>
  </EmployerMessagingConversationProvider>
);

export default EmployerMessagingWrap;

import React, { FC } from 'react';
import './EmployerMessagingWrap.scss';
import {Outlet} from "react-router-dom";
import {EmployerMessagingConversationProvider} from "../../../../contexts/EmployerMessagingConversationContext";

interface EmployerMessagingWrapProps {}

const EmployerMessagingWrap: FC<EmployerMessagingWrapProps> = () => (
  <EmployerMessagingConversationProvider>
      <Outlet/>
  </EmployerMessagingConversationProvider>
);

export default EmployerMessagingWrap;

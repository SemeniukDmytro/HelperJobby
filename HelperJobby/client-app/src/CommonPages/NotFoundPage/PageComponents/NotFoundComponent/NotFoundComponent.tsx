import React, { FC } from 'react';
import './NotFoundComponent.scss';

interface NotFoundComponentProps {}

const NotFoundComponent: FC<NotFoundComponentProps> = () => (
  <div className="NotFoundComponent">
    Page not found
  </div>
);

export default NotFoundComponent;

import React from 'react';

type ProtectedRouteProps = {
  children: React.JSX.Element;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => children;

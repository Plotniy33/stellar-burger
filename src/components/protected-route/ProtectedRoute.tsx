import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { isAuthCheck } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  children: React.JSX.Element;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const location = useLocation();

  const isAuthUser = useSelector(isAuthCheck);

  if (!onlyUnAuth && !isAuthUser) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthUser) {
    return <Navigate replace to={location.state?.from || { pathname: '/' }} />;
  }
  return children;
};

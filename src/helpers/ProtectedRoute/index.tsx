import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const { pathname } = useLocation();

  const hasCandidateId = pathname.includes('/homepage/');

  console.log('User:', user);
  console.log('Current Pathname:', pathname);
  console.log('hasCandidateId:', hasCandidateId);

  if (!user && !hasCandidateId) {
    return <Navigate to={`/singup`} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

import { useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { selectUser } from '../../redux/selector';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector(selectUser);
  const { pathname } = useLocation();

  const hasCandidateId = pathname.includes('/homepage/');

  if (!user && !hasCandidateId) {
    return <Navigate to={`/singup`} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

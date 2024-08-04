import { UserAuthContext } from 'context/UserAuthContext';
import { ReactNode, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(UserAuthContext);
  const { pathname } = useLocation();

  const hasCandidateId = pathname.includes('/homepage/');

  if (!user && !hasCandidateId) {
    return <Navigate to={`/singup`} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

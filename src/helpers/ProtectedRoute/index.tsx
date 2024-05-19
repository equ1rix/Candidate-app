import { UserAuthContext } from 'context/UserAuthContext';
import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(UserAuthContext);
  if (!user) {
    return <Navigate to="/singup" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

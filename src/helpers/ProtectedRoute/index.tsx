import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useUserAuth } from 'context/UserAuthContext';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useUserAuth();
  if (!user) {
    return <Navigate to="/singup" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

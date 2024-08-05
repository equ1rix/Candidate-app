import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from 'redux/store';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.user.user);
  if (!user) {
    return <Navigate to="/signup" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

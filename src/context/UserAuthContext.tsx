import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import { auth } from 'index';

type UserAuthContextType = {
  user: string;
  signUp: (email: string, password: string) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
};

export const userAuthContext = createContext<UserAuthContextType | undefined>(
  undefined
);

export const UserAuthContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<string>('');

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser.uid);
      } else {
        setUser('');
      }
    });
    return () => unsubscribe();
  }, []);

  const contextValue: UserAuthContextType = {
    user,
    signUp,
    logIn,
    logOut
  };

  return (
    <userAuthContext.Provider value={contextValue}>
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(userAuthContext);
  if (context === undefined) {
    throw new Error(
      'useUserAuth must be used within a UserAuthContextProvider'
    );
  }
  return context;
};

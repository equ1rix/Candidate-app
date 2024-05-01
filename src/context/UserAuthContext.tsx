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
  signInWithPopup,
  signOut,
  User,
  UserCredential
} from 'firebase/auth';

import { auth, provider } from 'helpers/firebaseConfig';

type UserAuthContextType = {
  user: User | null;
  signUp: (email: string, password: string) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  googleAuth: () => void;
};

export const userAuthContext = createContext<UserAuthContextType | undefined>(
  undefined
);

export const UserAuthContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const googleAuth = async () => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        setUser(user);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const contextValue: UserAuthContextType = {
    user,
    signUp,
    logIn,
    logOut,
    googleAuth
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

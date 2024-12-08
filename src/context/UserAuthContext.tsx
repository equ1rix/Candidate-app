import { useLocation, useNavigate } from 'react-router-dom';
import { createContext, ReactNode, useCallback, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
  User as FirebaseUser
} from 'firebase/auth';
import { signInAction, logOutAction, User } from '../redux/reduser';

import { db } from 'helpers/firebaseConfig';
import { auth, provider } from 'helpers/firebaseConfig';

export type UserAuthContextType = {
  signUp: (email: string, password: string) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  googleAuth: () => void;
};

export const UserAuthContext = createContext<UserAuthContextType>({
  signUp: () => {},
  logIn: () => {},
  logOut: () => {},
  googleAuth: () => {}
});

type UserAuthContextProviderProps = {
  children: ReactNode;
};

export const UserAuthContextProvider = ({
  children
}: UserAuthContextProviderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      handleUserAuthentication(userCredential.user);
    } catch (err) {
      alert(err);
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      handleUserAuthentication(userCredential.user);
    } catch (err) {}
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch(logOutAction());
      navigate('/signup');
    } catch (err) {}
  };

  const googleAuth = async () => {
    const result: UserCredential = await signInWithPopup(auth, provider);
    handleUserAuthentication(result.user);
  };

  const handleUserAuthentication = useCallback(
    async (currentUser: FirebaseUser) => {
      const { uid } = currentUser;
      const userDocRef = doc(db, 'users', uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data() as User;
        dispatch(signInAction(userData));
      } else {
        const user: User = {
          id: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName,
          allowedFeatures: ['DEgH207MQxG04niWQtx4']
        };
        await setDoc(userDocRef, user);
        dispatch(signInAction(user));
      }
      const currentPath = location.pathname;
      navigate(currentPath === '/' ? '/homepage' : currentPath);
    },
    [dispatch]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        handleUserAuthentication(currentUser);
      } else {
        dispatch(logOutAction());
        navigate('/signup');
      }
    });

    return () => unsubscribe();
  }, [handleUserAuthentication, dispatch]);

  const contextValue: UserAuthContextType = {
    signUp,
    logIn,
    logOut,
    googleAuth
  };

  return (
    <UserAuthContext.Provider value={contextValue}>
      {children}
    </UserAuthContext.Provider>
  );
};

import { createContext, ReactNode, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

import { auth, provider } from 'helpers/firebaseConfig';

export type UserAuthContextType = {
  user: User | null;
  signUp: (email: string, password: string) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  googleAuth: () => void;
};

export const UserAuthContext = createContext<UserAuthContextType>({
  user: null,
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
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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
        const { displayName, email: userEmail, uid } = user;
        const nameToSave = displayName ? displayName : userEmail;
        const db = getFirestore();
        const userDocRef = doc(db, 'users', uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
          await setDoc(userDocRef, {
            id: uid,
            name: nameToSave,
            email: userEmail
          });
          navigate('/homepage');
        } else {
          navigate('/homepage');
        }
      }
    } catch (error) {
      console.error(error);
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
    <UserAuthContext.Provider value={contextValue}>
      {children}
    </UserAuthContext.Provider>
  );
};

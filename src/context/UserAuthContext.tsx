import { useNavigate } from 'react-router-dom';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential
} from 'firebase/auth';

import { db } from 'helpers/firebaseConfig';
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

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      handleUserAuthentication();
    } catch (err) {
      alert(err);
    }
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    try {
      signOut(auth);
      setUser(null);
      navigate('/singup'); 
    } catch (err) {
      console.error(err);
    }
  };

  const googleAuth = async () => {
    const result: UserCredential = await signInWithPopup(auth, provider);
    handleUserAuthentication(result.user);
  };

  const handleUserAuthentication = async (currentUser?: User | null) => {
    const userToSet = currentUser || auth.currentUser;
    if (userToSet) {
      setUser(userToSet);
      const { displayName: name, email, uid } = userToSet;
      const nameToSave = name ? name : email;
      const userDocRef = doc(db, 'users', uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        await setDoc(userDocRef, {
          id: uid,
          name: nameToSave,
          email: email
        });
      }
      navigate('/homepage');
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

import { useNavigate } from 'react-router-dom';
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

import { setUsers, User } from '../redux/actions';
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
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch(setUsers(null));
      navigate('/singup');
    } catch (err) {
      console.error(err);
    }
  };

  const googleAuth = async () => {
    const result: UserCredential = await signInWithPopup(auth, provider);
    handleUserAuthentication(result.user);
  };

  const handleUserAuthentication = useCallback(
    async (currentUser?: FirebaseUser | null) => {
      const userToSet = currentUser || auth.currentUser;
      if (userToSet) {
        const user: User = {
          id: userToSet.uid,
          email: userToSet.email,
          name: userToSet.displayName,
          role: 'Recruiter'
        };
        dispatch(setUsers(user));
        const { displayName: name, email, uid } = userToSet;
        const nameToSave = name ? name : email;
        const userDocRef = doc(db, 'users', uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
          await setDoc(userDocRef, {
            id: uid,
            name: nameToSave,
            email: email,
            role: 'Recruiter'
          });
        }
        navigate('/homepage');
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        handleUserAuthentication(currentUser);
      } else {
        dispatch(setUsers(null));
        navigate('/singup');
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

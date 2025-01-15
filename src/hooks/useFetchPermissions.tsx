import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from 'helpers/firebaseConfig';

export type Permissions = {
  id: string;
  title: string;
};
export const useFetchPermissions = () => {
  const [permissions, setPermissions] = useState<Permissions[]>([]);

  const fetchPermissionsData = async () => {
    try {
      const candidatesRef = collection(db, 'userPermissions');
      const q = query(candidatesRef);
      const querySnapshot = await getDocs(q);
      const permissionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title
      }));

      setPermissions(permissionsData);
    } catch (err) {}
  };
  useEffect(() => {
    fetchPermissionsData();
  }, []);

  return { permissions };
};

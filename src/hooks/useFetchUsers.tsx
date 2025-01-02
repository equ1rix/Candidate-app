import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from 'helpers/firebaseConfig';

export const useFetchUsers = () => {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name || 'Unknown'
      }));
      setUsers(usersList);
    } catch (err) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error };
};

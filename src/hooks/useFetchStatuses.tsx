import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';

import { db } from 'helpers/firebaseConfig';

export type Statuses = {
  id: string;
  title: string;
};

export const useFetchStatuses = () => {
  const [statuses, setStatuses] = useState<Statuses[]>([]);

  const fetchstatusData = async () => {
    try {
      const candidatesRef = collection(db, 'statuses');
      const q = query(candidatesRef);
      const querySnapshot = await getDocs(q);
      const statusData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title
      }));
      const posArray: Statuses[] = [
        { id: 'all_statuses', title: 'All statuses' },
        ...statusData
      ];
      setStatuses(posArray);
    } catch (err) {}
  };
  useEffect(() => {
    fetchstatusData();
  }, []);

  return { statuses };
};

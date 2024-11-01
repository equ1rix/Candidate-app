import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'helpers/firebaseConfig';

export type Position = {
  id: string;
  position: string;
};

export const useFetchPositions = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPositionData = async () => {
      try {
        const candidatesRef = collection(db, 'positions');
        const q = query(candidatesRef);
        const querySnapshot = await getDocs(q);
        const positionData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          position: doc.data().position
        }));
        const posArray: Position[] = [
          { id: 'All positions', position: 'All positions' },
          ...positionData
        ];
        setPositions(posArray);
      } catch (err) {
        setError('Failed to fetch');
      } finally {
        setLoading(false);
      }
    };

    fetchPositionData();
  }, []);

  return { positions, loading, error };
};

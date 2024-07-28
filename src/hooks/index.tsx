import { useState, useEffect } from 'react';
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
  startAfter,
  where
} from 'firebase/firestore';
import { db } from 'helpers/firebaseConfig';
import { Candidate } from 'pages/Homepage';
import { itemPerPage } from 'constans';

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
        setPositions(positionData);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch');
      } finally {
        setLoading(false);
      }
    };

    fetchPositionData();
  }, []);

  return { positions, loading, error };
};

export const useFetchCandidates = (
  currentPage: number,
  searchQuery: string,
  selectedPosition: string
) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = async (
    page: number,
    search: string,
    position: string
  ) => {
    try {
      setLoading(true);
      const candidatesRef = collection(db, 'candidates');
      const snapshot = await getCountFromServer(candidatesRef);
      const totalCount = snapshot.data().count;
      setTotalPages(Math.ceil(totalCount / itemPerPage));

      const constraints = [];

      if (position) {
        constraints.push(where('position', '==', position));
      }

      if (search) {
        constraints.push(
          where('name', '>=', search),
          where('name', '<=', search + '\uf8ff')
        );
      }

      constraints.push(limit(itemPerPage));

      let q = query(candidatesRef, ...constraints);

      if (!search && !position && page > 1) {
        const startAtIndex = (page - 1) * itemPerPage;
        const prevCandidatesQuery = query(candidatesRef, limit(startAtIndex));
        const prevCandidatesSnapshot = await getDocs(prevCandidatesQuery);
        const lastVisible =
          prevCandidatesSnapshot.docs[prevCandidatesSnapshot.docs.length - 1];
        q = query(candidatesRef, startAfter(lastVisible), limit(itemPerPage));
      }

      const querySnapshot = await getDocs(q);
      const candidatesData = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data()
          }) as Candidate
      );

      setCandidates(candidatesData);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates(currentPage, searchQuery, selectedPosition);
  }, [currentPage, searchQuery, selectedPosition]);

  return { candidates, totalPages, loading, error };
};

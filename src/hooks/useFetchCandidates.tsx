import { itemPerPage } from 'constans';
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
import { useEffect, useState } from 'react';

export const useFetchCandidates = (
  currentPage: number,
  searchQuery: string,
  selectedPosition: string,
  isFavorite: boolean
) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchCandidates = async (
    page: number,
    search: string,
    position: string,
    favorite: boolean
  ) => {
    try {
      setLoading(true);
      const candidatesRef = collection(db, 'candidates');

      const constraintsForCount = [];
      if (position && position !== '0') {
        constraintsForCount.push(where('position', '==', position));
      }
      if (search) {
        constraintsForCount.push(
          where('name', '>=', search),
          where('name', '<=', search + '\uf8ff')
        );
      }
      if (favorite) {
        constraintsForCount.push(where('favorite', '==', true));
      }

      console.log(constraintsForCount);

      const countQuery = query(candidatesRef, ...constraintsForCount);
      const snapshot = await getCountFromServer(countQuery);
      const totalCount = snapshot.data().count;
      setTotalPages(Math.ceil(totalCount / itemPerPage));

      let q = query(candidatesRef, ...constraintsForCount, limit(itemPerPage));

      if (page > 1) {
        const prevCandidatesQuery = query(
          candidatesRef,
          ...constraintsForCount,
          limit((page - 1) * itemPerPage)
        );
        const prevCandidatesSnapshot = await getDocs(prevCandidatesQuery);
        const lastVisible =
          prevCandidatesSnapshot.docs[prevCandidatesSnapshot.docs.length - 1];

        q = query(
          candidatesRef,
          ...constraintsForCount,
          startAfter(lastVisible),
          limit(itemPerPage)
        );
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
    } catch (err) {}
  };

  useEffect(() => {
    fetchCandidates(currentPage, searchQuery, selectedPosition, isFavorite);
  }, [currentPage, searchQuery, selectedPosition, isFavorite]);

  return { candidates, totalPages, loading };
};

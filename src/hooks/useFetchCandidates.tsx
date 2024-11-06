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
  currentPage = 1,
  searchQuery = '',
  selectedPosition = '',
  selectedStatus = ''
) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  const fetchCandidates = async (
    page: number,
    search: string,
    position: string,
    status: string
  ) => {
    try {
      setLoading(true);
      const candidatesRef = collection(db, 'candidates');

      const constraintsForCount = [];
      if (position && position !== '0') {
        constraintsForCount.push(where('position', '==', position));
        console.log('1');
      }
      if (search) {
        constraintsForCount.push(
          where('name', '>=', search),
          where('name', '<=', search + '\uf8ff')
        );
        console.log('2');
      }
      if (status && status !== '0') {
        constraintsForCount.push(where('status', '==', status));
        console.log('3');
      }

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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCandidates(currentPage, searchQuery, selectedPosition, selectedStatus);
  }, [currentPage, searchQuery, selectedPosition, selectedStatus]);

  return { candidates, totalPages, loading };
};

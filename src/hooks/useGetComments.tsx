import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'helpers/firebaseConfig';

interface Comment {
  id: string;
  text: string;
  authorName: string;
  dateTime: string;
  candidateId: string;
  visible: boolean;
}

const useGetComments = (candidateId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const itemsRef = collection(db, 'comments');
      const q = query(itemsRef, where('candidateId', '==', candidateId));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      setComments(items);
    };

    fetchComments();
  }, [candidateId]);

  return comments;
};

export default useGetComments;

import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'Firebase/firebaseConfig';

const useUpdateCommentText = () => {
  const updateCommentText = async (id: string, newText: string) => {
    try {
      const commentDocRef = doc(db, 'comments', id);
      await updateDoc(commentDocRef, { text: newText });
    } catch (error) {}
  };

  return updateCommentText;
};

export default useUpdateCommentText;

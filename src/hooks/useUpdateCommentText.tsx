import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'helpers/firebaseConfig';

const useUpdateCommentText = () => {
  const updateCommentText = async (id: string, newText: string) => {
    const commentDocRef = doc(db, 'comments', id);
    await updateDoc(commentDocRef, { text: newText });
  };

  return updateCommentText;
};

export default useUpdateCommentText;

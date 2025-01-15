import { doc, updateDoc } from 'firebase/firestore';

import { db } from 'helpers/firebaseConfig';

const useUpdateCommentVisibility = () => {
  const updateCommentVisibility = async (id: string, isVisible: boolean) => {
    const commentDocRef = doc(db, 'comments', id);
    await updateDoc(commentDocRef, { visible: isVisible });
  };

  return updateCommentVisibility;
};

export default useUpdateCommentVisibility;

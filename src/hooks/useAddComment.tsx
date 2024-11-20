import { setDoc, doc } from 'firebase/firestore';
import { db } from 'helpers/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

interface Comment {
  id: string;
  text: string;
  authorName: string;
  dateTime: string;
  candidateId: string;
  visible: boolean;
}

const useAddComment = () => {
  const addComment = async (
    text: string,
    authorName: string,
    candidateId: string
  ) => {
    const newId = uuidv4();
    const newComment: Comment = {
      id: newId,
      authorName,
      text,
      dateTime: new Date().toISOString(),
      candidateId,
      visible: true
    };
    await setDoc(doc(db, 'comments', newId), newComment);
    return newComment;
  };

  return addComment;
};

export default useAddComment;

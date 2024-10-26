import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { db } from 'helpers/firebaseConfig';
import { selectUserName } from '../../redux/selector';

type CandidateCommentsProps = {
  candidateId: string;
};

interface Comment {
  id: string;
  text: string;
  authorName: string;
  dateTime: string;
  candidateId: string;
}

const CandidateComments = ({ candidateId }: CandidateCommentsProps) => {
  const [comment, setComment] = useState<string>('');
  const [commentsToShow, setCommentToShow] = useState<Comment[]>([]);
  const authorName = useSelector(selectUserName);

  const { t } = useTranslation();

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const getItemsById = async (id: string) => {
    const itemsRef = collection(db, 'comments');
    const q = query(itemsRef, where('candidateId', '==', id));

    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Comment[];

    return items;
  };

  const handleSubmit = async () => {
    try {
      const newId = uuidv4();
      await setDoc(doc(db, 'comments', newId), {
        id: newId,
        authorName: authorName,
        text: comment,
        dateTime: new Date().toISOString(),
        candidateId: candidateId
      });
      const updatedComments = await getItemsById(candidateId);
      setCommentToShow(updatedComments);
      setComment('');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const items = await getItemsById(candidateId);
      setCommentToShow(items);
    };

    fetchComments();
  }, []);

  return (
    <Box>
      <Grid container direction="column" spacing={2}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ flexGrow: 1, padding: 3 }}
        >
          {t('Candidate Info')}
        </Typography>
        <Grid item>
          <FormControl fullWidth>
            <TextField
              label="Comment"
              variant="outlined"
              name="comment"
              value={comment}
              onChange={handleChangeComment}
            />
          </FormControl>
        </Grid>
        <Grid item className="ml-auto">
          <Button
            onClick={handleSubmit}
            variant="contained"
            className="bg-bg-button w-[70px] h-[40px]"
          >
            {t('Add')}
          </Button>
        </Grid>
      </Grid>
      <Grid container className="mt-4 p-2 border rounded-lg border-gray-300">
        {commentsToShow.map((el) => (
          <Grid
            className="w-[100%] min-h-[40px] bg-bg-main my-1 border rounded-lg flex items-center px-4"
            item
            key={el.id}
          >
            {el.text}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CandidateComments;

import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectUserName } from '../../redux/selector';
import DeleteIcon from 'components/Icons/deleteIcon';
import Label from 'components/Label';
import useGetComments from 'hooks/useGetComments';
import useUpdateCommentText from 'hooks/useUpdateCommentText';
import useUpdateCommentVisibility from 'hooks/useUpdateCommentVisibility';
import useAddComment from 'hooks/useAddComment';

type CandidateCommentsProps = {
  candidateId: string;
};

interface Comment {
  id: string;
  text: string;
  visible: boolean;
  authorName: string;
  dateTime: string;
}

const CandidateComments = ({ candidateId }: CandidateCommentsProps) => {
  const [comment, setComment] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>('');
  const authorName = useSelector(selectUserName);
  const fetchedComments = useGetComments(candidateId);
  const [comments, setComments] = useState<Comment[]>(fetchedComments);
  const { t } = useTranslation();

  const updateCommentText = useUpdateCommentText();
  const updateCommentVisibility = useUpdateCommentVisibility();
  const addComment = useAddComment();

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    setComments(fetchedComments);
  }, [fetchedComments]);

  const handleEditComment = (id: string, text: string) => {
    setEditingCommentId(id);
    setEditedText(text);
  };

  const handleUpdateComment = async (id: string) => {
    if (editedText.trim()) {
      await updateCommentText(id, editedText);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id ? { ...comment, text: editedText } : comment
        )
      );
      setEditingCommentId(null);
      setEditedText('');
    }
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditedText('');
  };

  const handleSubmit = async () => {
    if (comment.trim()) {
      const newComment = await addComment(comment, authorName, candidateId);
      comments.push(newComment);
      setComment('');
    }
  };

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
        {comments.map(
          (el) =>
            el.visible && (
              <Grid
                className="w-[100%] min-h-[40px] bg-bg-main my-1 border rounded-lg flex flex-col px-4"
                item
                key={el.id}
              >
                <Box className="text-gray-400 flex justify-between">
                  <Typography>{el.authorName}</Typography>
                  <Typography>
                    {el.dateTime.replace(/T|Z/g, ' ').split('.', 1)}
                  </Typography>
                </Box>
                <Box className=" flex justify-between">
                  {editingCommentId === el.id ? (
                    <>
                      <TextField
                        className="w-full pb-1"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        onBlur={() => handleUpdateComment(el.id)}
                      />
                      <Box className="w-[140px] flex p-2">
                        <Button onClick={() => handleUpdateComment(el.id)}>
                          <Label label={t('Save')} />
                        </Button>
                        <Button onClick={cancelEdit}>
                          <Label label={t('Cancel')} />
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography className="flex items-center">
                        {el.text}
                      </Typography>
                      <Box className="w-[140px] flex p-2">
                        <Button
                          onClick={() => handleEditComment(el.id, el.text)}
                        >
                          <Label label={t('Edit')} />
                        </Button>
                        <Button
                          onClick={() => updateCommentVisibility(el.id, false)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            )
        )}
      </Grid>
    </Box>
  );
};

export default CandidateComments;

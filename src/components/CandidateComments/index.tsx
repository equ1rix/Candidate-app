import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectUserName } from '../../redux/selector';
import useGetComments from 'hooks/useGetComments';
import useUpdateCommentText from 'hooks/useUpdateCommentText';
import useUpdateCommentVisibility from 'hooks/useUpdateCommentVisibility';
import useAddComment from 'hooks/useAddComment';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

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

  const handleDeleteComment = async (id: string) => {
    await updateCommentVisibility(id, false);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  return (
    <Box>
      <Grid container direction="column" spacing={2}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ flexGrow: 1, padding: 3 }}
        >
          {t('Comments')}
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
      {comments.length > 0 && (
        <Grid container className="mt-4 p-2 border rounded-lg border-gray-300">
          {comments.map(
            (el) =>
              el.visible && (
                <Grid
                  className="w-[100%] min-h-[40px] bg-bg-main my-1 border rounded-lg flex flex-col px-4"
                  item
                  key={el.id}
                >
                  <Box className="text-gray-400 flex justify-between my-2">
                    <Typography>{el.authorName}</Typography>
                    <Tooltip
                      title={new Date(el.dateTime).toLocaleString('en-US', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                      arrow
                    >
                      <Typography>
                        {new Date(el.dateTime).toLocaleDateString('en-US', {
                          month: 'short',
                          day: '2-digit',
                          ...(new Date(el.dateTime).getFullYear() !==
                          new Date().getFullYear()
                            ? { year: 'numeric' }
                            : {})
                        })}
                      </Typography>
                    </Tooltip>
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
                            <DoneIcon className="text-bg-button" />
                          </Button>
                          <Button onClick={cancelEdit}>
                            <ClearIcon className="text-bg-button" />
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
                            <CreateIcon className="text-bg-button" />
                          </Button>
                          <Button onClick={() => handleDeleteComment(el.id)}>
                            <DeleteForeverIcon className="text-bg-button" />
                          </Button>
                        </Box>
                      </>
                    )}
                  </Box>
                </Grid>
              )
          )}
        </Grid>
      )}
    </Box>
  );
};

export default CandidateComments;

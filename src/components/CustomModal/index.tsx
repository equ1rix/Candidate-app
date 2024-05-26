import { ReactNode } from 'react';
import { Box, IconButton, Modal, Typography } from '@mui/material';

import { mock } from 'helpers';

import CloseIcon from 'components/Icons/closeIcon';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
};

const CustomModal = ({
  open = false,
  onClose = mock,
  title = '',
  children
}: ModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: 500,
          minHeight: 230,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          borderRadius: '8px'
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            id="modal-title"
            variant="h6"
            component="h3"
            sx={{ fontWeight: 'bold' }}
          >
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box mt={2}>{children}</Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;

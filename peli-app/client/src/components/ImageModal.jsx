import { useState } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const ImageModal = ({ open, imageUrl, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 1,
        boxShadow: 3
      }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
          <CloseIcon />
        </IconButton>
        <img src={imageUrl} alt="Movie poster" style={{ width: '100%', height: 'auto' }} />
      </Box>
    </Modal>
  );
};


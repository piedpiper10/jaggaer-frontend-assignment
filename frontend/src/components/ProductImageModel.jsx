
import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function ImageModal(props) {
  const { open, onClose, src, alt, caption } = props;

  return (
    <Modal
      open={open}
      onClose={(e, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') onClose();
      }}
      keepMounted
      slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0,0,0,0.6)' } } }}
    >
      <Box
        onClick={onClose}
        sx={{
          position: 'fixed',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: '92vw', sm: '88vw', md: 600 },
            maxWidth: 980,
            maxHeight: '90vh',
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: '0 10px 32px rgba(0,0,0,0.35)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <IconButton
            aria-label="Close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 6,
              right: 6,
              zIndex: 1,
              bgcolor: 'rgba(255,255,255,0.85)',
              '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ p: { xs: 1.5, sm: 2 }, overflow: 'auto', flex: 1, minHeight: 0 }}>
            <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 0 }}>
              <Box
                component="img"
                src={src}
                alt={alt}
                draggable={false}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '80vh',  // ensures image fits with padding/caption
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  userSelect: 'none',
                  borderRadius: 1,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default ImageModal;


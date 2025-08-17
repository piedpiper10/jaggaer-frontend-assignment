// MobileImageModal.jsx
import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ProductImageModal({ open, onClose, src, alt = 'Mobile', caption = 'Smartphone' }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="mobile-caption"
      slotProps={{
        backdrop: { sx: { backgroundColor: 'rgba(0,0,0,0.6)' } },
      }}
      keepMounted
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '92vw', sm: '88vw', md: 800 },
          maxWidth: 980,
          maxHeight: '70vh',
          bgcolor: '#fff',
          borderRadius: 2,
          boxShadow: '0 10px 32px rgba(0,0,0,0.35)',
          overflow: 'hidden',
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
            bgcolor: 'rgba(255,255,255,0.8)',
            '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Box
            component="img"
            src={src}
            alt={alt}
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 1,
              objectFit: 'contain',
              maxHeight: { xs: '70vh', md: '78vh' },
              userSelect: 'none',
            }}
          />
          <Box
            id="mobile-caption"
            sx={{ textAlign: 'center', color: 'text.secondary', mt: 1, typography: 'body2' }}
          >
            {caption}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

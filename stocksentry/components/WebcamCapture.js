// components/WebcamCapture.js

import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { Button, Typography, Box } from '@mui/material';

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  return (
    <Box>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        height="auto"
      />
      <Button variant="contained" color="primary" onClick={capture} sx={{ marginTop: 2 }}>
        Capture
      </Button>
    </Box>
  );
};

export default WebcamCapture;

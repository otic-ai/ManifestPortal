import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const PercentageIndicator = ({ target, current }) => {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment or decrement the progress gradually until it reaches the actual percentage
      if (progress < current) {
        setProgress(prevProgress => Math.min(prevProgress + 1, current));
      } else if (progress > current) {
        setProgress(prevProgress => Math.max(prevProgress - 1, current));
      } else {
        clearInterval(interval);
      }
    }, 20); // Adjust the interval for smoother animation
    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [current, progress]);

  useEffect(() => {
    // If current equals target, set progress to target
    if (current === target) {
      setProgress(current);
    } else if (current > target) {
      // If current exceeds target, set progress to 100%
      setProgress(target);
    } else {
      // Otherwise, reset progress to 0
      setProgress(0);
    }
  }, [current, target]);

  // Calculate the percentage based on the relative difference between current and target
  const percentage = target !== 0 ? (progress / target) * 100 : 0;

  return (
    <div style={{ position: 'relative' }}>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          width: '100%',
          height: '23px',
          borderRadius: '20px',
          backgroundColor: '#E5E4E2', // Set background color to match theme
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'orange', // Set progress bar color to match theme
          },
        }}
      />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center', zIndex: 1 }}>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${percentage.toFixed(2)}%`}
        </Typography>
      </div>
    </div>
  );
};

export default PercentageIndicator;

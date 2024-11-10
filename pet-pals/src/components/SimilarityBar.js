import { Box } from '@mantine/core';

const SimilarityBar = ({ score }) => {
    // Convert score to percentage
    const percentage = Math.round(score * 100);
    
    return (
      <Box
        style={{
          width: '100%',
          height: '3px',
          backgroundColor: '#e0e0e0',
          borderRadius: '2px',
          overflow: 'hidden',
          marginTop: '2px',
          marginBottom: '8px'
        }}
      >
        <Box
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: '#4CAF50',
            borderRadius: '2px',
            transition: 'width 0.3s ease-in-out'
          }}
        />
      </Box>
    );
  };

export default SimilarityBar;
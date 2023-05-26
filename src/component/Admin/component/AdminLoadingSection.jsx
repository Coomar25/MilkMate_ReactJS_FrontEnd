import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <Box sx={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <CircularProgress />
        </Box>
    );
}

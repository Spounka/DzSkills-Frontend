import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function FullScreenLoadingFallback() {
    return (
        <div
            style={{
                width: '100vw',
                height: '100dvh',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <CircularProgress color={'primary'} />
            <h3
                style={{
                    fontFamily: 'Montserrat Arabic',
                }}
            >
                يرجى الانتظار حتى يتم تحميل الموقع
            </h3>
        </div>
    );
}

export default FullScreenLoadingFallback;

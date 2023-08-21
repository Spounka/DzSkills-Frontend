import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { store } from './stores/store';
import theme from './theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from './dev';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            retryDelay: 1000 * 60 * 60,
            retryOnMount: false,
            staleTime: 1000 * 60 * 60,
            cacheTime: 1000 * 60 * 60,
            refetchInterval: 1000 * 60 * 5,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <QueryClientProvider client={queryClient}>
                        <SnackbarProvider
                            autoHideDuration={2000}
                            maxSnack={5}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DevSupport
                                    ComponentPreviews={ComponentPreviews}
                                    useInitialHook={useInitial}
                                >
                                    <App />
                                </DevSupport>
                            </LocalizationProvider>
                        </SnackbarProvider>
                        <div dir="ltr">
                            <ReactQueryDevtools />
                        </div>
                    </QueryClientProvider>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);

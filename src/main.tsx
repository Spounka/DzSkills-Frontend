import { ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { store } from './stores/store'
import theme from './theme'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: 1000 * 60 * 60,
            cacheTime: 1000 * 60 * 60,
            refetchInterval: 1000 * 60 * 5,
        }
    }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <App />
                        <div dir="ltr">
                            <ReactQueryDevtools />
                        </div>
                    </QueryClientProvider>
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
)

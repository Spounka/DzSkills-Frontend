import { ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import theme from './theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { store } from './stores/store'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
)

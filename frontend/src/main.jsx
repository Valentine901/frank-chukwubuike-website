import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import ThemeProvider from './Context/ThemeContext.jsx'
import AuthProvider from './Context/AuthContext.jsx'
import QueryContextProvider from './Context/GeneralQueryContext.jsx'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <QueryContextProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
      </QueryContextProvider>
    </ThemeProvider>
  </StrictMode>,
)

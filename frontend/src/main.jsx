import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './Context/ThemeContext.jsx'
import ProtectedRoute from './Context/AuthContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ProtectedRoute>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProtectedRoute>
    </ThemeProvider>
  </StrictMode>,
)

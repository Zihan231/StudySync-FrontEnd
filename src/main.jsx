import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'
import ThemeProvider from './contexts/Theme/themeProvider/themeProvider.jsx';
import AuthProvider from './contexts/Auth/AuthProvider/AuthProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
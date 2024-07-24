import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/components/App'
import { ThemeProvider } from './components/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
)
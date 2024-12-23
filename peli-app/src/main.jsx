import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MovieApp } from './MovieApp.jsx'
import "../src/styles/styles.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieApp />
  </StrictMode>,
)

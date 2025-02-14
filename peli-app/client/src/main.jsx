import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MovieApp } from './MovieApp.jsx'
import {BrowserRouter} from "react-router-dom"
import "./styles/styles.css"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <MovieApp />
  </StrictMode>
  </BrowserRouter>
)

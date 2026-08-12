import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Inter, bundled locally (weights 400-900) so the SCORM package stays
// self-contained - no runtime call to fonts.googleapis.com. Vite
// fingerprints the woff2 files into dist.
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

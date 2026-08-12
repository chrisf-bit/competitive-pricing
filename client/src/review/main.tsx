import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Inter, bundled locally (same as the sim) so the review page needs no
// network font call.
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import ReviewApp from './ReviewApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReviewApp />
  </StrictMode>,
);

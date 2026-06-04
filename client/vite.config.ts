import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes every asset URL relative to index.html. Required for
// the SCORM build path, where the LMS unpacks the package into an
// unpredictable nested URL like /courses/12345/scormcontent/index.html
// and absolute /assets/... paths would 404. Render serves from the
// site root, where relative paths also resolve correctly, so the same
// build artefact ships to both targets.
export default defineConfig({
  base: './',
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// base: './' makes every asset URL relative to index.html. Required for
// the SCORM build path, where the LMS unpacks the package into an
// unpredictable nested URL like /courses/12345/scormcontent/index.html
// and absolute /assets/... paths would 404. Render serves from the
// site root, where relative paths also resolve correctly, so the same
// build artefact ships to both targets.
//
// Two entries: index.html (the sim) and review.html (the internal
// conversation review tool, reachable at /review.html on the Render
// preview). The SCORM build (scripts/build-scorm.mjs) strips review.*
// from dist before zipping, so the review tool never ships to the LMS.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        review: fileURLToPath(new URL('./review.html', import.meta.url)),
      },
    },
  },
})

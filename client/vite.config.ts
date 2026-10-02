import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes every asset URL relative to index.html. Required for
// the Tin Can / xAPI package, where the LMS unpacks the package into an
// unpredictable nested URL and absolute /assets/... paths would 404.
//
// Single entry (index.html). The internal review tool is not part of the
// learner package and is excluded from this build.
export default defineConfig({
  base: './',
  plugins: [react()],
})

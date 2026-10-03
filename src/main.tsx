import { createRoot, hydrateRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import "@github/spark/spark"

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'

import "./main.css"

const root = document.getElementById('root')!
const app = (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
   </ErrorBoundary>
)

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)

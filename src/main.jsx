import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, BrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Connexion from './pages/connexion/Connexion.jsx'
import Inscription from './pages/inscription/Inscription.jsx'
import { Toaster } from 'react-hot-toast'

import { QueryClient, QueryClientProvider } from 'react-query'


const queryClient = new QueryClient()

// creation de l'objet du routage
const router = createBrowserRouter([
  {
    path:'/',
    element:<Dashboard/> 
  },

  {
    path:"/connexion",
    element:<Connexion/>
  },
  {
    path:"/inscription",
    element:<Inscription/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

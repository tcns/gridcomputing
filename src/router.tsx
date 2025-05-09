import App from './App'
import Network from './components/network/Network'
import DashboardView from './components/DashboardView/DashboardView'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'node', element: <DashboardView /> },
      { path: 'stats', element: <Network /> },
      { path: '/', element: <DashboardView /> },
    ],
  },
])

export default router

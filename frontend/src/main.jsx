import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from './containers/NotFound/notFound'
import Start from './containers/Start/start'
import Menu from './containers/Menu/menu'
import Game from './containers/Game/game'
import Summary from './containers/Summary/summary'

import './index.css'
import './shared.scss';

import { UserContextProvider } from "./UserContext"
import { SummaryContext, SummaryContextDefault } from './contexts/SummaryContext';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <Start />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/summary",
    element: <Summary />,
  },
  {
    path: "/game/:categoryId",
    element: <Game />,
  },
]);



createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <SummaryContext.Provider value={SummaryContextDefault}>
      <RouterProvider router={router} />
    </SummaryContext.Provider>
  </UserContextProvider>
)

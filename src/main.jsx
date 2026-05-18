import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout'
import Home from './components/Home/Home'
import './App.css'
import AllIssues from './components/AllIssues/AllIssues';
import AuthProvider from './contexts/AuthProvider';
import Register from './components/Register/Register';
import MyIssues from './components/MyIssues/MyIssues';
import MyContributions from './components/MyContributions/MyContributions';
import IssueDetails from './components/IssueDetails/IssueDetails';
import Login from './components/Login/Login';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allIssues",
        loader: () => fetch('http://localhost:3000/issues'),
        Component: AllIssues,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "myIssues",
        element: <MyIssues></MyIssues>,
      },
      {
        path: "myContributions",
        element: <MyContributions></MyContributions>,
      },
      {
        path: "/issueDetails/:id",
        loader: ({params}) => fetch(`http://localhost:3000/issues/${params.id}`),
        Component: IssueDetails
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

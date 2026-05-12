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
import AddIssue from './components/AddIssue/AddIssue';
import MyIssues from './components/MyIssues/MyIssues';
import MyContributions from './components/MyContributions/MyContributions';

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
        Component: AllIssues,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "addIssue",
        Component: AddIssue,
      },
      {
        path: "myIssues",
        element: <MyIssues></MyIssues>,
      },
      {
        path: "myContributions",
        element: <MyContributions></MyContributions>,
      }
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

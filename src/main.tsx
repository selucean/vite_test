import './index.css'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider as Provider } from 'react-router'
import StoreProvider from '@/components/providers/StoreProvider.tsx'
import LoginForm from '@/pages/LoginForm.tsx'
import Team from '@/pages/Team.tsx'
import Header from '@/components/Header.tsx'

const root = createRoot(document.getElementById("root")!);

const Layout = () => {
  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header/>
      <section className="flex-1 p-4 max-w-[1280px] mx-auto">
        <Outlet />
      </section>
      <footer className="border border-t-gray-200 p-2 text-center">
      </footer>
    </main>
  )
}

export const App = () => {
  const router = createBrowserRouter([
    {
      Component: Layout,
      children: [
        { 
          index: true, 
          element: <LoginForm /> 
        },
        {
          path: "/team",
          element: <Team />,
        }
      ],
    },
  ]);


  return (
    <Provider router={router} />
  );
}

root.render(
  <>
    <StoreProvider>
      <App />
    </StoreProvider>
  </>,
)
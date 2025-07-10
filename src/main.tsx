import './index.css';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider as Provider } from 'react-router';
import StoreProvider from '@/components/providers/StoreProvider';
import LoginPage from '@/pages/LoginPage';
import TeamPage from '@/pages/TeamPage';
import Header from '@/components/Header';

const root = createRoot(document.getElementById("root")!);

const Layout = () => {
  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header/>
      <section className="flex-1 p-4 max-w-[1280px] m-auto">
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
          element: <LoginPage /> 
        },
        {
          path: "/team",
          element: <TeamPage />,
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
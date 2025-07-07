import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider as Provider } from 'react-router'
import './index.css'
import Test from './App.tsx'
import StoreProvider from './components/providers/StoreProvider.tsx'

const root = createRoot(document.getElementById("root")!);

const Layout = () => {
  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <header className="sticky top-0 border border-b-gray-200 text-white p-4 ">
        <h1 className="text-xl"></h1>
      </header>
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
        { index: true, element: <Test /> },
        {
          path: "/team",
          element: <div>Team Page</div>,
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
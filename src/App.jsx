import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/Layout';
import { routes } from '@/config/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map(route => (
            <Route key={route.id} path={route.path} element={<route.component />} />
          ))}
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="border border-surface shadow-lg"
        bodyClassName="text-sm text-primary font-medium"
        style={{ zIndex: 9999 }}
      />
    </BrowserRouter>
  );
}

export default App;
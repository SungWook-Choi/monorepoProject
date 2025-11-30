import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom';
import Layout from './layout.tsx';
import {appRoutes} from './routes/route.tsx';
import Login from './pages/login.tsx';
import RequireAuth from './routes/RequireAuth.tsx';

function App() {
  return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
              <Route path="/" element={<Layout />} >
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  {appRoutes.map((item) => (
                      <Route key={item.id} path={item.to} element={item.element} />
                  ))}
              </Route>
          </Route>
      </Routes>
  )
}

export default App

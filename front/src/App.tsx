import './App.css'
import {Route, Routes} from 'react-router-dom';
import Layout from './layout.tsx';
import {routes} from './routes/route.tsx';

function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout />} >
              {routes.map((item) => {
                  if (item.id === 'home') {
                    return (
                        <Route index element={item.element} />
                    )
                  } else {
                      return (
                        <Route path={item.to} element={item.element} />
                          )
                  }
              })}
          </Route>
      </Routes>
  )
}

export default App

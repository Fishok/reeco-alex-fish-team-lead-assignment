import Navbar from '@/components/Navbar.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import { settingRoute, systemRoutes } from '@/routes';


const App = () => {
  return (
    <div className="flex h-full">
      <div className="w-16">
        <Navbar />
      </div>
      <div className="flex flex-col flex-1 box-border h-full rounded-lg bg-white shadow-lg backdrop-blur-[50px] overflow-hidden p-2">
        <Routes>
          {[...systemRoutes, settingRoute].map(({root, component}) => {
            return  <Route key={root} path={root} element={component} />
          })}
          <Route
            path="*"
            element={
              <Navigate to={"/users"} replace />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
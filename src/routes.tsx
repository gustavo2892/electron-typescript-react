import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';

import LayoutGlobal from './layout/LayoutGlobal';
import Home from './pages/Home';
import Login from './pages/Login';

const DefaultRoute = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <LayoutGlobal />
          }
        >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default DefaultRoute;

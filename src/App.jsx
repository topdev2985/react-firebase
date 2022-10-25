import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';


// custom pages
import PictureList from './pages/PictureList';
import PictureDetail from './pages/PictureDetail';
import PictureSubmitted from './pages/PictureSubmited';
import FireApp from './pages/fire/FireApp';

function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/" element={<PictureList />} />
        <Route path='/picdetail/:id' element={<PictureDetail />} />
        <Route path='/submit' element={<PictureSubmitted />} />
        <Route path='/fire' element={<FireApp />} />
      </Routes>
    </>
  );
}

export default App;

// App.js
import { Routes, Route } from 'react-router-dom';
import TestPage1 from './pages/TestPage1';
import TestPage2 from './pages/TestPage2';
import TestPage3 from './pages/TestPage3';

const App = () => {
 return (
    <>
       <Routes>
         <Route path="/music/test1" element={<TestPage1 />} />
         <Route path="/music/test2" element={<TestPage2 />} />
         <Route path="/music/test3" element={<TestPage3 />} />
       </Routes>
    </>
 );
};

export default App;
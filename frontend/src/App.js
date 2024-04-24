// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage1 from './pages/TestPage1';
import TestPage2 from './pages/TestPage2';
import TestPage3 from './pages/TestPage3';

const App = () => {
 return (
    <BrowserRouter basename="/music/test-react-page"> {/* Specify the basename here */}
       <Routes>
         <Route path="/1" element={<TestPage1 />} />
         <Route path="/2" element={<TestPage2 />} />
         <Route path="/3" element={<TestPage3 />} />
       </Routes>
    </BrowserRouter>
 );
};

export default App;
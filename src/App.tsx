
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JSXConverterPage from './features/jsxConverter/JsxConverterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JSXConverterPage />} />
      </Routes>
    </Router>
  );
}

export default App;

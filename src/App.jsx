import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Search from './pages/Search';
import BookDetails from './pages/BookDetails';
import MyList from './pages/MyList';

function App() {
  return (
    <>
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/list" element={<MyList />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
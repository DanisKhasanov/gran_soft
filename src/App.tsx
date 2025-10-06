import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { store } from './store';
import { Header, Sidebar } from './components/layout';
import Dashboard from './pages/Dashboard';
import Trading from './pages/Trading';
import Profile from './pages/Profile';
import './App.css';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="flex">
              <Sidebar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/trading" element={<Trading />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}

export default App

import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { store, type RootState } from './store';
import { Header, Sidebar } from './components/layout';
import { closeSidebar } from './store/modalSlice';
import Dashboard from './pages/Dashboard';
import Trading from './pages/Trading';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';

function AppContent() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const handleMainClick = () => {
    if (window.innerWidth < 1024 && isSidebarOpen) {
      dispatch(closeSidebar());
    }
  };

  return (
    <Router>
      <div className="h-screen flex flex-col overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main
            className="flex-1 overflow-y-auto bg-gray-50 p-6"
            onClick={handleMainClick}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trading" element={<Trading />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <AppContent />
      </SnackbarProvider>
    </Provider>
  );
}

export default App;

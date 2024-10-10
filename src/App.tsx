import { useEffect } from 'react';
import './App.css';
import ThumbnailFeedback from '@/components/ThumbnailFeedback/ThumbnailFeedback.tsx';

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground dark:text-muted-foreground">
      <ThumbnailFeedback apiUrl={apiUrl} />
    </div>
  );
}

export default App;

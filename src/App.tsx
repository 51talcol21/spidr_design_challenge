import './App.css';
import FeedbackForm from './components/FeedbackForm';

function App() {
  function onSubmit() {
    return;
  }

  return (
    <>
    <FeedbackForm onSubmit={onSubmit}/>
    </>
  )
}

export default App

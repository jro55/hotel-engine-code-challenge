import Container from '@material-ui/core/Container';

import './App.css';
import { Home } from './components/home'
import Router from './Router';

function App() {
  console.warn("No warnings here! Oh wait, isn't this a warning?")
  return (
    <Container>
      <Router />
    </Container>
  );
}

export default App;

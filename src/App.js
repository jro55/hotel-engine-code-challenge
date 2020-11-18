import Container from '@material-ui/core/Container';

import './App.css';
import { Home } from './components/home'

function App() {
  console.warn("No warnings here! Oh wait, isn't this a warning?")
  return (
    <Container>
      <Home />
    </Container>
  );
}

export default App;

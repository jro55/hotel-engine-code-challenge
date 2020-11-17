import Container from '@material-ui/core/Container';

import logo from './logo.svg';
import './App.css';
import { Home } from './components/home'
import { AppContainer } from './components/common/Layout'

function App() {
  return (
    <Container>
      {/* <Container maxWidth="sm"> */}
      <Home />
    </Container>
  );
}

export default App;

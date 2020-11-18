import Container from '@material-ui/core/Container';

import './App.css';
import Router from './Router';
import { RepositoryProvider } from './data/RepositoryContext';

function App() {
	console.warn("No warnings here! Oh wait, isn't this a warning?");
	return (
		<Container>
			<RepositoryProvider>
				<Router />
			</RepositoryProvider>
		</Container>
	);
}

export default App;

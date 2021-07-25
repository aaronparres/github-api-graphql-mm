import { Route, Switch, Redirect } from 'react-router-dom';

import Issues from 'components/Issues';
import Search from 'components/Search';
import IssueDetail from 'components/IssueDetail';
import Navbar from 'components/Layout/Navbar';
import Footer from 'components/Layout/Footer';

import styles from './App.module.scss';

export default function App() {
	return (
		<div style={{ width: '100%' }}>
			<Navbar />
			<div className={styles.container}>
				<Switch>
					<Route exact path="/issue/:number" component={IssueDetail} />
					<Route exact path="/search" component={Search} />
					<Route exact path="/" component={Issues} />
					<Redirect to="/" />
				</Switch>
			</div>
			<Footer />
		</div>
	);
}

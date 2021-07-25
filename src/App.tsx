import { Route, Switch, Redirect } from 'react-router-dom';

import IssuesList from 'components/IssuesList';
import Search from 'components/Search';
import IssueDetail from 'components/IssueDetail';
import Navbar from 'components/Layout/Navbar';
import Footer from 'components/Layout/Footer';

import './App.scss';

export default function App() {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route exact path="/issue/:number" component={IssueDetail} />
				<Route exact path="/search" component={Search} />
				<Route exact path="/" component={IssuesList} />
				<Redirect to="/" />
			</Switch>
			<Footer />
		</div>
	);
}

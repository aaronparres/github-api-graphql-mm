import { Route, Switch, Redirect } from 'react-router-dom';
import { isErrorModalShown, isLoading } from 'store/slices/settings';
import { useAppSelector } from 'hooks/redux';

import Issues from 'components/Issues';
import Search from 'components/Search';
import IssueDetail from 'components/IssueDetail';
import Navbar from 'components/Layout/Navbar';
import Footer from 'components/Layout/Footer';

import styles from './App.module.scss';
import Spinner from 'components/UI/Spinner';
import Modal from 'components/UI/Modal';

export default function App() {
	const loading = useAppSelector(isLoading);
	const error = useAppSelector(isErrorModalShown);
	return (
		<div className={styles.app}>
			<Navbar />
			<div className={styles.container}>
				<Switch>
					<Route exact path="/issue/:number" component={IssueDetail} />
					<Route exact path="/search" component={Search} />
					<Route exact path="/" component={Issues} />
					<Redirect to="/" />
				</Switch>
				{loading && <Spinner />}
				{error && <Modal />}
			</div>
			<Footer />
		</div>
	);
}

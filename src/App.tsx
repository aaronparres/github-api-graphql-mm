import './App.scss';
import { useGetRepoIssuesQuery } from 'hooks/apihooks';

function App() {
	const { data, error, loading } = useGetRepoIssuesQuery({
		variables: { name: 'react', owner: 'facebook' },
	});
	return (
		<div className="container">
			{loading ? (
				<>Loading...</>
			) : error ? (
				<>{error}</>
			) : data?.repository?.issues?.nodes?.length ? (
				<>
					{data?.repository?.issues?.nodes?.map((issue, index) => (
						<div key={index}>{issue?.title}</div>
					))}
				</>
			) : null}
		</div>
	);
}

export default App;

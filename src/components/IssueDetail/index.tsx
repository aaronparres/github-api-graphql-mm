import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetIssueInfoQuery } from 'hooks/apihooks';
import { useAppDispatch } from 'hooks/redux';
import { changeLoadingValue, showErrorModal } from 'store/slices/settings';

import './styles.scss';

interface ParamTypes {
	number: string;
}

export default function IssueDetail() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const dispatch = useAppDispatch();
	const { number } = useParams<ParamTypes>();
	const { data, error, loading } = useGetIssueInfoQuery({
		fetchPolicy: 'cache-and-network',
		variables: { name: 'react', owner: 'facebook', number: +number },
	});

	useEffect(() => {
		dispatch(changeLoadingValue(loading));
	}, [loading]);

	useEffect(() => {
		if (error == undefined) return;
		dispatch(showErrorModal(true));
	}, [error]);

	return (
		<div className="detail-container">
			{data?.repository?.issue ? (
				<div className="detail-content">
					<p>{data?.repository?.issue?.title}</p>
					<p>{data?.repository?.issue?.number}</p>
					<p>{data?.repository?.issue?.author?.login}</p>
					<div
						className="markdown-body"
						dangerouslySetInnerHTML={{
							__html: data?.repository?.issue?.bodyHTML,
						}}
					/>
					<h3>Comments</h3>
					{data?.repository?.issue?.comments?.edges?.length
						? data?.repository?.issue?.comments?.edges?.map((comment) => (
								<div
									key={comment?.node?.id}
									className="markdown-body"
									dangerouslySetInnerHTML={{
										__html: comment?.node?.bodyHTML,
									}}
								/>
						  ))
						: 'No comments yet'}
				</div>
			) : null}
		</div>
	);
}

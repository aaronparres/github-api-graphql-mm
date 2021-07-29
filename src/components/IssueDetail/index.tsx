import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetIssueInfoQuery } from 'hooks/apihooks';
import { useAppDispatch } from 'hooks/redux';
import { changeLoadingValue, showErrorModal } from 'store/slices/settings';
import { dateFormatter } from 'shared/utils/dateFormatter';

import StatusBadge from 'components/UI/StatusBadge';

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
				<>
					<div className="detail-content">
						<div className="detail-header">
							<div className="top-status">
								<p className="number"># {data?.repository?.issue?.number}</p>
								<StatusBadge state={data?.repository?.issue?.state} />
							</div>
							<h2>{data?.repository?.issue?.title}</h2>
							<div className="user">
								<div className="user-profile">
									<img
										src={data?.repository?.issue?.author?.avatarUrl}
										alt={data?.repository?.issue?.author?.login}
									/>
									<a href={data.repository.issue.author?.url}>
										<p className="name">
											{data?.repository?.issue?.author?.login}
										</p>
									</a>
								</div>
								<p>
									{`opened ${dateFormatter(
										String(data.repository.issue.createdAt),
									)}`}
								</p>
							</div>
						</div>
						<div
							className="markdown-body"
							dangerouslySetInnerHTML={{
								__html: data?.repository?.issue?.bodyHTML,
							}}
						/>
					</div>
					<div className="comment-section">
						<h2>Comments</h2>
						{data?.repository?.issue?.comments?.edges?.length ? (
							data?.repository?.issue?.comments?.edges?.map((comment) => (
								<div key={comment?.node?.id} className="detail-content comment">
									<div className="detail-header comment">
										<div className="user comment">
											<div className="user-profile">
												<img
													src={comment?.node?.author?.avatarUrl}
													alt={comment?.node?.author?.login}
												/>
												<a href={comment?.node?.author?.url}>
													<p className="name">{comment?.node?.author?.login}</p>
												</a>
											</div>
											<p>
												{`commented ${dateFormatter(
													String(comment?.node?.publishedAt),
												)}`}
											</p>
										</div>
									</div>
									<div
										className="markdown-body"
										dangerouslySetInnerHTML={{
											__html: comment?.node?.bodyHTML,
										}}
									/>
								</div>
							))
						) : (
							<h3>No comments yet</h3>
						)}
					</div>
				</>
			) : null}
		</div>
	);
}

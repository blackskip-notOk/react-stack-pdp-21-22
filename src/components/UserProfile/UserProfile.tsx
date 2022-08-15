import { FC, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { DefaultAvatar } from '../common/avatar/avatar';
// import { useGetProfile, useGetProfileStatus } from '~/api/profileApi';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorMessage } from '../common/Error/Error';
import { Loader } from '../common/loader/Loader';

export const UserProfile: FC = () => {
	const params = useParams();

	// const { data, error, isError, isFetching, isLoading, isRefetching, isSuccess } = useGetProfile(
	// 	params.userId,
	// );

	// const { data: userStatus } = useGetProfileStatus(Number(params.userId));

	// if (isLoading || isFetching || isRefetching) {
	// 	return <Loader />;
	// }

	// if (isError) {
	// 	return <ErrorMessage error={error} />;
	// }

	return (
		<ErrorBoundary fallbackRender={({ error }) => <ErrorMessage error={error} />}>
			<Suspense fallback={<Loader />}>
				{/* {isSuccess && ( */}
				<div>
					{/* {data.photos.large ? (
	 						<Avatar alt='user avatar' src={data.photos.large} />
	 					) : (
	 						<DefaultAvatar />
	 					)}
	 					<div>{data.fullName}</div>
	 					<div>{userStatus}</div>
	 					<div>{data.aboutMe}</div>
	 					<div>{data.lookingForAJobDescription}</div>
	 					<div>{data.contacts.facebook}</div>
	 					<div>{data.contacts.website}</div>
	 					<div>{data.contacts.vk}</div>
	 					<div>{data.contacts.twitter}</div>
	 					<div>{data.contacts.instagram}</div>
	 					<div>{data.contacts.youtube}</div>
	 					<div>{data.contacts.github}</div>
	 					<div>{data.contacts.mainLink}</div> */}
				</div>
				{/* )} */}
			</Suspense>
		</ErrorBoundary>
	);
};

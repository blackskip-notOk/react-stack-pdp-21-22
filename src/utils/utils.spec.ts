import { FollowResponse } from '~/store/slices/usersSlice/types';
import { Description, ServerMessage } from '~/constants/serverMessages';
import { getFollowResult } from '.';

describe('app utils functions', () => {
	describe('getFollowResult util', () => {
		const resultSuccess: FollowResponse = {
			messages: [],
			resultCode: 0,
			data: {},
		};

		const resultFollowFailed: FollowResponse = {
			messages: [ServerMessage.alreadyFollow],
			resultCode: 1,
			data: {},
		};

		const resultUnFollowFailed: FollowResponse = {
			messages: [ServerMessage.alreadyUnfollow],
			resultCode: 1,
			data: {},
		};

		const resultFailed: FollowResponse = {
			messages: [],
			resultCode: 10,
			data: {},
		};

		const userName = 'test user';
		const successMessageFollow = `${Description.successFollow} ${userName}`;
		const unSuccessMessageFollow = Description.alreadyFollow;
		const successMessageUnFollow = `${Description.successUnFollow} ${userName}`;
		const unSuccessMessageUnFollow = Description.alreadyUnFollow;

		const follow = true;
		const unfollow = false;

		it('if response is undefined, should return failed answer', () => {
			expect(getFollowResult(undefined, userName, follow)).toStrictEqual({
				isSuccess: false,
				message: Description.someError,
			});

			expect(getFollowResult(undefined, userName, unfollow)).toStrictEqual({
				isSuccess: false,
				message: Description.someError,
			});
		});

		it('if follow to new user success, should return answer with success message', () => {
			expect(getFollowResult(resultSuccess, userName, follow)).toStrictEqual({
				isSuccess: true,
				message: successMessageFollow,
			});
			expect(
				getFollowResult({ ...resultSuccess, messages: ['any test message'] }, userName, follow),
			).toStrictEqual({
				isSuccess: true,
				message: successMessageFollow,
			});
		});

		it('if unfollow from user success, should return answer with success message', () => {
			expect(getFollowResult(resultSuccess, userName, unfollow)).toStrictEqual({
				isSuccess: true,
				message: successMessageUnFollow,
			});
			expect(
				getFollowResult({ ...resultSuccess, messages: ['any test message'] }, userName, unfollow),
			).toStrictEqual({
				isSuccess: true,
				message: successMessageUnFollow,
			});
		});

		it('if already follow to user, should return answer with error message', () => {
			expect(getFollowResult(resultFollowFailed, userName, follow)).toStrictEqual({
				isSuccess: false,
				message: unSuccessMessageFollow,
			});
		});

		it('if already unfollow from user, should return answer with error message', () => {
			expect(getFollowResult(resultUnFollowFailed, userName, unfollow)).toStrictEqual({
				isSuccess: false,
				message: unSuccessMessageUnFollow,
			});
		});

		it('if unexpectable error occur, shoult return error message', () => {
			expect(getFollowResult(resultFailed, userName, follow)).toEqual({
				isSuccess: false,
				message: Description.someError,
			});
			expect(getFollowResult(resultFailed, userName, unfollow)).toEqual({
				isSuccess: false,
				message: Description.someError,
			});
		});
	});
});

// export const getFollowResult = (
//     response: FollowResponse | undefined,
//     user: string,
//     isFollow: boolean,
// ): FollowResult => {

//     const { messages, resultCode } = response;

//     const successMessage = `${
//         isFollow ? Description.successFollow : Description.successUnFollow
//     } ${user}`;

//     const unSuccessMessage = `${isFollow ? Description.alreadyFollow : Description.alreadyUnFollow}`;

//     if (resultCode === ReultCode.success) {
//         return {
//             isSuccess: true,
//             message: successMessage,
//         };
//     }
//     if (resultCode === ReultCode.error) {
//         const errorMessage =
//             messages.join() === (ServerMessage.alreadyUnfollow || ServerMessage.alreadyFollow)
//                 ? unSuccessMessage
//                 : Description.someError;

//         return {
//             isSuccess: false,
//             message: errorMessage,
//         };
//     }
//     return {
//         isSuccess: false,
//         message: Description.someError,
//     };

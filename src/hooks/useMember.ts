import { useRouter } from 'next/router';
import { shallowEqual } from 'react-redux';

import { useAppDispatch, useTypedSelector } from 'state/store';
import { reset } from 'state/slices/memberSlice';
import { authentication } from 'api/auth';
import { shopbyTokenStorage } from 'utils/storage';
import PATHS from 'const/paths';

const useMember = () => {
    const router = useRouter();

    const dispatch = useAppDispatch();

    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    const onLoginClick = () => router.push(PATHS.LOGIN);

    const onLogOutClick = async () => {
        try {
            await authentication.deleteAccessToken();
            shopbyTokenStorage.clear();
            dispatch(reset());
        } catch (error) {
            // TODO: ERROR 처리 필요
        }
        window.location.href = PATHS.MAIN;
    };

    return { member, onLoginClick, onLogOutClick };
};

export default useMember;

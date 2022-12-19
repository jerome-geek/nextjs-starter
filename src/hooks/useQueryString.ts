import { useRouter } from 'next/router';
import qs from 'qs';

const useQueryString = () => {
    const router = useRouter();

    const { search } = router.query as { search: string };

    const query = qs.parse(search, {
        ignoreQueryPrefix: true,
    });

    return query;
};

export default useQueryString;

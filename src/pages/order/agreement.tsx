import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { every, find, map, pipe, toArray } from '@fxts/core';

import Checkbox from 'components/Input/Checkbox';
import { useOrderSheetMutation } from 'hooks/mutations';

const Container = styled.main`
    width: 100%;
    padding: 24px 24px;
`;

const SubTitle = styled.h3`
    font-size: 1.666rem;
    font-weight: 500;
    letter-spacing: -1px;
    line-height: 29px;
    margin-bottom: 12px;
`;

const Description = styled.p`
    letter-spacing: -0.48px;
    line-height: 18px;
    color: #000;
    margin-bottom: 62px;
`;

const AgreeAllButtonContainer = styled.div`
    padding-bottom: 22.5px;
    line-height: 20px;
    font-size: 1.1666rem;
    font-weight: bold;
    letter-spacing: 0;
    border-bottom: ${(props) => `1px solid ${props.theme.line2}`};
    margin-bottom: 21.5px;
    display: flex;
    > div {
        margin-right: 10px;
    }
`;

const AgreeButtonListContainer = styled.ul`
    margin-bottom: 80px;
`;

const AgreeButtonList = styled.li`
    display: flex;
    font-weight: 500;
    letter-spacing: 0px;
    font-size: 1.1666rem;
    line-height: 20px;
    text-decoration: underline;
    margin-bottom: 28px;
    &:last-child {
        margin-bottom: 0;
    }
    > div {
        margin-right: 10px;
    }
`;

const GoTermContentPage = styled(Link)``;

const GoSheetButton = styled.button`
    display: block;
    width: 100%;
    font-size: 1.333rem;
    color: #fff;
    background: ${(props) => props.theme.secondary};
    padding: 15px 0;
    line-height: 24px;
    text-align: center;
    font-weight: bold;
`;

interface TermsType {
    id: string;
    title: string;
    isChecked: boolean;
    path: string;
}

interface LocationState {
    cartNos: string;
    products: string;
}

const OrderAgreement = () => {
    const [termList, setTermList] = useState<TermsType[]>([
        {
            id: 'agreeOrderService',
            isChecked: false,
            title: '????????? ????????????',
            path: '',
        },
        {
            id: 'agreeOrderPrivacy',
            isChecked: false,
            title: '???????????? ????????????',
            path: '',
        },
    ]);

    const router = useRouter();

    const { cartNos, products } = router.query as unknown as LocationState;

    const agreeAllHandler = (checked: boolean) => {
        setTermList((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isChecked: checked })),
                toArray,
            ),
        );
    };

    const agreeHandler = (term: string) => {
        setTermList((prev) =>
            pipe(
                prev,
                map((a) =>
                    a.id === term ? { ...a, isChecked: !a.isChecked } : a,
                ),
                toArray,
            ),
        );
    };

    const isAllOrderTermsChecked = useMemo(
        () =>
            pipe(
                termList,
                every((b) => b.isChecked),
            ),
        [termList],
    );

    const isTermChecked = (id: string) =>
        find((a) => a.id === id, termList)?.isChecked;

    const orderSheetMutation = useOrderSheetMutation();

    const onPurchaseButtonClick = async () => {
        if (isAllOrderTermsChecked) {
            await orderSheetMutation.mutateAsync({
                products: JSON.parse(products),
                productCoupons: [],
                cartNos: cartNos ? JSON.parse(cartNos) : [],
                trackingKey: '',
                channelType: '',
            });
        } else {
            alert('????????? ????????? ???????????? ?????????!');
        }
    };

    return (
        <>
            <Container>
                <SubTitle>????????? ?????? ????????? ???????????????.</SubTitle>
                <Description>
                    ??????????????? ????????? ???????????????
                    <br />
                    ?????????????????? ?????? ??? ????????? ????????? ????????? ??? ????????????.
                </Description>
                <AgreeAllButtonContainer>
                    <Checkbox
                        shape='square'
                        checked={isAllOrderTermsChecked}
                        onClick={(e) =>
                            agreeAllHandler(e.currentTarget.checked)
                        }
                    />
                    <p>?????? ??????</p>
                </AgreeAllButtonContainer>
                <AgreeButtonListContainer>
                    {termList.map(({ id, title, path }) => {
                        return (
                            <AgreeButtonList key={id}>
                                <Checkbox
                                    shape='square'
                                    checked={isTermChecked(id)}
                                    onClick={() => agreeHandler(id)}
                                />
                                <GoTermContentPage href={path}>
                                    {title}
                                </GoTermContentPage>
                            </AgreeButtonList>
                        );
                    })}
                </AgreeButtonListContainer>
                <GoSheetButton onClick={onPurchaseButtonClick}>
                    ??????
                </GoSheetButton>
            </Container>
        </>
    );
};

export default OrderAgreement;

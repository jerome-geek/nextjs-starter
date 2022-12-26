import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import OriginalRegisterButton from 'components/Button/OriginalRegisterButton';
import ViewAllButton from 'components/Button/ViewAllButton';
import ActivativeProductCard from 'components/Card/ActivativeProductCard';
import PATHS from 'const/paths';
import AngleRightBlack from 'assets/icons/angle_right_black_middle.svg';
import { activationProducts } from 'mock/activationProducts';

const MyGoodsSummaryContainer = styled.div``;

const MyGoodsTitle = styled.h2`
    font-size: 18px;
    color: #000000;
    text-align: left;
    letter-spacing: 0;
    cursor: pointer;
`;

const NoGoodsContainer = styled.div`
    background: #f8f8fa 0% 0% no-repeat padding-box;
    border: 4px solid #f8f8fa;
    opacity: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 35px;

    & > p {
        font-size: 16px;
        margin-bottom: 16px;
        text-align: center;
        letter-spacing: 0px;
        color: #999999;
    }
`;

const NoGoodsLink = styled(Link)`
    font-size: 12px;
    text-align: center;
    letter-spacing: 0px;
    color: #191919;
    text-decoration: underline;
`;

const MyGoodsSummary = ({ myGoods, setIsGenuineRegisterModal }: any) => {
    const router = useRouter();

    return (
        <MyGoodsSummaryContainer>
            <div style={{ marginBottom: '20px' }}>
                <MyGoodsTitle onClick={() => router.push(PATHS.MY_PRODUCTS)}>
                    보유중인 제품 <AngleRightBlack />
                </MyGoodsTitle>
            </div>

            {myGoods.length > 0 ? (
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <OriginalRegisterButton
                            title='정품 등록하기'
                            onClick={() => {
                                setIsGenuineRegisterModal(true);
                            }}
                        />
                    </div>

                    {activationProducts.slice(0, 2).map((product) => {
                        return (
                            <div
                                style={{ flex: 1, marginRight: '10px' }}
                                key={product.id}
                            >
                                <ActivativeProductCard
                                    productName={product.productName}
                                    activationCode={product.activationCode}
                                    imgUrl={product.imgUrl}
                                />
                            </div>
                        );
                    })}

                    <div style={{ flex: 0.5 }}>
                        <ViewAllButton
                            style={{ width: '100%', height: '100%' }}
                            onClick={() => router.push(PATHS.MY_PRODUCTS)}
                        />
                    </div>
                </div>
            ) : (
                <NoGoodsContainer>
                    <p>보유 중인 제품이 없습니다. </p>
                    <p>정품 등록하고 다양한 혜택을 받아보세요 :)</p>
                    <NoGoodsLink href='/'>확인하러 가기</NoGoodsLink>
                </NoGoodsContainer>
            )}
        </MyGoodsSummaryContainer>
    );
};

export default MyGoodsSummary;

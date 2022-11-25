import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import Modal, { ModalDefaultType } from 'components/Modal/Modal';
import PATHS from 'const/paths';
import { OrderSheetBody } from 'models/order';

const ModalContainer = styled.div`
    width: 100%;
    padding: 37px 25px;
    text-align: center;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h3`
    font-weight: bold;
    font-size: 1.666rem;
    letter-spacing: -1px;
    line-height: 29px;
    margin-bottom: 20px;
`;

const Description = styled.p`
    font-size: 0.8333rem;
    letter-spacing: -0.4px;
    line-height: 15px;
    margin-bottom: 20px;
    color: #8f8f8f;
`;

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    > * {
        display: block;
        width: 48%;
        font-size: 1.333rem;
        line-height: 24px;
        padding: 15px;
        font-weight: bold;
        letter-spacing: -0.8px;
    }
`;

const GuestPurchase = styled(Link)`
    border: ${(props) => `1px solid ${props.theme.line2}`};
`;

const MemberPurchase = styled(Link)`
    background: ${(props) => props.theme.secondary};
    color: #fff;
`;

const MemberInduceModal = ({
    width,
    onClickToggleModal,
    cartNos,
    products,
}: Pick<OrderSheetBody, 'cartNos' | 'products'> & ModalDefaultType) => {
    const router = useRouter();

    return (
        <Modal width={width} onClickToggleModal={onClickToggleModal}>
            <ModalContainer>
                <Title>
                    로그인 후 주문하면
                    <br />
                    회원가입 축하 3,000원 쿠폰 제공!
                </Title>
                <Description>
                    비회원으로 구매하시면 보이스캐디의 다양한 적립금과
                    <br />
                    쿠폰 혜택을 받으실 수 없습니다.
                </Description>
                <ButtonContainer>
                    <GuestPurchase
                        href={{
                            pathname: PATHS.ORDER_AGREE,
                            query: {
                                cartNos: JSON.stringify(cartNos),
                                products: JSON.stringify(products),
                            },
                        }}
                    >
                        비회원 구매
                    </GuestPurchase>
                    <MemberPurchase
                        href={`${PATHS.LOGIN}?returnUrl=${location.pathname}`}
                    >
                        회원 구매
                    </MemberPurchase>
                </ButtonContainer>
            </ModalContainer>
        </Modal>
    );
};

export default MemberInduceModal;

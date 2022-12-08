import styled from 'styled-components';

const ProductCardWrapper = styled.div`
    width: 250px;
    background: #f8f8fa 0% 0% no-repeat padding-box;
    box-shadow: 2px 2px 4px #0000001a;
    opacity: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const ProductCardTop = styled.div`
    flex: 1 1 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const ProductCardBottom = styled.div``;

const ProductCardTitle = styled.p`
    text-align: left;
    letter-spacing: 0pt;
    color: #191919;
    opacity: 1;
    font-size: 20px;
`;

const ProductCardDesc = styled.p`
    text-align: left;
    letter-spacing: 0pt;
    color: #999999;
    opacity: 1;
    font-size: 10px;
    padding-top: 2px;
`;

const GenuineProductCard = () => {
    return (
        <ProductCardWrapper>
            <ProductCardTop>
                <img
                    src='//rlyfaazj0.toastcdn.net/20220623/164839.485302000/thumb-1583508427_3492_vc4_298x436.png'
                    style={{ width: '75%', objectFit: 'scale-down' }}
                    alt='VC4'
                />
            </ProductCardTop>
            <ProductCardBottom
                style={{
                    padding: '14px 16px',
                    background: '#F0F0F3 0% 0% no-repeat padding-box',
                    width: '100%',
                    height: '85px',
                }}
            >
                <ProductCardTitle>CL2 Green</ProductCardTitle>
                <ProductCardDesc>
                    시리얼 번호 : E79051HON232123232
                </ProductCardDesc>
            </ProductCardBottom>
        </ProductCardWrapper>
    );
};

export default GenuineProductCard;

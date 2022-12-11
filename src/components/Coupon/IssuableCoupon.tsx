import { FC } from 'react';
import styled from 'styled-components';

import Button from 'components/Button/Button';
import Logo from 'assets/logo/headerLogo.svg';
import Download from 'assets/icons/download.svg';
import { KRW } from 'utils/currency';

interface IssuableCouponProps {
    isDownloadable?: boolean;
    couponName?: string;
    discountAmt?: number;
    discountRate?: number;
    useEndYmdt?: Date | string;
    fixedAmt?: boolean;
    onDownload?: () => void;
}

const IssuableCouponContainer = styled.div`
    border: 0.5px solid #dbdbdb;
    max-width: 270px;
    min-height: 80px;
    display: flex;
    justify-content: space-between;
`;

const Test1 = styled.div`
    padding: 14px 10px 14px 20px;
    flex: 4;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const DownloadButton = styled(Button)`
    background-color: rgba(219, 219, 219, 0.13);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    & > svg {
        color: #191919;
        margin-bottom: 8px;
    }

    & > span {
        font-size: 8px;
        line-height: 12px;
        letter-spacing: -0.32px;
        color: #191919;
    }
`;

const CouponPrice = styled.span`
    font-size: 24px;
    line-height: 30px;
    letter-spacing: -0.96px;
    font-weight: bold;
    color: #191919;
`;

const CouponName = styled.span`
    font-size: 10px;
    line-height: 16px;
    letter-spacing: -0.4px;
    font-weight: bold;
`;

const CouponLimit = styled.span`
    font-size: 6px;
    letter-spacing: 0;
    color: #999999;
`;

const IssuableCoupon: FC<IssuableCouponProps> = ({
    isDownloadable = false,
    couponName = '',
    discountAmt = 0,
    discountRate,
    useEndYmdt,
    fixedAmt,
    onDownload,
    ...props
}) => {
    const onDownloadButtonClick = () => {
        if (isDownloadable && onDownload) {
            onDownload();
        }
    };

    return (
        <IssuableCouponContainer {...props}>
            <Test1>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                    }}
                >
                    <Logo style={{ width: '54px' }} />
                    <CouponPrice>
                        {fixedAmt
                            ? discountRate
                            : KRW(discountAmt).format({
                                  symbol: '',
                                  precision: 0,
                              })}
                    </CouponPrice>
                    <CouponName>{couponName}</CouponName>
                </div>

                {useEndYmdt && (
                    <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <CouponLimit>
                            {`${useEndYmdt} 까지 사용 가능`}
                        </CouponLimit>
                    </div>
                )}
            </Test1>

            {/* TODO: isDownloadable === false -> disabled */}
            <DownloadButton onClick={onDownloadButtonClick}>
                <Download />
                <span>다운로드</span>
            </DownloadButton>
        </IssuableCouponContainer>
    );
};

export default IssuableCoupon;

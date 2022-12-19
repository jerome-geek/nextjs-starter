import { FC } from 'react';
import styled from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import StyledInput from 'components/Input/StyledInput';
import media from 'utils/styles/media';
import { PaymentReserve } from 'models/order';

interface AdditionalInfoProps {
    register: UseFormRegister<PaymentReserve>;
    errors: FieldErrors<PaymentReserve>;
    isRequireCustomsIdNumber: boolean;
}

const StyledContainer = styled.div`
    margin-bottom: 60px;
`;

const Title = styled.h3`
    font-size: 24px;
    letter-spacing: -1.2px;
    line-height: 36px;
    font-weight: bold;
    color: #191919;
    margin-bottom: 20px;

    ${media.medium} {
        font-size: 18px;
        letter-spacing: -0.72px;
    }
`;

const ContentList = styled.ul`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
    padding: 30px 0;
`;

const ContentListItem = styled.li`
    display: flex;
    align-items: center;

    ${media.medium} {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const ListItemTitle = styled.p`
    width: 100%;
    max-width: 200px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
    color: #191919;

    ${media.medium} {
        margin-bottom: 10px;
        margin-left: 10px;
        letter-spacing: -0.64px;
    }
`;

const InfoInput = styled(StyledInput)`
    letter-spacing: -0.64px;
    font-weight: 400;
    height: 44px;
    padding: 0 20px;
    min-height: 44px;
    border: 1px solid #dbdbdb;
    color: #191919;
    width: 100%;
    max-width: 330px;
`;

const AdditionalInfoErrorMessage = styled(StyledErrorMessage)`
    margin-left: 200px;

    ${media.medium} {
        margin-left: 0;
    }
`;

const AdditionalInfo: FC<AdditionalInfoProps> = ({
    register,
    errors,
    isRequireCustomsIdNumber,
}) => {
    return (
        <StyledContainer>
            <Title>추가정보</Title>

            <ContentList>
                <ContentListItem>
                    <ListItemTitle>[필수]개인통관고유부호</ListItemTitle>
                    <InfoInput
                        type='text'
                        {...register('shippingAddress.customIdNumber', {
                            required: {
                                value: isRequireCustomsIdNumber,
                                message: '개인통관부호를 입력해주세요.',
                            },
                            pattern: {
                                value: /^[p|P][1-6]{1}[0-9]{11}$/,
                                message:
                                    '개인통관고유부호가 유효하지 않습니다.',
                            },
                        })}
                    />
                </ContentListItem>
                <ErrorMessage
                    errors={errors}
                    name='shippingAddress.customIdNumber'
                    render={({ message }) => (
                        <AdditionalInfoErrorMessage>
                            {message}
                        </AdditionalInfoErrorMessage>
                    )}
                />
            </ContentList>
        </StyledContainer>
    );
};

export default AdditionalInfo;

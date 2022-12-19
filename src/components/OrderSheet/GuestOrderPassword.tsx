import { FC, useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';

import StyledInput from 'components/Input/StyledInput';
import StyledErrorMessage from 'components/Common/StyledErrorMessage';
import { isMobile } from 'utils/styles/responsive';
import media from 'utils/styles/media';
import { PaymentReserve } from 'models/order';

interface GuestOrderPasswordProps {
    register: UseFormRegister<PaymentReserve>;
    errors: FieldErrors<PaymentReserve>;
}

const PasswordInput = styled(StyledInput)`
    letter-spacing: -0.64px;
    font-weight: 400;
    height: 44px;
    padding: 0 20px;
    min-height: 44px;
    border: 1px solid ${(props) => props.theme.line2};
    color: ${(props) => props.theme.text3};
    width: 100%;
    max-width: 440px;

    &::placeholder {
        font-weight: normal;
        color: ${(props) => props.theme.text3};
    }
    &:disabled {
        cursor: not-allowed;
        pointer-events: all !important;
    }
    ${media.medium} {
        margin-bottom: 0;
        padding: 15px 20px;
        min-height: 54px;
        &::placeholder {
            font-size: 1rem;
        }
    }
    ${media.small} {
        &::placeholder {
            font-size: 16px;
            line-height: 24px;
            color: #a8a8a8;
        }
    }
`;

const GuestOrderPasswordContainer = styled.section``;
const GuestOrderTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
`;

const GuestOrderTitle = styled.h3`
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

const GuestOrderDesc = styled.span`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
    color: #8f8f8f;
    margin-bottom: 10px;

    ${media.medium} {
        font-size: 14px;
        line-height: 20px;
        font-weight: normal;
        margin-left: 10px;
    }
`;

const PasswordContainer = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;

    ${media.medium} {
        padding: 20px 0;
    }
`;

const GuestPasswordContentContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;

    &:not(:last-of-type) {
        border-bottom: 1px solid #dbdbdb;
    }

    ${media.medium} {
        flex-direction: column;
        padding-top: 12px;
        &:not(:last-of-type) {
            border-bottom: none;
        }
    }
`;

const PasswordInputTitleContainer = styled.div`
    width: 200px;

    > p {
        font-size: 16px;
        line-height: 24px;
        color: #191919;
        letter-spacing: -0.64px;
    }

    ${media.medium} {
        width: 100%;
        text-align: left;

        > p {
            margin-left: 10px;
        }
    }
`;

const PasswordInputContainer = styled.div`
    width: 100%;
    padding: 30px 0;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    flex-direction: column;

    ${media.medium} {
        padding: 12px 0 0 0;
    }
`;

const GuestOrderPassword: FC<GuestOrderPasswordProps> = ({
    register,
    errors,
}) => {
    const [passwordCheck, setPasswordCheck] = useState('');

    const { width } = useWindowSize();

    const { t: orderSheet } = useTranslation('orderSheet');

    return (
        <GuestOrderPasswordContainer>
            <GuestOrderTitleContainer>
                <GuestOrderTitle>
                    {orderSheet('guestPassword.title')}
                </GuestOrderTitle>
                {!isMobile(width) && (
                    <GuestOrderDesc>
                        {orderSheet('guestPassword.desc')}
                    </GuestOrderDesc>
                )}
            </GuestOrderTitleContainer>

            <PasswordContainer>
                {isMobile(width) && (
                    <GuestOrderDesc>
                        {orderSheet('guestPassword.desc')}
                    </GuestOrderDesc>
                )}
                <GuestPasswordContentContainer>
                    <PasswordInputTitleContainer>
                        <p>비밀번호</p>
                    </PasswordInputTitleContainer>
                    <PasswordInputContainer>
                        <PasswordInput
                            placeholder={orderSheet(
                                'guestPassword.category.placeholder.password',
                            )}
                            type={'password'}
                            {...register('tempPassword', {
                                required: {
                                    value: true,
                                    message: orderSheet('alert.inputPassword'),
                                },
                                validate: {
                                    matchPassword: (tempPassword) => {
                                        return (
                                            passwordCheck === tempPassword ||
                                            '비밀번호가 일치하지 않습니다.'
                                        );
                                    },
                                },
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='tempPassword'
                            render={({ message }) => (
                                <StyledErrorMessage>
                                    {message}
                                </StyledErrorMessage>
                            )}
                        />
                    </PasswordInputContainer>
                </GuestPasswordContentContainer>
                <GuestPasswordContentContainer>
                    {!isMobile(width) && (
                        <PasswordInputTitleContainer>
                            <p>비밀번호 확인</p>
                        </PasswordInputTitleContainer>
                    )}

                    <PasswordInputContainer>
                        <PasswordInput
                            placeholder={orderSheet(
                                'guestPassword.category.placeholder.password',
                            )}
                            type={'password'}
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)}
                        />
                    </PasswordInputContainer>
                </GuestPasswordContentContainer>
            </PasswordContainer>
        </GuestOrderPasswordContainer>
    );
};

export default GuestOrderPassword;

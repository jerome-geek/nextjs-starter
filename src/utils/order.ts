import { includes } from '@fxts/core';
import {
    CLAIM_STATUS_TYPE,
    NEXT_ACTION_TYPE,
    ORDER_STATUS_TYPE,
    PAY_TYPE,
} from 'models';

const isBankInfoVisible = (payType?: Nullable<PAY_TYPE>) =>
    payType &&
    includes(payType, [
        PAY_TYPE.ACCOUNT,
        PAY_TYPE.REALTIME_ACCOUNT_TRANSFER,
        PAY_TYPE.VIRTUAL_ACCOUNT,
        PAY_TYPE.ESCROW_REALTIME_ACCOUNT_TRANSFER,
        PAY_TYPE.ESCROW_VIRTUAL_ACCOUNT,
    ]);

const nextActionName = (
    orderStatusType: ORDER_STATUS_TYPE,
    nextActionType: NEXT_ACTION_TYPE,
    claimStatusType: Nullable<CLAIM_STATUS_TYPE>,
) => {
    if (orderStatusType === ORDER_STATUS_TYPE.DEPOSIT_WAIT) {
        if (nextActionType === NEXT_ACTION_TYPE.CANCEL_ALL) {
            return '주문취소';
        }
    }

    if (orderStatusType === ORDER_STATUS_TYPE.PAY_DONE) {
        if (nextActionType === NEXT_ACTION_TYPE.EXCHANGE) {
            return '교환신청';
        }
        if (nextActionType === NEXT_ACTION_TYPE.CANCEL) {
            return '취소신청';
        }
    }

    if (orderStatusType === ORDER_STATUS_TYPE.PRODUCT_PREPARE) {
        if (nextActionType === NEXT_ACTION_TYPE.EXCHANGE) {
            return '교환신청';
        }
        if (nextActionType === NEXT_ACTION_TYPE.CANCEL) {
            return '취소신청';
        }
    }

    if (orderStatusType === ORDER_STATUS_TYPE.DELIVERY_PREPARE) {
        if (nextActionType === NEXT_ACTION_TYPE.EXCHANGE) {
            return '교환신청';
        }
        if (nextActionType === NEXT_ACTION_TYPE.CANCEL) {
            return '취소신청';
        }
    }

    if (orderStatusType === ORDER_STATUS_TYPE.DELIVERY_ING) {
        if (nextActionType === NEXT_ACTION_TYPE.VIEW_DELIVERY) {
            return '배송조회';
        }
        if (nextActionType === NEXT_ACTION_TYPE.WITHDRAW_RETURN) {
            return '반품신청';
        }
        if (nextActionType === NEXT_ACTION_TYPE.EXCHANGE) {
            return '교환신청';
        }
        if (nextActionType === NEXT_ACTION_TYPE.CONFIRM_ORDER) {
            return '구매확정';
        }
        if (nextActionType === NEXT_ACTION_TYPE.WRITE_REVIEW) {
            return '후기작성';
        }
    }

    if (orderStatusType === ORDER_STATUS_TYPE.DELIVERY_DONE) {
        if (nextActionType === NEXT_ACTION_TYPE.VIEW_DELIVERY) {
            return '배송조회';
        }
        if (nextActionType === NEXT_ACTION_TYPE.CONFIRM_ORDER) {
            return '구매확정';
        }
        if (nextActionType === NEXT_ACTION_TYPE.WRITE_REVIEW) {
            return '후기작성';
        }
        if (nextActionType === NEXT_ACTION_TYPE.EXCHANGE) {
            return '교환신청';
        }
        if (nextActionType === NEXT_ACTION_TYPE.WITHDRAW_RETURN) {
            return '반품신청';
        }
    }

    if (orderStatusType === ORDER_STATUS_TYPE.BUY_CONFIRM) {
        if (nextActionType === NEXT_ACTION_TYPE.WRITE_REVIEW) {
            return '후기작성';
        }
    }

    if (claimStatusType) {
        if (
            claimStatusType === CLAIM_STATUS_TYPE.CANCEL_REQUEST &&
            nextActionType === NEXT_ACTION_TYPE.VIEW_CLAIM
        ) {
            return '취소신청';
        }

        if (
            claimStatusType === CLAIM_STATUS_TYPE.CANCEL_REQUEST &&
            nextActionType === NEXT_ACTION_TYPE.VIEW_CLAIM
        ) {
            return '취소신청철회';
        }

        if (
            includes([
                CLAIM_STATUS_TYPE.CANCEL_PROC_REQUEST_REFUND,
                CLAIM_STATUS_TYPE.CANCEL_PROC_WAITING_REFUND,
            ])
        ) {
            return '취소처리중';
        }

        if (
            includes([
                CLAIM_STATUS_TYPE.CANCEL_DONE,
                CLAIM_STATUS_TYPE.CANCEL_NO_REFUND,
            ]) &&
            nextActionType === NEXT_ACTION_TYPE.VIEW_CLAIM
        ) {
            return '취소완료';
        }

        if (
            claimStatusType === CLAIM_STATUS_TYPE.EXCHANGE_REQUEST &&
            nextActionType === NEXT_ACTION_TYPE.VIEW_CLAIM
        ) {
            return '교환신청';
        }

        if (
            claimStatusType === CLAIM_STATUS_TYPE.EXCHANGE_REJECT_REQUEST &&
            nextActionType === NEXT_ACTION_TYPE.WITHDRAW_EXCHANGE
        ) {
            return '교환신청 철회';
        }

        if (
            [
                CLAIM_STATUS_TYPE.EXCHANGE_PROC_BEFORE_RECEIVE,
                CLAIM_STATUS_TYPE.EXCHANGE_PROC_REQUEST_PAY,
                CLAIM_STATUS_TYPE.EXCHANGE_PROC_REQUEST_REFUND,
                CLAIM_STATUS_TYPE.EXCHANGE_PROC_WAITING,
                CLAIM_STATUS_TYPE.EXCHANGE_PROC_WAITING_PAY,
                CLAIM_STATUS_TYPE.EXCHANGE_PROC_WAITING_REFUND,
            ].includes(claimStatusType)
        ) {
            return '교환처리중';
        }

        if (
            [
                CLAIM_STATUS_TYPE.EXCHANGE_DONE,
                CLAIM_STATUS_TYPE.EXCHANGE_DONE_PAY_DONE,
                CLAIM_STATUS_TYPE.EXCHANGE_DONE_REFUND_DONE,
            ].includes(claimStatusType) &&
            nextActionType === NEXT_ACTION_TYPE.VIEW_CLAIM
        ) {
            return '교환완료';
        }

        if (
            claimStatusType === CLAIM_STATUS_TYPE.RETURN_REQUEST &&
            nextActionType === NEXT_ACTION_TYPE.VIEW_CLAIM
        ) {
            return '반품신청';
        }

        if (
            claimStatusType === CLAIM_STATUS_TYPE.RETURN_REQUEST &&
            nextActionType === NEXT_ACTION_TYPE.WITHDRAW_RETURN
        ) {
            return '반품신청철회';
        }

        if (
            includes(claimStatusType, [
                CLAIM_STATUS_TYPE.RETURN_PROC_BEFORE_RECEIVE,
                CLAIM_STATUS_TYPE.RETURN_PROC_REQUEST_REFUND,
                CLAIM_STATUS_TYPE.RETURN_PROC_WAITING_REFUND,
                CLAIM_STATUS_TYPE.RETURN_REFUND_AMT_ADJUST_REQUESTED,
            ])
        ) {
            return '반품처리중';
        }

        if (
            includes(claimStatusType, [
                CLAIM_STATUS_TYPE.RETURN_DONE,
                CLAIM_STATUS_TYPE.RETURN_NO_REFUND,
            ]) &&
            nextActionType === NEXT_ACTION_TYPE.VIEW_CLAIM
        ) {
            return '반품완료';
        }
    }
};

export { isBankInfoVisible, nextActionName };

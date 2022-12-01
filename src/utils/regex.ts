/**
 * @shopby.regex
 * 전역 정규식 오브젝트.
 */
export const regex = {
    number: /[0-9]/g,
    notNumber: /[^0-9]/g,
    negativeNumber: /[0-9-]+/g,
    decimalNumber: /[0-9.]+/g,
    eng: /[a-zA-Z]/g,
    ko: /[ㄱ-힣]/g,
    koEng: /[a-zA-Z0-9ㄱ-힣]/g,
    currency: /[0-9,]/g,
    at: /@/g,
    noSpace: /\s/g, // 공백만 불가
    space: /(?:\r\n|\r|\n)/g, // 줄바꿈
    noCommonSpecial: /['"<>₩\\`'"]/gi, // 공통 제한 문자 불가
    noPartSpecial: /['"'"<>\\`(),:;@[\]\s]/g, // 일부 특수문자('"<>\`(),:;@[])와 공백 불가
    noSpecialSpace: /[^a-zA-Z0-9ㄱ-힣\s]/g, // 한글, 영문, 숫자, 공백만 가능
    /* eslint-disable */
    userid: /[^a-zA-Z0-9@\._\-]/g,
    passwordSpecial: /[!@#$%^&+=\-_.()]/g, // 특수문자 : ! @ # $ % ^ & + = - _ . ( ) 만 사용 가능
    emailId: /^[_A-Za-z0-9-\\+]+(.[_A-Za-z0-9-]+)$/,
    emailDomain: /^[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
    email: /[_A-Za-z0-9-\\+]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$/,
    mobileNo: /(\d{11,12})/g,
    birthday:
        /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
    customsId: /^[p|P][1-6]{1}[0-9]{11}$/, // 개인통관고유번호 (숫자, 영어 p가 아닌 영어, p + 영어, 한글, p+특수문자 제외)
    engNumber: /[^0-9a-zA-Z]/g, //영문, 숫자만 가능
    imageExtension: /.(bmp|png|jpg|jpeg|gif)$/i,
    bankDepositorName: /[^a-zA-Zㄱ-힣!@#$%^&+=\-_.()]/g, //한글,영문대소문자,특수문자 : ! @ # $ % ^ & + = - _ . ( ) 만 사용 가능
    /* eslint-enable */
};
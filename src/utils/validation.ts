export const onlyNumberFormatter = (inputString: string) => {
    const numberCheck = /^[0-9]+$/;
    if (numberCheck.test(inputString)) {
        return inputString;
    } else {
        return inputString.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    }
};

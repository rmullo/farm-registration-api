const validateCpfOrCnpj = (cpfOrCnpj) => {
    if (cpfOrCnpj.length === 11) {
        return validateCpf(cpfOrCnpj);
    } else if (cpfOrCnpj.length === 14) {
        return validateCnpj(cpfOrCnpj);
    } else {
        return false;
    }
}; 

const validateCpf = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    const calculateVerifyingDigit = (base, length) => {
        let sum = 0;
        for (let i = 0; i < length; i++) {
            sum += parseInt(base[i]) * (length + 1 - i);
        }
        let verifyingDigit = 11 - (sum % 11);
        return verifyingDigit > 9 ? 0 : verifyingDigit;
    };

    const firstVerifyingDigit = calculateVerifyingDigit(cpf, 9);
    if (firstVerifyingDigit !== parseInt(cpf[9])) {
        return false;
    }

    const secondVerifyingDigit = calculateVerifyingDigit(cpf, 10);
    if (secondVerifyingDigit !== parseInt(cpf[10])) {
        return false;
    }

    return true;
};

const validateCnpj = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]/g, '');

    if (cnpj.length !== 14) {
        return false;
    }

    const calculateVerifyingDigit = (weights, length) => {
        let sum = 0;
        for (let i = 0; i < length; i++) {
            sum += parseInt(cnpj[i]) * weights[i];
        }
        let verifyingDigit = sum % 11 < 2 ? 0 : 11 - sum % 11;
        return verifyingDigit;
    };

    const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const firstVerifyingDigit = calculateVerifyingDigit(firstWeights, 12);
    if (firstVerifyingDigit !== parseInt(cnpj[12])) {
        return false;
    }

    const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const secondVerifyingDigit = calculateVerifyingDigit(secondWeights, 13);
    if (secondVerifyingDigit !== parseInt(cnpj[13])) {
        return false;
    }

    return true;
};

module.exports = validateCpfOrCnpj;
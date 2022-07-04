const rules = {
    required: (data, field) => required(data, field),
    numeric: (data, field) => numeric(data, field),
    date: (data, field) => date(data, field),
    confirmed: (data, field) => confirmed(data, field),
}

function required(data, field) {
    return data[field] !== undefined && data[field] !== '';
}

function confirmed(data, field) {
    const fieldConfirmation = `${field}_confirmation`;

    return data[fieldConfirmation] !== undefined && data[fieldConfirmation] !== '' && data[field] === data[fieldConfirmation];
}

function numeric(data, field) {
    return !isNaN(data[field]) && !isNaN(parseFloat(data[field]));
}

function date(data, field) {
    return data[field] instanceof Date;
}

export function validateData(data, validationRules) {
    const validationKeys = Object.keys(validationRules);

    let errors = [];

    let hasError = false;

    for (let key in validationKeys) {
        const fieldRules = validationRules[validationKeys[key]];

        for (let fieldRule in fieldRules) {
            const ruleFunction = rules[fieldRules[fieldRule]];

            if (!ruleFunction(data, validationKeys[key])) {
                errors[validationKeys[key]] = true;
                
                hasError = true;
            } else {
                errors[validationKeys[key]] = false;
            }
        }
    }

    return {errors, hasError};
}
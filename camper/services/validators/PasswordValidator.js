/**
 * Returns true when password is valid (matches the expectations)
 *
 * @param password1
 * @param password2
 * @returns {*}
 */
const PasswordValidator = (password1, password2) => {

    if (password1 !== password2) {
        return {
            valid: false,
            message: 'user.password.password_mismatch',
            reason: 'passwordMismatch'
        };
    }

    // min 8 chars, 1 capital letter, one number
    if (!/^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,})$/.test(password1)) {
        return {
            valid: false,
            message: 'user.password.password_to_weak',
            reason: 'passwordToWeak'
        };
    }

    return {
        valid: true,
        message: null,
        reason: null
    };
}

export default PasswordValidator;
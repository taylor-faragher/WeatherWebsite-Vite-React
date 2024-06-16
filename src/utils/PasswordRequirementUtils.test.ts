import {
    checkPasswordLength,
    checkPasswordForNumber,
    checkPasswordForUpperCase,
    checkPasswordForSpecialCharacter,
} from './PasswordRequirementUtils';

describe('Password Checker Functions', () => {
    describe('checkPasswordLength', () => {
        test('should return "none" for empty value', () => {
            expect(checkPasswordLength('')).toBe('none');
        });

        test('should return "correct" for length >= 8', () => {
            expect(checkPasswordLength('password')).toBe('correct');
            expect(checkPasswordLength('longpassword')).toBe('correct');
        });

        test('should return "incorrect" for length < 8', () => {
            expect(checkPasswordLength('pass')).toBe('incorrect');
            expect(checkPasswordLength('short')).toBe('incorrect');
        });
    });

    describe('checkPasswordForNumber', () => {
        test('should return "none" for empty value', () => {
            expect(checkPasswordForNumber('')).toBe('none');
        });

        test('should return "correct" if value contains a number', () => {
            expect(checkPasswordForNumber('password1')).toBe('correct');
            expect(checkPasswordForNumber('123')).toBe('correct');
        });

        test('should return "incorrect" if value does not contain a number', () => {
            expect(checkPasswordForNumber('password')).toBe('incorrect');
            expect(checkPasswordForNumber('noNumbers')).toBe('incorrect');
        });
    });

    describe('checkPasswordForUpperCase', () => {
        test('should return "none" for empty value', () => {
            expect(checkPasswordForUpperCase('')).toBe('none');
        });

        test('should return "correct" if value contains an uppercase letter', () => {
            expect(checkPasswordForUpperCase('Password')).toBe('correct');
            expect(checkPasswordForUpperCase('UpperCase')).toBe('correct');
        });

        test('should return "incorrect" if value does not contain an uppercase letter', () => {
            expect(checkPasswordForUpperCase('password')).toBe('incorrect');
            expect(checkPasswordForUpperCase('lowercase')).toBe('incorrect');
        });
    });

    describe('checkPasswordForSpecialCharacter', () => {
        test('should return "none" for empty value', () => {
            expect(checkPasswordForSpecialCharacter('')).toBe('none');
        });

        test('should return "correct" if value contains a special character', () => {
            expect(checkPasswordForSpecialCharacter('password!')).toBe('correct');
            expect(checkPasswordForSpecialCharacter('special@')).toBe('correct');
        });

        test('should return "incorrect" if value does not contain a special character', () => {
            expect(checkPasswordForSpecialCharacter('password')).toBe('incorrect');
            expect(checkPasswordForSpecialCharacter('noSpecialChars')).toBe('incorrect');
        });
    });
});

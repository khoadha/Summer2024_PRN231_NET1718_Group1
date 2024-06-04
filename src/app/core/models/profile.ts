export interface Profile {
    id: string
    userName: string
    email: string
    imgPath: string
    accountBalance: number
    }

    export interface UpdateUsernameDto {
    username?: string;
    }

    export interface UpdatePasswordDto{
    currentpassword?: string;
    newpassword?: string;
    }

    export interface PasswordCriteria {
    hasLowercase: boolean;
    hasUppercase: boolean;
    hasDigit: boolean;
    hasSpecialChar: boolean;
    isValidLength: boolean;
    }
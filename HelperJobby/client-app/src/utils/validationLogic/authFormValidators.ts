export function IsValidEmail(email : string) : boolean{
    const atSignIndex : number = email.lastIndexOf('@');
    if (!(atSignIndex > 0 && atSignIndex < email.lastIndexOf('.') && atSignIndex === email.indexOf('@')
        && email.length - atSignIndex > 2))
    {
        return false;
    }

    return (email.length > 5 && email.length < 50);
    
}

export function IsValidPasswordMinimalLength(password: string) : boolean{
    return password.length >= 8;
}

export function IsValidPasswordMaximalLength(password: string) : boolean{
    return password.length <= 25;
}

export function validatePhoneNumber(phoneNumber: string): string {
    if (!phoneNumber || phoneNumber.trim() === "") {
        return "You cannot have an empty phoneNumber";
    }

    if (phoneNumber.length < 5 || phoneNumber.length > 15) {
        return  "Length of your phone number is invalid";
    }

    const regexPattern: RegExp = /^\+[0-9]{1,3}[0-9]{3,14}$/;
    if (!regexPattern.test(phoneNumber)) {
        return "Please enter a valid phone number";
    }
    return  "";
}
import {Simulate} from "react-dom/test-utils";
import paste = Simulate.paste;

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
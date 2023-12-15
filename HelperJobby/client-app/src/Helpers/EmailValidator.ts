export function ValidateEmail(email : string) : boolean{
    let result : boolean = true;
    const atSignIndex : number = email.lastIndexOf('@');
    if (!(atSignIndex > 0 && atSignIndex < email.lastIndexOf('.') && atSignIndex === email.indexOf('@')
        && email.length - atSignIndex > 2))
    {
        result = false;
    }

    if (email.length < 5 || email.length > 50)
        result = false;
    return result;
}
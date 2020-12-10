const ValidateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
}

const ValidatePassword = (passWord) => {
    let LargeLatters = /[A-Z]/;
    let SmallLatters = /[a-z]/;
    let specialCharacters = /[!@#?\$%\^\&*\)\(+=._-]/;

    let checkLargeLatter = passWord.match(LargeLatters);            // check LARGE LATERS
    let checkSmallLatter = passWord.match(SmallLatters);            // check SMALL LATTERS
    let checkDigits = /\d/.test(passWord);                          // check DIGITS
    let checkSpecialCharacters = passWord.match(specialCharacters); // check SPECIAL CHARACTERS

    return (checkLargeLatter && checkSmallLatter && checkDigits && checkSpecialCharacters)
}

const ValidateUsername = (str) => {
    var error = "";
    var illegalChars = /\W/; // allow letters, numbers, and underscores

    if (str == "") {
        error = "Please enter Username";
    } else if ((str.length < 1) || (str.length > 18)) {
        error = "Username must have 5-15 characters";
    } else if (illegalChars.test(str)) {
        error = "Please enter valid Username. Use only numbers and alphabets";
    } else {
        error = "";
    }
    return error;
}

export { ValidateEmail, ValidatePassword, ValidateUsername }
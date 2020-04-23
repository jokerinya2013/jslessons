const REQUIRED = 'REQUIRED';
const MIN_LENGTH = 'MIN_LENGTH';

function validate(value, flag, validatorValue) {
  if (flag === REQUIRED) {
    return value.trim().length > 0; // true or false
  }

  if (flag === MIN_LENGTH) {
    return value.trim().length > validatorValue; // true or false
  }
}

function getValue(elId) {
  return document.getElementById(elId).value;
}

function createUser(uName, uPassword) {
  if (!validate(uName, REQUIRED) || !validate(uPassword, MIN_LENGTH, 5)) {
    throw new Error(
      'Invalid input - username or password is wrong (password should be at least six characters)'
    );
  }
  const user = {
    userName: uName,
    userPassword: uPassword,
  };
  return user;
}

function greet(name) {
  console.log('Hi, I am ' + name);
}

function signUpHandler(event) {
  event.preventDefault();

  const enteredUsername = getValue('username');
  const enteredPassword = getValue('password');

  try {
    const user = createUser(enteredUsername, enteredPassword);
    console.log(user);
    greet(user.userName);
  } catch (error) {
    alert(error.message);
  }
}

function connectForm(formId, formSubmitHandler) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', formSubmitHandler);
}

connectForm('user-input', signUpHandler);

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repassword = document.getElementById("repassword");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form_control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form_control success";
}

const notice = document.querySelector(".notice");

function allRequired() {
  notice.classList.add("show");
  setTimeout(() => {
    notice.classList.remove("show");
  }, 2000);
}

const nameValidation = /^[a-z0-9_-]{2,20}$/;
const emailValidation = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
const pwValidation = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~,!,@,#,$,*,(,),=,+,_,.,|]).*$/;

function isValidName(input) {
  if (nameValidation.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Name is more than 2 characters");
  }
}

function isValidPw(input) {
  if (pwValidation.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Password is not valid");
  }
}

function isValidEmail(input) {
  if (emailValidation.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not Valid");
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
      allRequired();
    }

  });
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, repassword]);
  isValidName(username);
  isValidEmail(email);
  isValidPw(password);
  checkPasswordsMatch(password, repassword);
});

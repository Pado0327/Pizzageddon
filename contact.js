/****************
    
    Final Web Project
    Name: JaeJinKim
    Date: 06/24/2020
    Description: javascript to validate cantact form 

*****************/

/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str) {
  // Uses a regex to remove spaces from a string.
  return str.replace(/^\s+|\s+$/g, '');
}

function formHasInput(element) {
  if (element.value == null || trim(element.value) == '') {
    //Invalid entry
    return false;
  }

  return true;
}

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
  //hide errors
  hideErrors();

  //checking if the submission process should continue.
  if (formHasErrors()) {
    //prevent the form from submitting.
    e.preventDefault();

    // Returning false prevents the form from submitting
    return false;
  }

  //
  return true;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
  let errorFlag = false;

  let requiredField = ['name', 'phone', 'email'];

  for (let i = 0; i < requiredField.length; i++) {
    let textField = document.getElementById(requiredField[i]);

    if (!formHasInput(textField)) {
      document.getElementById(requiredField[i] + '_error').style.display =
        'block';

      if (!errorFlag) {
        textField.focus();
        textField.select();
      }

      // Raise the error Flag
      errorFlag = true;
    }
  }
  // create a regular expression for phone number for 10 digit number
  const regexPhone = new RegExp(/^\d{10}$/);
  let ptextField = document.getElementById(requiredField[1]);

  let phone = document.getElementById('phone').value;

  // Determine if phone number is valid
  if (formHasInput(ptextField)) {
    if (!regexPhone.test(phone)) {
      document.getElementById('phone_invalid').style.display = 'block';

      if (!errorFlag) {
        ptextField.focus();
        ptextField.select();
      }
      //raise the error flag
      errorFlag = true;
    }
  }

  //create a regular expression for email
  const regexEmail = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  let email = document.getElementById('email').value;
  let etextField = document.getElementById(requiredField[2]);
  // Determine if the email is valid
  if (formHasInput(etextField)) {
    if (!regexEmail.test(email)) {
      document.getElementById('email_invalid').style.display = 'block';

      if (!errorFlag) {
        etextField.focus();
        etextField.select();
      }

      //raise the error flag
      errorFlag = true;
    }
  }

  return errorFlag;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function reset(e) {
  // Confirm that the user wants to reset the form.
  if (confirm('Clear order?')) {
    // Ensure all error fields are hidden
    hideErrors();

    // Set focus to the first text field on the page
    document.getElementById('name').focus();

    // When using onReset="resetForm()" in markup, returning true will allow
    // the form to reset
    return true;
  }

  // Prevents the form from resetting
  e.preventDefault();

  // When using onReset="resetForm()" in markup, returning false would prevent
  // the form from resetting
  return false;
}

function hideErrors() {
  let error = document.getElementsByClassName('error');

  for (let i = 0; i < error.length; i++) {
    error[i].style.display = 'none';
  }
}

function load() {
  // hide error messages
  hideErrors();

  // event listener for the validate function (clicking submit button will trigger the validate function)
  document.getElementById('submit').addEventListener('click', validate);

  // event listener for the resetForm function (reset buttion will trigger the resetForm function)
  document.getElementById('reset').addEventListener('click', reset);
}

// Add document load event listener
document.addEventListener('DOMContentLoaded', load);

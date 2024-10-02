const checkValidity = function checkValidity(){
    const submitBtn = document.querySelector('input[type="submit"]');
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const valid = checkEveryValidity();
        if (valid) {
            alert('Successfully created a new account!');
            return;
        }
        alert('enter the fields appropriately');
    })
}()

const checkInput = function() {
    const inputEle = document.querySelectorAll('input:not(input[type="submit"])');
    inputEle.forEach((input) => {
        input.addEventListener('input', (event) => {
            removePara(input.id);
            spanError(input.id);
        })
    })
}()
function checkEveryValidity() {
    const inputEle = document.querySelectorAll('input:not(input[type="submit"])');
    inputEle.forEach((input) => {
        if (input.id === 'confirm-password'){
            if(!checkPassword()) return false;
        }
        if (!input.validity.valid) {
            spanError(input.id);
            return false;
        }
        return true;
    })
}
function spanError(value){
    const paraEle = document.createElement('p');
    const label = document.querySelector(`label[for='${value}']`);
    const input = document.querySelector(`#${value}`);
    let message =  checkError(input.validity);
    if(value === 'confirm-password') {
        const check = checkPassword();
        if(!check) {
            message = "password mismatch";
        }
    }

    paraEle.textContent = message;
    removePara(value);
    label.appendChild(paraEle);
    input.classList.add('error');
    if (message === '') {
        removePara(value);
    }
}

function checkError(validity) {
    if (validity.typeMismatch) {
        return '*type mismatch';
    }
    if (validity.tooLong) {
        return '*enter characters less than 16 characters' ;
    }
    if (validity.tooShort) {
        return '*enter characters are less than 8 characters' ;
    }
    if (validity.valueMissing) {
        return '*fill up the field' ;
    }
    if (validity.patternMismatch) {
        return 'enter correct value';
    }
    return '';
}

function removePara(value) {
    const para = document.querySelector(`label[for='${value}']>p`);
    const label = document.querySelector(`label[for='${value}']`);
    const input = document.querySelector(`#${value}`);
    if(label.contains(para)) {
        label.removeChild(para);
        input.classList.remove('error');
    }
}

function checkPassword() {
    const confirm = document.querySelector('#confirm-password').value;
    const password = document.querySelector('#password').value;
    if (!(confirm === password)) {
        return false;
    }
    return true;
}
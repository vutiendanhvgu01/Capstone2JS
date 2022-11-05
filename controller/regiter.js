import {
    User
} from '../models/Users.js';

let token_cybersoft = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3MyIsIkhldEhhblN0cmluZyI6IjIzLzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NDgwMDAwMDAwMCIsIm5iZiI6MTY1OTg5MTYwMCwiZXhwIjoxNjg0OTQ3NjAwfQ.u471oZWr9EMgIb7oeyuaxfi8spgAgUuTkUHYSS9pBWg";
let valid = true;

document.querySelector('#submit').onclick = function () {
    //Lấy dữ liệu người dùng nhập từ giao diện
    let email = document.querySelector('#email').value;
    let name = document.querySelector('#name').value;
    let password = document.querySelector('#password').value;
    let checkPassword = document.querySelector('#check-password').value;
    let phone = document.querySelector('#phone').value;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    // 
    console.log(name + ", " +  email +  ", "  + phone +  ", " + gender);
    // var valid = true;
    //  check Password
    var checkP = checkPass(password, checkPassword, 'alert-password')
    if(!checkP){
        return;
    }
    // Kiểm tra null
  

    valid = validation.checkNullInput(email,'err-required-email','email') 
            & validation.checkNullInput(name,'err-required-name','name')
            & validation.checkNullInput(password,'err-required-password','password')
            & validation.checkNullInput(checkPassword,'err-required-checkPassword','checkPassword')
            & validation.checkNullInput(phone,'err-required-phone','phone');

    //kiểm tra email
    valid &= validation.checkEmailInput(email,'err-email','email')
    //Kiểm tra số 
    valid &= validation.checkNumberInput(phone , 'err-number-phone', 'phone')
    // Kiểm tra độ dài 
    valid &= validation.checkLengthInput(password, 'err-password','password', 6, 15)
             &validation.checkLengthInput(checkPassword, 'err-checkPassword','password', 6, 15)
   

    if (!valid) {
        return;
    }
    var newUser = new User(email, password, name , gender, phone);
    console.log(JSON.stringify(newUser));
    callAPI(JSON.stringify(newUser), "alert-register")
}

function callAPI(returnData, alert) {
    //Gọi ajax gửi về api backend
    var promise = axios({
        url: 'https://shop.cyberlearn.vn/api/Users/signup',
        method: 'POST',
        data: returnData,
        headers: {
            "Content-Type": "application/json-patch+json"
        },
    });

    //Thành công
    promise.then(function (response) {
        console.log(response.data);
        document.getElementById(alert).style.display = 'block';
        document.getElementById("submit").style.display = 'none';
     
        document.getElementById(alert).innerHTML = `Successfully!`;
    });
    //Thất bại
    promise.catch(function (err) {
        console.log(err);
    })
}

// checkPassword
function checkPass(password, checkPassword, errId) {
    let flag = false;
    if (password === checkPassword) {
        flag = true;
    }

    if (!flag) {
        document.getElementById(errId).style.display = 'block';
        document.getElementById(errId).innerHTML = `Please re-check password!`;
        return false;
    }

    document.getElementById(errId).style.display = 'none';
    return true;
}
import {
    User
} from '../models/Users.js';

let token_cybersoft = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3MyIsIkhldEhhblN0cmluZyI6IjIzLzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NDgwMDAwMDAwMCIsIm5iZiI6MTY1OTg5MTYwMCwiZXhwIjoxNjg0OTQ3NjAwfQ.u471oZWr9EMgIb7oeyuaxfi8spgAgUuTkUHYSS9pBWg";


document.querySelector('#submit').onclick = function () {
    //Lấy dữ liệu người dùng nhập từ giao diện
    let email = document.querySelector('#email').value;
    let name = document.querySelector('#name').value;
    let password = document.querySelector('#password').value;
    let checkPassword = document.querySelector('#check-password').value;
    let phone = document.querySelector('#phone').value;
    let gender = document.querySelector('input[name="gender"]:checked').value;

    // console.log(name + email + phone)
    var newUser = new User(emailUser, passwordUser, nameUser, genderUser, phoneUser);
    console.log(JSON.stringify(newUser));
    callAPI(JSON.stringify(newUser), "alert")
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
        console.log(response);
    });
    //Thất bại
    promise.catch(function (err) {
        console.log(err);
    })
}


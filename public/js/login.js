document.addEventListener('DOMContentLoaded',() => {
    let btnLogin = document.querySelector('.btn-dangnhap');
    let btnRegister = document.querySelector('.btn-dangky');
    let formLogin = document.querySelector('.formlogin');
    let formRegister = document.querySelector('.formregister');
    btnLogin.addEventListener('click', () => {
        formRegister.classList.remove('active');
        formLogin.classList.add('active');
    });

    btnRegister.addEventListener('click', () => {
        formLogin.classList.remove('active');
        formRegister.classList.add('active');
    });

});
const formLogin = document.getElementById('formLogin');
const inputUser = document.getElementById('user');
const inputPassword = document.getElementById('password');
const person = {
    user: 'Juani',
    password: '111',
}

formLogin.onsubmit = function (e) {
    e.preventDefault();
    const user = inputUser.value;
    const password = inputPassword.value;
    const userValid = user == person.user && password == person.password 
    if (userValid) {
        alert('Logeo exitoso');
        window.location.href = './admin.html'
    } else {
        alert('Datos inválidos');
    }
    
}

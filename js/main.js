// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню
  menu.classList.toggle('visible');
})

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name')



const listUsers = [
  {
    email: 'krendilek766@gmail.com',
    password: '74321',
    displayName: 'krendil'
  },
  {
    email: 'tatyanapopko@gmail.com',
    password: '05082018',
    displayName: 'tatyana'
  },
];

const setUser = {
  user: null,
  logIn(email, password, handler){
    const user = this.getUser(email);
    if(user && user.password === password){
      this.authorizedUser(user);
      handler();
    }else{
      alert ('A user with this email is no autorized')
    }
    console.log(user);
  },
  logOut(){
  },
  signUp(email, password, handler){
    if(!this.getUser(email)){
      let user = {email, password, displayName: showName(email)};
      listUsers.push(user);
      this.authorizedUser(user);
      console.log(user);
      handler();
    }else {
      alert ('A user with this email is registered')
    }
    console.log(listUsers);
  },
  getUser(email){
    return listUsers.find(item => {
      return item.email===email;
    })
  },
  authorizedUser(user){
    this.user=user;
  },

}

const toggleAuthDom = ()=>{
  let user=setUser.user;
  if(user){
    loginElem.style.display = 'none';
    userElem.style.display = "";
    userNameElem.textContent = user.displayName;
  }else{
    loginElem.style.display = '';
    userElem.style.display = "none";
  }
}

const validEmail=(str)=>{
  const regName = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regName.test(str);
}

const validPassword = (str)=>{
  const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
  return regPassword.test(str);
}

const showName = (email)=>{
  for(let i = 0; i < email.length; i++){
    if(email[i]==='@'){
        return email.slice(0,i)
    }
    }
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if(validEmail(emailInput.value) && validPassword(passwordInput.value)){
    setUser.logIn(emailInput.value, ppasswordInput.value, toggleAuthDom);
  }

});
loginSignup.addEventListener('click', (e) => {
  e.preventDefault();
  if(validEmail(emailInput.value) && validPassword(passwordInput.value)){
    setUser.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
  }else{
    emailInput.style.border = '2px solid red';
    passwordInput.style.border = '2px solid red';
    setTimeout(()=>{
      emailInput.style.border = '';
      passwordInput.style.border = '';
    },1500)
  }
});

toggleAuthDom();



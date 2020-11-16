// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const userAvatarElem = document.querySelector('.user-avatar');
const editElem = document.querySelector('.icon-edit');
const editContainer = document.querySelector('.edit-container');
const exitElem = document.querySelector('.exit');
const editUserName = document.querySelector('.edit-username');
const editPhotoUrl = document.querySelector('.edit-photo');
const editBtn = document.querySelector('.edit-btn');
const postsWarapper = document.querySelector('.posts');





const listUsers = [
  {
    email: 'krendilek766@gmail.com',
    password: '74321Krendil',
    displayName: 'krendil'
  },
  {
    email: 'tatyanapopko@gmail.com',
    password: '05082018Krendil',
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
  logOut(handler){
    this.user=null;
    handler();
  },
  signUp(email, password, handler){
    if(!this.getUser(email)){
      let user = {email, password, displayName: showName(email)};
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    }else {
      alert ('A user with this email is registered')
    }
    console.log(listUsers);
  },
  editUser(userName, userPhoto='', handler){
    if(userName){
      this.user.displayName = userName;
    };
    if(userPhoto){
      this.user.photo = userPhoto;
    };
    handler();
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

const setPosts = {
  allPost:[
    {
      title: "Heading",
      text: "Lалеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения,      ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит! ",
      tags: ['coll','new', 'hotter', 'mine', 'randomness'],
      authort: 'krendilek766@gmail.com',
      date: '11.11.2020, 10:02:32',
      like: 15,
      comments: 20,
    },    {
      title: "Heading_two",
      text: "Lалеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения,      ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит! ",
      tags: ['coll','new', 'hotter', 'mine', 'randomness'],
      authort: 'tatyanapopko@gmail.com',
      date: '14.11.2020, 09:10:45',
      like: 45,
      comments: 10,
    }
],

}

const toggleAuthDom = ()=>{
  let user=setUser.user;
  if(user){
    loginElem.style.display = 'none';
    userElem.style.display = "";
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
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

const showAllPosts = () =>{
  let postsHTML = '';
  setPosts.allPost.forEach(item => {
    postsHTML +=`
        <section class="post">
        <div class="post-body">
            <h2 class="post-title">${item.title}</h2>
            <p class="post-text">${item.text}</p>
            <div class="tags">
                <a href="#" class="tag">${item.tags.map(item=>"#"+item).join(' ')}</a>
            </div>
        </div>
        <div class="post-footer">
            <div class="post-buttons">
                <button class="post-button likes">
        <svg width="19" height="20" class="icon icon-like">
        <use xlink:href="img/icons.svg#like"></use>
        </svg>
        <span class="likes-counter">${item.like}</span>
        </button>
                <button class="post-button comments">
        <svg width="21" height="21" class="icon icon-comment">
        <use xlink:href="img/icons.svg#comment"></use>
        </svg>
        <span class="comments-counter">${item.comments}</span>
        </button>
                <button class="post-button save">
        <svg width="19" height="19" class="icon icon-save">
        <use xlink:href="img/icons.svg#save"></use>
        </svg>
        </button>
                <button class="post-button share">
        <svg width="17" height="19" class="icon icon-share">
        <use xlink:href="img/icons.svg#share"></use>
        </svg>
        </button>
            </div>
            <div class="post-author">
                <div class="author-about">
                    <a href="#" class="author-username">${item.authort}</a>
                    <span class="post-time">${item.date}</span>
                </div>
                <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
            </div>
        </div>
    </section>
    `;
  });
  postsWarapper.innerHTML = postsHTML;
};

const init = ()=>{
  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню
    menu.classList.toggle('visible');
  })

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(validEmail(emailInput.value) && validPassword(passwordInput.value)){
      setUser.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
      loginForm.reset();
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
        loginForm.reset();
      },1000);
    }
  });

  editElem.addEventListener('click', (e)=>{
    e.preventDefault();
  editContainer.classList.toggle ('visiable')
  editUserName.value = setUser.user.displayName;
  });

  exitElem.addEventListener('click', (e)=>{
    e.preventDefault();
    setUser.logOut(toggleAuthDom);
  });

  editContainer.addEventListener('submit',(e)=>{
    e.preventDefault();
    setUser.editUser(editUserName.value, editPhotoUrl.value, toggleAuthDom);
    editContainer.classList.remove('visiable')
  });

  showAllPosts();
  toggleAuthDom();
};

document.addEventListener('DOMContentLoaded', ()=>{
  init();
})




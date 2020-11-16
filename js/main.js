 // Your web app's Firebase configuration
 const firebaseConfig = {
     apiKey: "AIzaSyCYW0zABIXu1KtSSjjUNmL3ETRmxAv7CkQ",
     authDomain: "pikadu-96093.firebaseapp.com",
     databaseURL: "https://pikadu-96093.firebaseio.com",
     projectId: "pikadu-96093",
     storageBucket: "pikadu-96093.appspot.com",
     messagingSenderId: "500447222841",
     appId: "1:500447222841:web:ba961031ca2ea60ef701e8"
 };
 firebase.initializeApp(firebaseConfig);
 console.log(firebase);

 let menuToggle = document.querySelector('#menu-toggle');
 let menu = document.querySelector('.sidebar');

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
 const buttonNewPost = document.querySelector('.button-new-post');
 const addPostElem = document.querySelector('.add-post');

 const listUsers = [{
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
     initUser(handler) {
         firebase.auth().onAuthStateChanged((user) => {
             if (user) {
                 this.user = user;
             } else {
                 this.user = null;
             }
             if (handler) {
                 handler;
             }
         });
     },
     logIn(email, password, handler) {
         const user = this.getUser(email);
         if (user && user.password === password) {
             this.authorizedUser(user);
             if (handler) {
                 handler();
             };
         } else {
             alert('A user with this email is no autorized')
         };
     },
     logOut(handler) {
         this.user = null;
         if (handler) {
             handler();
         };
     },
     signUp(email, password, handler) {
         firebase.auth().createUserWithEmailAndPassword(email, password)
             .then((data) => {
                 console.log(data);
             })
             .catch((err) => {
                 const errorCode = err.code;
                 const errorMessage = err.message;
                 if (errorCode === 'auth/weak-password') {
                     console.log(errorMessage);
                     alert('Weak password')
                 } else if (errorCode === 'auth/email-already-in-use') {
                     console.log(errorMessage);
                     alert('Such email exists')
                 } else {
                     alert(errorMessage)
                 }
                 console.log(err);
             });

         /*   if (!this.getUser(email)) {
               if (handler) {
                   handler();
               };
               let user = { email, password, displayName: showName(email) };
               listUsers.push(user);
               this.authorizedUser(user);
           } else {
               alert('A user with this email is registered')
           } */
     },
     editUser(userName, userPhoto = '', handler) {
         if (handler) {
             handler();
         };
         if (userName) {
             this.user.displayName = userName;
         }
         if (userPhoto) {
             this.user.photo = userPhoto;
         }
     },
     getUser(email) {
         return listUsers.find(item => {
             return item.email === email;
         });
     },
     authorizedUser(user) {
         this.user = user;
     }

 }

 const setPosts = {
     allPost: [{
         title: "Heading",
         text: "Lалеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения,      ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит! ",
         tags: ['coll', 'new', 'hotter', 'mine', 'randomness'],
         authort: { displayName: 'krendil', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTIrcayxm7EZrNIkPciDCwVan0AnBMiWtxVwQ&usqp=CAU' },
         date: '11.11.2020, 10:02:32',
         like: 15,
         comments: 20,
     }, {
         title: "Heading_two",
         text: "Lалеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения,      ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит! ",
         tags: ['coll', 'new', 'hotter', 'mine', 'randomness'],
         authort: { displayName: 'tatyana', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTanNJ8wRbwuTECXAtI_USHqXEPa0OFxRMvbA&usqp=CAU' },
         date: '14.11.2020, 09:10:45',
         like: 45,
         comments: 10,
     }],
     addPost(title, text, tags, handler) {
         this.allPost.unshift({
             title,
             text,
             tags: tags.split(',').map(item => item.trim()),
             authort: {
                 displayName: setUser.user.displayName,
                 photo: setUser.user.photo,
             },
             date: new Date().toLocaleString(),
             like: 0,
             comments: 0,
         });
         if (handler) {
             handler();
         }
     },
 }

 const toggleAuthDom = () => {
     let user = setUser.user;
     if (user) {
         loginElem.style.display = 'none';
         userElem.style.display = "";
         userNameElem.textContent = user.displayName;
         userAvatarElem.src = user.photo || userAvatarElem.src;
         buttonNewPost.style.display = 'flex';
     } else {
         loginElem.style.display = '';
         userElem.style.display = "none";
         addPostElem.classList.remove('visiable');
         postsWarapper.classList.add('visiable');
     }
 }

 const showAddPost = () => {
     addPostElem.classList.add('visiable');
     postsWarapper.classList.remove('visiable');
 }

 const validEmail = (str) => {
     const regName = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return regName.test(str);
 }

 const validPassword = (str) => {
     const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
     return regPassword.test(str);
 }

 const showName = (email) => {
     for (let i = 0; i < email.length; i++) {
         if (email[i] === '@') {
             return email.slice(0, i);
         }
     }
 }

 const showAllPosts = () => {
     let postsHTML = '';
     setPosts.allPost.forEach(({ title, text, tags, like, comments, authort, date }) => {
         postsHTML += `
        <section class="post">
        <div class="post-body">
            <h2 class="post-title">${title}</h2>
            <p class="post-text">${text}</p>
            <div class="tags">
                <a href="#" class="tag">${tags.map(item=>"#"+item).join(' ')}</a>
            </div>
        </div>
        <div class="post-footer">
            <div class="post-buttons">
                <button class="post-button likes">
        <svg width="19" height="20" class="icon icon-like">
        <use xlink:href="img/icons.svg#like"></use>
        </svg>
        <span class="likes-counter">${like}</span>
        </button>
                <button class="post-button comments">
        <svg width="21" height="21" class="icon icon-comment">
        <use xlink:href="img/icons.svg#comment"></use>
        </svg>
        <span class="comments-counter">${comments}</span>
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
                    <a href="#" class="author-username">${authort.displayName}</a>
                    <span class="post-time">${date}</span>
                </div>
                <a href="#" class="author-link"><img src="${authort.photo || "img/avatar.jpeg"}" alt="avatar" class="author-avatar"></a>
            </div>
        </div>
    </section>
    `;
     });
     postsWarapper.innerHTML = postsHTML;
 };

 const init = () => {
     menuToggle.addEventListener('click', function(event) {
         // отменяем стандартное поведение ссылки
         event.preventDefault();
         // вешаем класс на меню, когда кликнули по кнопке меню
         menu.classList.toggle('visible');
     })

     loginForm.addEventListener('submit', (e) => {
         e.preventDefault();
         if (validEmail(emailInput.value) && validPassword(passwordInput.value)) {
             setUser.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
             loginForm.reset();
         }
     });

     loginSignup.addEventListener('click', (e) => {
         e.preventDefault();
         if (validEmail(emailInput.value) && validPassword(passwordInput.value)) {
             setUser.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
         } else {
             emailInput.style.border = '2px solid red';
             passwordInput.style.border = '2px solid red';
             setTimeout(() => {
                 emailInput.style.border = '';
                 passwordInput.style.border = '';
                 loginForm.reset();
             }, 1000);
         }
     });

     editElem.addEventListener('click', (e) => {
         e.preventDefault();
         editContainer.classList.toggle('visiable')
         editUserName.value = setUser.user.displayName;
     });

     exitElem.addEventListener('click', (e) => {
         e.preventDefault();
         setUser.logOut(toggleAuthDom);
     });

     editContainer.addEventListener('submit', (e) => {
         e.preventDefault();
         setUser.editUser(editUserName.value, editPhotoUrl.value, toggleAuthDom);
         editContainer.classList.remove('visiable')
     });

     buttonNewPost.addEventListener('click', (e) => {
         e.preventDefault();
         showAddPost();
     });

     addPostElem.addEventListener('submit', (e) => {
         e.preventDefault();
         const formElements = addPostElem.elements;
         const { title, text, tags } = formElements;
         if (title.value.length < 6) {
             alert('Short title');
             return;
         };
         if (text.value.length < 50) {
             alert('Short post');
             return;
         };

         setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
         addPostElem.classList.remove('visiable');
         postsWarapper.classList.add('visiable');
         addPostElem.reset();
     });

     setUser.initUser(toggleAuthDom);
     showAllPosts();
     toggleAuthDom();

 };

 document.addEventListener('DOMContentLoaded', () => {
     init();
 })
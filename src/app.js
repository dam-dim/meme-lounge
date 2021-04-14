import page from '../node_modules/page/page.mjs';
import {render} from "../node_modules/lit-html/lit-html.js";

import {homePage} from "./views/home.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";
import {catalogPage} from "./views/catalog.js";
import {createPage} from "./views/create.js";
import {detailsPage} from "./views/details.js";
import {editPage} from "./views/edit.js";
import {profilePage} from "./views/profile.js";
import {logout} from "./api/data.js";

const main = document.querySelector('main');

page('/', decorateContext, homePage);
page('/home', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/profile', decorateContext, profilePage);

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/');
});

setUserNav();

page.start();

function setUserNav() {
    const email = sessionStorage.getItem('email');
    if (email !== null) {
        document.querySelector('nav .user').style.display = '';
        document.querySelector('nav .guest').style.display = 'none';
        document.querySelector('.profile span').textContent = `Welcome, ${email}`;
    } else {
        document.querySelector('nav .user').style.display = 'none';
        document.querySelector('nav .guest').style.display = '';
    }
}

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}
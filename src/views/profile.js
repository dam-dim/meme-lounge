import { html } from '../../node_modules/lit-html/lit-html.js';
import {getMemesByAuthor} from "../api/data.js";

const profileTemplate = (data, user) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src= "/images/${user.gender === 'male' ? 'male' : 'female'}.png">
            <div class="user-content">
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
                <p>My memes count: ${data.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${data.length === 0 ? html`<p class="no-memes">No memes in database.</p>` : data.map(memeTemplate)}
        </div>
    </section>`;

const memeTemplate = (meme) => html`
    <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
        <a class="button" href="/details/${meme._id}">Description</a>
    </div>`;

export async function profilePage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const data = await getMemesByAuthor(userId);

    const email = sessionStorage.getItem('email');
    const username = sessionStorage.getItem('username');
    const gender = sessionStorage.getItem('gender');

    const user = { username, email, gender };

    ctx.render(profileTemplate(data, user));
}
import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllEvents } from "../data/cards.js";

const catalogTemplate = (cards) => html`

    <h2>Current Events</h2>
    ${cards.length > 0 ? html`
        <section id="dashboard">
            ${cards.map( card => cardTemplate(card))}
        </section> ` : html`<h4>No Events yet.</h4>`}   
`;

const cardTemplate = (card) => html`
    <div class="event">
    <img src=${card.imageUrl} alt="example1" />
    <p class="title">${card.name}</p>
    <p class="date">${card.date}</p>
    <a class="details-btn" href="/catalog/${card._id}">Details</a>
    </div>
`

export async function catalogPage(ctx){
    const cards = await getAllEvents();

    ctx.render(catalogTemplate(cards));
}
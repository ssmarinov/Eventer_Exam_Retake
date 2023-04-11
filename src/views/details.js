import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteEvent, getById } from "../data/cards.js";
import { getGoings, getUserGoings, going } from "../data/goings.js";
import { getUserData } from "../utils.js";

//TODO
const detailTemplate = (event, onDelete, onGoing) => html`

    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${event.imageUrl} alt="example1" />
            <p id="details-title">${event.name}</p>
            <p id="details-category"> Category: <span id="categories">${event.category}</span> </p>
            <p id="details-date"> Date:<span id="date">${event.date}</span></p>
            <div id="info-wrapper">
                <div id="details-description">
                    <span>${event.description}</span>
                </div>
            </div>

            <h3>Going: <span id="go">${event.going}</span> times.</h3>

            </div>
            ${event.isLogged ? html `
            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
                ${event.canEdit ? html`
                    <a href="/catalog/${event._id}/edit" id="edit-btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                `:null}
                ${event.canGoing ? html`
                <!--Bonus - Only for logged-in users ( not authors )-->
                <a @click=${onGoing} href="javascript:void(0)" id="go-btn">Going</a>`:null}
                
            </div> `:null}
    </section>
`;

//TODO
export async function detailPage(ctx){
    const id = ctx.params.id;
    const userData = getUserData();
    const event = await getById(id);  

    const hasGoing = await getUserGoings(id, userData._id);
    event.going = await getGoings(id);

    if(userData){
        event.isLogged = true;
        event.canEdit = userData._id == event._ownerId;
        event.canGoing = event.canEdit == false && hasGoing == 0;
    }
    
    ctx.render(detailTemplate(event, onDelete, onGoing));
    
    async function onDelete(){
        const choice = confirm('Are you sure?');
        if(choice){
            await deleteEvent(id);
            ctx.page.redirect('/catalog');
        }
    }

    async function onGoing(){
        await going(id);
        ctx.page.redirect(`/catalog/${id}`)
    }
}
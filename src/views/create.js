import { html } from "../../node_modules/lit-html/lit-html.js";
import { createEvent } from "../data/cards.js";
import { createSubmitHandler } from "../utils.js";

//TODO
const createTemplate = (onCreate) => html`
  <section id="create">
  <div class="form">
    <h2>Add Event</h2>
    <form class="create-form" @submit=${onCreate}>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Event"
      />
      <input
        type="text"
        name="imageUrl"
        id="event-image"
        placeholder="Event Image URL"
      />
      <input
        type="text"
        name="category"
        id="event-category"
        placeholder="Category"
      />


      <textarea
        id="event-description"
        name="description"
        placeholder="Description"
        rows="5"
        cols="50"
      ></textarea>
      
      <input
      type="text"
      name="date"
      id="date"
      placeholder="When?"
    />

      <button type="submit">Add</button>
    </form>
  </div>
  </section>
`;


//TODO
export function createPage(ctx){
    ctx.render(createTemplate(createSubmitHandler(onCreate)));

    async function onCreate({
        name,
        imageUrl, 
        category, 
        description, 
        date
      }){

        if([
            name,
            imageUrl, 
            category, 
            description, 
            date
          ].some(x => x=='')){
            return alert('All fiels are requred!');
          }

        const result = await createEvent({
            name,
            imageUrl, 
            category, 
            description, 
            date
          });

          ctx.page.redirect('/catalog');

    }
}
import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, updateEvent } from "../data/cards.js";
import { createSubmitHandler } from "../utils.js";

//TODO
const editTemplate = (event, onEdit) => html`
<section id="edit">
  <div class="form">
    <h2>Edit Event</h2>
    <form class="edit-form" @submit=${onEdit}>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Event"
        .value=${event.name}
      />
      <input
        type="text"
        name="imageUrl"
        id="event-image"
        placeholder="Event Image"
        .value=${event.imageUrl}
      />
      <input
        type="text"
        name="category"
        id="event-category"
        placeholder="Category"
        .value=${event.category}
      />


      <textarea
        id="event-description"
        name="description"
        placeholder="Description"
        .value=${event.description}
        rows="5"
        cols="50"
      ></textarea>
      
      <label for="date-and-time">Event Time:</label>
      <input
      type="text"
      name="date"
      id="date"
      placeholder="When?"
      .value=${event.date}
    />

      <button type="submit">Edit</button>
    </form>
  </div>
</section>
`;

//TODO
export async function editPage(ctx){
  const id = ctx.params.id;
  const event = await getById(id);
    ctx.render(editTemplate(event, createSubmitHandler(onEdit)));

    async function onEdit({
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
            return alert('All fiels are requred!')
          }

        const result = await updateEvent(id, {
          name,
          imageUrl, 
          category, 
          description, 
          date
          });

          ctx.page.redirect('/catalog');

    }
}
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-FTB-ET-WEB-PT/events`;

const state = {
    parties: [],
};

const partyList = document.querySelector('#parties');

const partyForm = document.querySelector("#addParty");
partyForm.addEventListener("submit", addParty)

async function render() {
    await getParties();
    renderParties();
}
render();

async function getParties() {
    try {
        const response = await fetch(API_URL)
        const data = await response.json();
        state.parties = data.data
    }
    catch (error) {
        console.log(error)
    }
}

async function deleteParty(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`{
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`Deletion Failed:${await response.text()}`)
        }
        state.parties = state.parties.filter(party => party.id !== id)
        renderParties();
    } catch (error) {
        console.error(error)
    }
}
function renderParties() {
    partyList.innerHTML = "";
    for (let i = 0; i < state.parties.length; i++) {
      const currentParty = state.parties[i];

      const formattedDate = new Date(currentParty.date).toLocaleDateString('en-US', {

        month: 'long',
          day: 'numeric',
          year: 'numeric'
      });

      const partyItem = document.createElement("li");
  
    
      const partyInfo = `
        <ul>
          <li>${currentParty.name}</li>
          <li>${currentParty.location}</li>
          <li>${currentParty.description}</li
          <li>${formattedDate}</li> 
        </ul>`;
      partyItem.innerHTML = partyInfo;
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteParty(currentParty.id));
  
      partyItem.appendChild(deleteButton);
      partyList.appendChild(partyItem);
    }
}
async function addParty(event) {
    event.preventDefault();
    
    const nameInput = document.querySelector('input[name="name"]')
  const descriptionPartyInput = document.querySelector('input[name="descriptionOfParty"]')
  const dateInput = document.querySelector('input[name="date"]')
    const locationInput = document.querySelector('input[name="location"]')
    try {
        //await pauses the execution of the code until fetch completes
        const response = await fetch(API_URL, {
          //this is an options object, this specifies its being sent to the server
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            description,
            date,
            location,
          }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to create party");
        }
    
        render();
      } catch (error) {
        console.error(error);
      }
    }
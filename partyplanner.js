const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-FTB-ET-WEB-PT/events`;

const state = {
    parties: [],
};

const partyList = document.querySelector('#parties');
const partyForm = document.querySelector("#addParty");
partyForm.addEventListener("submit", addParty);

async function render() {
    await getParties();
    renderParties();
}
render();

async function getParties() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        state.parties = data.data;
    } catch (error) {
        console.log(error);
    }
}

async function deleteParty(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Deletion Failed: ${await response.text()}`);
        }
        state.parties = state.parties.filter(party => party.id !== id);
        renderParties();
    } catch (error) {
        console.error(error);
    }
}

function renderParties() {
    partyList.innerHTML = "";
    for (let i = 0; i < state.parties.length; i++) {
        const currentParty = state.parties[i];

        const formattedDate = new Date(currentParty.date).toLocaleDateString('en-US', {

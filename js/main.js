console.log("FINWARDANA Loaded");

const dataPath =
window.location.pathname.includes("/games/") ||
window.location.pathname.includes("/tools/") ||
window.location.pathname.includes("/invitations/")
? "../data.json"
: "data.json";

fetch(dataPath)
.then(res => res.json())
.then(data => {

const recent = document.getElementById("recent-slider");
const games = document.getElementById("games-slider");
const tools = document.getElementById("tools-slider");
const invitations = document.getElementById("invitations-slider");

const gamesList = document.getElementById("games-list");
const toolsList = document.getElementById("tools-list");
const invitationsList = document.getElementById("invitations-list");

function createCard(item){

return `
<a href="/${item.url}" class="card">

<div
class="thumb"
style="background-image:url('/${item.thumb}')">
</div>

<h3>${item.title}</h3>

</a>
`;

}

/* HOME - RECENTLY ADDED */

if(recent){

recent.innerHTML = data
.slice(0,10)
.map(createCard)
.join("");

}

/* HOME - GAMES */

if(games){

games.innerHTML = data
.filter(item => item.type === "game")
.map(createCard)
.join("");

}

/* HOME - TOOLS */

if(tools){

tools.innerHTML = data
.filter(item => item.type === "tool")
.map(createCard)
.join("");

}

/* HOME - INVITATIONS */

if(invitations){

invitations.innerHTML = data
.filter(item => item.type === "invitation")
.map(createCard)
.join("");

}

/* PAGE - GAMES */

if(gamesList){

gamesList.innerHTML = data
.filter(item => item.type === "game")
.map(createCard)
.join("");

}

/* PAGE - TOOLS */

if(toolsList){

toolsList.innerHTML = data
.filter(item => item.type === "tool")
.map(createCard)
.join("");

}

/* PAGE - INVITATIONS */

if(invitationsList){

invitationsList.innerHTML = data
.filter(item => item.type === "invitation")
.map(createCard)
.join("");

}

})
.catch(err => {

console.error("JSON ERROR:", err);

});

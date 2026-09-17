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
<a href="${item.url}" class="card">
<div class="thumb"
style="background-image:url('${item.thumb}')">
</div>
<h3>${item.title}</h3>
</a>
`;

}

/* HOME - RECENTLY ADDED */

if(recent){

data
.slice(0,10)
.forEach(item=>{

recent.innerHTML += createCard(item);

});

}

/* HOME - GAMES */

if(games){

data
.filter(item=>item.type==="game")
.forEach(item=>{

games.innerHTML += createCard(item);

});

}

/* HOME - TOOLS */

if(tools){

data
.filter(item=>item.type==="tool")
.forEach(item=>{

tools.innerHTML += createCard(item);

});

}

/* HOME - INVITATIONS */

if(invitations){

data
.filter(item=>item.type==="invitation")
.forEach(item=>{

invitations.innerHTML += createCard(item);

});

}

/* PAGE - GAMES */

if(gamesList){

data
.filter(item=>item.type==="game")
.forEach(item=>{

gamesList.innerHTML += createCard(item);

});

}

/* PAGE - TOOLS */

if(toolsList){

data
.filter(item=>item.type==="tool")
.forEach(item=>{

toolsList.innerHTML += createCard(item);

});

}

/* PAGE - INVITATIONS */

if(invitationsList){

data
.filter(item=>item.type==="invitation")
.forEach(item=>{

invitationsList.innerHTML += createCard(item);

});

}

})
.catch(err=>{

console.error(err);

});

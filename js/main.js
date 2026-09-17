console.log("FINWARDANA Loaded");
fetch("data.json")
.then(res => res.json())
.then(data => {

const recent = document.getElementById("recent-slider");
const games = document.getElementById("games-slider");
const tools = document.getElementById("tools-slider");
const invitations = document.getElementById("invitations-slider");

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

data.slice(0,10).forEach(item=>{
if(recent){
recent.innerHTML += createCard(item);
}
});

data
.filter(item => item.type==="game")
.forEach(item=>{
if(games){
games.innerHTML += createCard(item);
}
});

data
.filter(item => item.type==="tool")
.forEach(item=>{
if(tools){
tools.innerHTML += createCard(item);
}
});

data
.filter(item => item.type==="invitation")
.forEach(item=>{
if(invitations){
invitations.innerHTML += createCard(item);
}
});

});

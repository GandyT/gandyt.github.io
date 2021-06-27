import { projectData } from "./resource/projects.js";

window.onload = () => {
    console.log(`####################################\nWELCOME TO GANDY.IO\n####################################`);
    var projects = document.getElementById("projectsCont");

    if (!projects) return console.log("Missing Projects Cont");

    for (let key of Object.keys(projectData)) {
        projects.innerHTML += `<div class="projectTile">
            <img src="${projectData[key].thumbnail} class="projectThumb">"
            <div class="projectTitle">${key}</div>
        </div>`;
    }
}
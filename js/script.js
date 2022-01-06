/* Global Variables */
const baseUrl = "https://www.reddit.com/r/";

const dropDownMenu = document.getElementById("dropDown");
const container = document.getElementById("container");
const defaultD = document.getElementById("default");
const heading = document.getElementById("heading");
let section;


// Create a new date instance dynamically with JS

// Util Functions 
//Section for all card
const CreateSection = () => {
    section = document.createElement('div');
    section.classList.add("mt-3");
    section.classList.add("section-grid");
    container.appendChild(section);
}
// Creating Modal
const createModal = (id,src) => {
    const modal = document.createElement('div');
    modal.classList.add("modal");
    modal.classList.add("fade");
    modal.setAttribute("id",id);

    const modalDialog = document.createElement('div');
    modalDialog.classList.add("modal-dialog");

    const modalBody = document.createElement('div');
    modalBody.classList.add("modal-body");

    const img = document.createElement('img');
    img.src = src;
    img.setAttribute("alt","Loading");

    const btn = document.createElement('button');
    btn.classList.add("btn");
    btn.classList.add("btn-danger");
    btn.setAttribute("data-dismiss","modal");
    btn.innerHTML = "Close"; 

    modalBody.appendChild(img);
    modalDialog.appendChild(modalBody);
    modalDialog.appendChild(btn);

    modal.appendChild(modalDialog);
    section.appendChild(modal);

}
// Creating Card
const createCard = (src,tit,id,numComments) =>{
    const card = document.createElement('div');
    card.classList.add("card");
    card.classList.add("mb-4");
    
    const img = document.createElement('img');
    img.src = src;
    img.classList.add("card-img-top");
    img.setAttribute("data-toggle","modal");
    img.setAttribute("data-target",`#${id}`);

    const cardBody = document.createElement('div');
    cardBody.classList.add("card-body");

    const title = document.createElement('h5');
    title.classList.add("card-title");
    title.innerHTML = tit;

    const comment = document.createElement('a');
    comment.classList.add("btn");
    comment.classList.add("btn-primary");
    comment.innerHTML = `Number of Comments ${numComments}`;

    createModal(id,src);

    cardBody.appendChild(title);
    cardBody.appendChild(comment);
    
    card.appendChild(img);
    card.appendChild(cardBody);

    section.appendChild(card);

}

// Fetching Function
const getRedditInfo = async(name) =>{
    return await fetch(`${baseUrl}${name}.json`)
}
// Rendering all element to DOM
const renderElements = async(evt) => {
    let name = evt.target.getAttribute('data-name');
    heading.innerHTML = evt.target.innerHTML;
    if(section){
        section.remove();
    }
    CreateSection();
    try{
    const response = await getRedditInfo(name);
    const info = await response.json();

    let noOfElement = 0;
    let myset = new Set();

    while(noOfElement < 6){
        let imageIdx = Math.floor(Math.random() * info.data.children.length); 
        let url = info.data.children[imageIdx].data.thumbnail;
        let title = info.data.children[imageIdx].data.title;

        if(url == "self" || myset.has(imageIdx) == true){ continue; }

        let numComments = info.data.children[imageIdx].data.num_comments;
        createCard(url,title,name+noOfElement,numComments);

        noOfElement++;
        myset.add(imageIdx);
    }
    }catch(err){
        console.log(err);
    }
}

dropDownMenu.addEventListener('click',(evt)=>{
    renderElements(evt);
});
//default display
defaultD.click();
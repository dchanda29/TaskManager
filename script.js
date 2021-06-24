const taskContainer = document.querySelector(".task_container");

var globalStore = []; // some values []

const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4">
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success">
      <i class="fas fa-pencil-alt"></i>
    </button>
    <button type="button" class="btn btn-outline-danger id=${taskData.id} onclick="deleteCard.apply(this,arguements)">
      <i class="fas fa-trash-alt id=${taskData.id} onclick="deleteCard.apply(this,arguements)"></i>
    </button>
  </div>
  <img
    src=${taskData.imageUrl}
    class="card-img-top"
    alt="image"
  />
  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle}</h5>
    <p class="card-text">
      ${taskData.taskDescription}
    </p>
    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  <div class="card-footer">
    <button type="button" class="btn btn-outline-primary float-end">
      Open Task
    </button>
  </div>
</div>
</div>
`;

const loadInitialCardData = () => {
    // localstorage to get tasky card data
    const getCardData = localStorage.getItem("tasky");

    // convert from string to normal object
    const { cards } = JSON.parse(getCardData);

    // loop over those array of task object to create HTML card, inject it to DOM
    cards.map((cardObject) => {

        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

        // update our globalStore
        globalStore.push(cardObject);
    })



};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, // unique number for id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };

    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

    globalStore.push(taskData);

    localStorage.setItem("tasky", JSON.stringify({ cards: globalStore })); // an object


};

const deleteCard = (event) => {
    event = window.event;
    //id
    const targetID = event.target.id;
    const tagname = event.target.tagName;
    //match the id of the element with the id inside the 
    //given localStore
    //if match found reverse

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
    localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));


    //we have updated cards
    /*contact the parent----
    parent of cards is task_container*/


    if (tagname === "BUTTON") {
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode); //needs exact element
    } else {
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
};

// Issues
// Edit the card
// Open the card
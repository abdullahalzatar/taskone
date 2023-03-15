const form = document.querySelector(".inviteForm");
const firstname = document.getElementsByClassName("firstname");
const email = document.getElementsByClassName("email");
const feed = document.getElementsByClassName("feed");
const main = document.querySelector(".main");
const ul = document.querySelector(".invitedList");

let feedbackcom=[];
let feedbackcomrem=[];

function User(firstname, email, feed) {
  this.firstname = firstname;
  this.email = email;
  this.feed = feed;
  feedbackcom.push(this);
}

User.prototype.render = function () {
 
  // append
  const li = createLi(`${this.feed}`,`${this.email}`);

  // add text content
  ul.appendChild(li);

  
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (
    feed[0].value === "" ||
    email[0].value === "" ||
    firstname[0].value === ""
  ) {
    alert("Enter the name please!!!");
  } else {
    let newItem = new User(firstname[0].value, email[0].value,feed[0].value );
    newItem.render();
    setItem(feedbackcom); 
  }
});


function createLi(feed,email) {

  
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = feed ;
    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "remove";

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(removeBtn);

    return li;
  
}

ul.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
   
    const button = event.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    console.log(button.parentNode.querySelector("span").textContent)
    if (button.textContent === "remove") {
      ul.removeChild(li);
      localStorage.removeItem(li);
      feedbackcomrem=[]
      feedbackcom.map( (value) => {
        if(value.feed === button.parentNode.querySelector("span").textContent){
        }
        else{
          feedbackcomrem.push(value)
        
        }
        
      });
      feedbackcom=feedbackcomrem;
      setItem();
    } else if (button.textContent === "edit") {
      const span = li.firstElementChild;
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      li.insertBefore(input, span);
      li.removeChild(span);
      button.textContent = "save";
    } else if (button.textContent === "save") {
      const input = li.firstElementChild;
      const span = document.createElement("span");
      span.textContent = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);
      button.textContent = "edit";
    }
  }
});

function setItem() {
  let stringifiedArr= JSON.stringify(feedbackcom);

  localStorage.setItem("User",stringifiedArr);
}


function getItem() {
  let data=localStorage.getItem("User");

  let parsedArr= JSON.parse(data);

  for (let i = 0; i < parsedArr.length; i++) {
      const userfeed = parsedArr[i];
      let newUserInstance= new User(userfeed.firstname,userfeed.email,userfeed.feed);
      newUserInstance.render();
  }
}



getItem();

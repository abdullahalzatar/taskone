const maincard = document.querySelector(".maincard");

let creptoarray = [];

function Card(rank, creptoname, pice) {
    this.rank = rank;
    this.creptoname = creptoname;
    this.pice = pice;
    creptoarray.push(this);
  }

  Card.prototype.render = function () {
    // append
    const carddiv = creatediv(`${this.rank}`, `${this.creptoname}`, `${this.pice}`);
  
    // add text content
    maincard.appendChild(carddiv);
  };

  function creatediv(rank, creptoname,pice) {
    const div = document.createElement("div");
    div.setAttribute("class", "carddiv")

    const rankp = document.createElement("p");
    rankp.setAttribute("class", "title")
    rankp.textContent = rank;

    const creptonamep = document.createElement("p");
    creptonamep.setAttribute("class", "rank")
    creptonamep.textContent = "Rank : " + creptoname;

    const picesp = document.createElement("p");
    picesp.setAttribute("class", "price")
    picesp.textContent = pice;
   
  
    div.appendChild(rankp);
    div.appendChild(creptonamep);
    div.appendChild(picesp);
   
  
    return div;
  }

async function getUsers() {
    let url = 'users.json';
    try {
        let res = await fetch("https://api.coincap.io/v2/assets");
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    let users = await getUsers();

    users.data.forEach(user => {
       console.log(user.priceUsd) 
       let newUserInstance = new Card(
        user.name,
        user.rank,
        parseFloat(user.priceUsd).toFixed(2)
      );
      newUserInstance.render();
    });

   
}

renderUsers();


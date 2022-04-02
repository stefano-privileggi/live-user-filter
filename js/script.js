const result = document.getElementById("result");
const searchInput = document.getElementById("search-input");
const userList = [];

searchInput.addEventListener('input', (event) => {
    filterData(event.target.value);
})

function filterData(searchTerm) {
    userList.forEach(user => {
        user.innerText.toLowerCase().includes(searchTerm.toLowerCase()) 
            ? user.classList.remove('user__hide')
            : user.classList.add('user__hide'); 
    })
}

async function getData() {
  const response = await fetch("https://randomuser.me/api?results=500");

  const { results } = await response.json();

  results.innerHTML = "";

  results.forEach((user) => {
    const li = document.createElement("li");
    li.classList.add('user');
    userList.push(li);
    li.innerHTML = `
            <img 
                class="user__image" 
                src=${user.picture.large}
                alt=${user.name.first}
            />
            <div class="user__info">
                <h4 class="user__name">${user.name.first} ${user.name.last}</h4>
                <p class="user__location">${user.location.city}, ${user.location.country}</p>
            </div>  
        `;
    result.appendChild(li)
  });
}

getData();
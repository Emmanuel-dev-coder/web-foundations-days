let loadButton = document.querySelector("#load-users");
let statusMessage = document.querySelector("#status");
let usersList = document.querySelector("#users-list");

let users = [];


function renderUsers(list) {
    usersList.textContent = "";

    for (let user of list) {
        let listItem = document.createElement("li");

        let name = document.createElement("h3");
        name.textContent = user.name;

        let email = document.createElement("p");
        email.textContent = "Email: " + user.email;

        let city = document.createElement("p");
        city.textContent = "City: " + user.address.city;

        let company = document.createElement("p");
        company.textContent = "Company: " + user.company.name;

        listItem.appendChild(name);
        listItem.appendChild(email);
        listItem.appendChild(city);
        listItem.appendChild(company);

        usersList.appendChild(listItem);
    }
}


async function loadUsers() {
    loadButton.disabled = true;
    statusMessage.textContent = "Loading users...";

    try {
        let response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        
        if (!response.ok) {
            throw new Error("Failed to load users.");
        }

        users = await response.json();

        renderUsers(users);

        statusMessage.textContent = "Users loaded successfully.";
    } catch (error) {
        statusMessage.textContent = "Error loading users. Please try again.";
    } finally {
        loadButton.disabled = false;
    }
}

loadButton.addEventListener("click", loadUsers);


let filterInput = document.querySelector("#filter-input");

filterInput.addEventListener("input", function () {
    let searchText = filterInput.value.toLowerCase();

    let filteredUsers = users.filter(function (user) {
        return user.name.toLowerCase().includes(searchText);
    });

    renderUsers(filteredUsers);

    if (filteredUsers.length === 0 && searchText !== "") {
        usersList.textContent = "No users match your filter.";
    }
});


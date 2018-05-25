// Task 1

const getAllUsersBtn = document.querySelector(".js-get-all-users");
const getUserByIdBtn = document.querySelector(".js-get-user-by-id");
const addUserBtn = document.querySelector(".js-add-user");
const removeUserBtn = document.querySelector(".js-remove-user");
const updateUserBtn = document.querySelector(".js-update-user");

const getUserByIdInput = document.querySelector("#get-user-by-id");
const addUserNameInput = document.querySelector("#add-user-name");
const addUserAgeInput = document.querySelector("#add-user-age");
const removeUserByIdInput = document.querySelector("#remove-user-by-id");
const updateUserByIdInput = document.querySelector("#update-user-id");
const updateUserNameInput = document.querySelector("#update-user-name");
const updateUserAgeInput = document.querySelector("#update-user-age");

const apiUrl = "https://test-users-api.herokuapp.com/users/";

const tBody = document.querySelector("#js-tbody");
const htmlTpl = document.querySelector("#table-row").textContent.trim();
const compiled = _.template(htmlTpl);

// ---------------------------------------------------------
const updateViewAll = data => {
    let htmlString = "";

    data.forEach(user => {
      htmlString += compiled(user);
    });

    tBody.innerHTML = htmlString;
};

function getAllUsers(evt) {
  evt.preventDefault();
  fetch(apiUrl)
    .then(response => {
      if (response.ok) return response.json();

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
      updateViewAll(data.data);
    })
    .catch(error => {
      console.error("Error: ", error);
    });
}

getAllUsersBtn.addEventListener("click", getAllUsers);
// ---------------------------------------------------------

const updateViewSingle = data => {
  let htmlString = "";

  htmlString += compiled(data);

  tBody.innerHTML = htmlString;
};

function getUserById(evt) {
  evt.preventDefault();
  const userId = getUserByIdInput.value;
  
  fetch(`${apiUrl}${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) return response.json();

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
      updateViewSingle(data.data);
    })
    .catch(error => {
      console.error("Error: ", error);
    });

  getUserByIdInput.value = '';
}

getUserByIdBtn.addEventListener("click", getUserById);

// ---------------------------------------------------------

function addUser(evt) {
  evt.preventDefault();
  const userName = addUserNameInput.value;
  const userAge = addUserAgeInput.value;

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ name: userName, age: userAge }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) return response.json();

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(console.log(`User (name - ${userName}, age - ${userAge}) is created`))
    .catch(error => {
      console.error("Error: ", error);
    });

  addUserNameInput.value = "";
  addUserAgeInput.value = "";
}

addUserBtn.addEventListener("click", addUser);
// addUserBtn.addEventListener("click", getAllUsers);
// ---------------------------------------------------------

function removeUser(evt) {
  evt.preventDefault();
  const userId = removeUserByIdInput.value;

  fetch(`${apiUrl}${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) return response.json();

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(console.log(`User with ID${userId} is deleted`))
    .catch(error => {
      console.error("Error: ", error);
    });

  removeUserByIdInput.value = "";
}

removeUserBtn.addEventListener("click", removeUser);
// removeUserBtn.addEventListener("click", getAllUsers);
// ---------------------------------------------------------

function updateUser(evt) {
  evt.preventDefault();
  const userId = updateUserByIdInput.value;
  const userName = updateUserNameInput.value;
  const userAge = updateUserAgeInput.value;

  fetch(`${apiUrl}${userId}`, {
    method: "PUT",
    body: JSON.stringify({ name: userName, age: userAge }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) return response.json();

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(console.log(`User with ID${userId} is updated (new name - ${userName}, new age - ${userAge})`))
    .catch(error => {
      console.error("Error: ", error);
    });

  updateUserByIdInput.value = "";
  updateUserNameInput.value = "";
  updateUserAgeInput.value = "";
}

updateUserBtn.addEventListener("click", updateUser);
// updateUserBtn.addEventListener("click", getAllUsers);
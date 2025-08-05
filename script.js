const loginForm = document.getElementById("loginForm");
const logout = document.getElementById("logoutBtn");
const stepsForm = document.getElementById("stepsForm");
const leaderboard = document.getElementById("leaderboard");
const options = document.getElementById("optionBtn");
const backFromOptions = document.getElementById("backBtnOptions");
const registerNewUser = document.getElementById("registerNewUser");
const backFromRegister = document.getElementById("backBtnRegister");
const createNewUser = document.getElementById("createNewUser");  
const savePasswordBtn = document.getElementById("saveBtnChangePassword");
const changePasswordInput = document.getElementById("changePassword");
const togglePasswordBtn = document.getElementById("togglePassword");
const changePasswordBtn = document.getElementById("changePasswordBtn");
const backFromChangePassword = document.getElementById("backBtnChangePassword");
const changeGroupInput = document.getElementById("changeGroup");
const backFromChangeGroup = document.getElementById("backBtnChangeGroup");
const saveGroupBtn = document.getElementById("saveBtnChangeGroup");
const toggleLoginPasswordBtn = document.getElementById("toggleLoginPassword");
const toggleRegisterPasswordBtn = document.getElementById("toggleRegisterPassword");
const changeStepsOptions = document.getElementById("stepDate");
const saveStepsBtn = document.getElementById("saveBtnChangeSteps");
const changeStepsInput = document.getElementById("changeSteps");

let username = null;
let users = [];

document.getElementById("stepDate").valueAsDate = new Date();  // Shows todays date in the Calendar window
document.getElementById("stepChangeDate").valueAsDate = new Date();  // Shows todays date in the Calendar window

// ----- Change between pages ----- 

function showOnly(...idsToShow) {
  const allSections = [
    "loginForm",
    "stepsForm",
    "individualLeaderboardSection",
    "groupLeaderboardSection",
    "options",
    "registrationForm",
    "changePasswordOptions",
    "changeGroupOptions",
    "changeStepsOptions",
    "stepLog"
  ];

  allSections.forEach(id => {
    const el = document.getElementById(id); // This will go through each ID in the array "allSections" above, one by one. So "id" will be "loginForm" the first loop, "stepsForm" the second loop, etc
    if (el) el.style.display = idsToShow.includes(id) ? "block" : "none"; 
  
  /*
  
  if(el), this checks whether the element was actually found in the HTML. 
  
  el.style.display = idsToShow.includes(id) ? "block" : "none";    this line is where the show/hide logic happens.

  "idsToShow" is the array of IDs you passed in when calling showOnly(...)
  "idsToShow.includes(id)" checks if this current section ID should be visible.

  For example, if you call

  "showOnly("stepsForm", "options");" then:

    "idsToShow.includes("stepsForm")" -> true -> show it
    "idsToShow.includes("loginForm")" -> false -> hide it
  
  */ 
  });

  // Show or hide the logout button. "const shouldShowLogout" checks if we see "stepsForm" or "individualLeaderboardSection" or "options". If any of these are shown, it returns true 
  const shouldShowLogout = idsToShow.includes("stepsForm") || idsToShow.includes("individualLeaderboardSection") || 
  idsToShow.includes("options") || idsToShow.includes("changePasswordOptions") || idsToShow.includes("changeGroupOptions") || idsToShow.includes("changeStepsOptions") || idsToShow.includes("stepLog");

  // If "shouldShowLogout" is true it picks "block", else it picks "none"
  document.getElementById("logoutBtn").style.display = shouldShowLogout ? "block" : "none";

 const shouldShowOptions = idsToShow.includes("stepsForm") || idsToShow.includes("individualLeaderboardSection") || 
 idsToShow.includes("options") || idsToShow.includes("changePasswordOptions") || idsToShow.includes("changeGroupOptions") || idsToShow.includes("changeStepsOptions") || idsToShow.includes("stepLog");
  document.getElementById("optionBtn").style.display = shouldShowOptions ? "block" : "none";

}





// ----- Login ----- 
loginForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Stop the page from refreshing

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const enteredUsername = usernameInput.value.trim();
  const enteredPassword = passwordInput.value.trim();


  // Load users from localStorage
  users = JSON.parse(localStorage.getItem("users")) || [];

  // Try to find a user with matching name and password
  const foundUser = users.find(
    user => user.name === enteredUsername && user.password === enteredPassword
  );

  if (foundUser) {
    // Valid user — log them in
    username = foundUser.name;
    localStorage.setItem("username", username); // Keep track of who's logged in

    console.log("User logged in:", username);
    showOnly("stepsForm", "individualLeaderboardSection");
  } else {
    // Invalid login
    alert("Incorrect username or password. Please try again.");
    usernameInput.value = "";
    passwordInput.value = "";
  }
});

  // Toggle password visibility (Login)

let toggleLoginPasswordListenerAdded = false;

if (!toggleLoginPasswordListenerAdded) {
  toggleLoginPasswordBtn.addEventListener("click", function () {
    const isPassword = password.type === "password";
    password.type = isPassword ? "text" : "password";
    toggleLoginPasswordBtn.textContent = isPassword ? "Hide" : "Show";
  });

  toggleLoginPasswordListenerAdded = true;
}



// ----- Register new user page ----- 

registerNewUser.addEventListener("click", function(event){
  event.preventDefault(); // stop the page from refreshing

  showOnly("registrationForm");

  

});


// ----- Create new user -----

createNewUser.addEventListener("click", function(event){
  event.preventDefault(); // stop the page from refreshing


  // Get input elements
  const newUsernameInput = document.getElementById("newUsername");
  const newPasswordInput = document.getElementById("newPassword");
  const newGroupInput = document.getElementById("group");

  // Validate element presence
  if (!newUsernameInput || !newPasswordInput || !newGroupInput) {
    alert("One or more input fields are missing.");
    return;
  }

  // Read and trim values
  const newUsername = newUsernameInput.value.trim();
  const newPassword = newPasswordInput.value.trim();
  const newGroup = newGroupInput.value.trim();

  // Validate values
  if (!newUsername || !newPassword || !newGroup) {
    alert("Please fill in all fields.");
    return;
  }

  // Get current users list or initialize new
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if username is already taken
  const usernameExists = users.some(user => user.name === newUsername);
  if (usernameExists) {
    alert("Username already exists. Please choose another.");
    return;
  }

  // Add new user
  users.push({
    name: newUsername,
    password: newPassword,
    group: newGroup.toUpperCase(),
    steps: 0
  });

  // Save updated users list
  localStorage.setItem("users", JSON.stringify(users));

  alert("User created successfully! Please log in.");

  // Go back to login form
  showOnly("loginForm");

  // Optionally, clear inputs
  newUsernameInput.value = "";
  newPasswordInput.value = "";
  newGroupInput.value = "";  
});

  // Toggle password visibility (Register)

let toggleRegisterPasswordListenerAdded = false;

if (!toggleRegisterPasswordListenerAdded) {
  toggleRegisterPasswordBtn.addEventListener("click", function () {
    const ispassword = newPassword.type === "password";
    newPassword.type = ispassword ? "text" : "password";
    toggleRegisterPasswordBtn.textContent = ispassword ? "Hide" : "Show";
  });

  toggleRegisterPasswordListenerAdded = true;
}


// ----- Back from Register ----- 
// When pressing the Back button, you come back to the "Add steps" window


backFromRegister.addEventListener("click", function(event) {
  event.preventDefault(); // stop the page from refreshing
      showOnly("loginForm");

});



// ----- Logout ----- 
// When pressing logout, you just see the loginForm again

logout.addEventListener("click", function(event) {
  event.preventDefault(); // stop the page from refreshing
  localStorage.removeItem("username");  // Remove login info
  localStorage.removeItem("password");

      showOnly("loginForm");
    
});

// ----- Options ----- 
// When pressing the Options button, you see the options window



options.addEventListener("click", function(event) {
  event.preventDefault(); // stop the page from refreshing
    showOnly("options");




// ----- Change password window -----

changePasswordBtn.addEventListener("click", function(event){
  event.preventDefault();
    showOnly("changePasswordOptions");

    let togglePasswordListenerAdded = false;

if (!togglePasswordListenerAdded) {
    togglePasswordBtn.addEventListener("click", function () {
      const isPassword = changePasswordInput.type === "password";
      changePasswordInput.type = isPassword ? "text" : "password";
      togglePasswordBtn.textContent = isPassword ? "Hide" : "Show";
    });

    togglePasswordListenerAdded = true;
  }
});

});

backFromChangePassword.addEventListener("click", function(event){
  event.preventDefault();
    showOnly("options");

});

// ----- Save new password -----

savePasswordBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if(changePasswordInput.value.trim() === ""){
    
  // You can still reference `changePasswordInput` here because it's in outer scope
  console.log("The password cannot be blank!");

  }
  else {

    console.log("New password is:", changePasswordInput.value);
    changePasswordInput.value = "";
  }

});


// ----- Change group window -----

changeGroupBtn.addEventListener("click", function(event){
  event.preventDefault();
    showOnly("changeGroupOptions");

});

backFromChangeGroup.addEventListener("click", function(event){
  event.preventDefault();
    showOnly("options");

});

// ----- Save new group -----

saveGroupBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if(changeGroupInput.value.trim() === ""){
    
  
  console.log("The group name cannot be blank!");

  }
  else {
    
    console.log("New group is:", changeGroupInput.value.toUpperCase()); // Only uppercase is allowed
    changeGroupInput.value = "";
  }

});



// ----- Change steps window -----

changeStepsBtn.addEventListener("click", function(event){
  event.preventDefault();
    showOnly("changeStepsOptions", "stepLog");
    showStepLogDisplay();

});

backBtnChangeSteps.addEventListener("click", function(event){
  event.preventDefault();
    showOnly("options");

});

function showStepLogDisplay() {
  const stepLog = JSON.parse(localStorage.getItem("stepLog")) || {};
  const displayDiv = document.getElementById("stepLogDisplay");

  if (Object.keys(stepLog).length === 0) {
    displayDiv.innerHTML = "<p>No steps logged yet.</p>";
    return;
  }

  // ✅ Sort the dates chronologically
  const sortedDates = Object.keys(stepLog).sort();

  // Build HTML output
  let output = "<ul>";
  for (const date of sortedDates) {
    output += `<li><strong>${date}</strong>: ${stepLog[date]} steps</li>`;
  }
  output += "</ul>";

  displayDiv.innerHTML = output;
}





// ----- Save steps -----

saveStepsBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const date = document.getElementById("stepChangeDate").value;
  const steps = parseInt(document.getElementById("changeSteps").value);



  if (!date || isNaN(steps)) {
    alert("Please enter both a valid date and number of steps.");
    return;
  }

// Get current step log or create a new object (empty)

  const stepLog = JSON.parse(localStorage.getItem("stepLog")) || {};

// Overwrite steps for the selected date

  stepLog[date] = steps;

// Save updated step log back to localStorage

  localStorage.setItem("stepLog", JSON.stringify(stepLog));

// Recalculate total steps for current user

  const totalSteps = Object.values(stepLog).reduce((sum, val) => sum + val, 0);

// Update user in users array

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex(u => u.name === username);

  if (userIndex !== -1) {
    users[userIndex].steps = totalSteps;
    localStorage.setItem("users", JSON.stringify(users));
  }

// Show confirmation

  alert(`✅ Updated ${steps} steps for ${date}`);

// Reset form
  document.getElementById("changeSteps").value = "";
  document.getElementById("stepChangeDate").value = "";

// Refresh displayed step log
  showStepLogDisplay();
  updateIndividualLeaderboard();
  updateGroupLeaderboard();
});





// ----- Back from Options ----- 
// When pressing the Back button, you come back to the "Add steps" window


backFromOptions.addEventListener("click", function(event) {
  event.preventDefault(); // stop the page from refreshing
      showOnly("stepsForm", "individualLeaderboardSection");

});



// ----- Step input ----- 
  updateIndividualLeaderboard();
  updateGroupLeaderboard(); // Shows the current leaderboard

stepsForm.addEventListener("submit", function(event) {
  event.preventDefault(); // stop the page from refreshing
  
 

  if (!username) {  // If username is not found in the localStorage, then the user cannot add steps
    alert("You're not logged in!");
    return;
  }

  const stepsInput = document.getElementById("steps"); // Grabs the input data in the "steps" input box
  const steps = parseInt(stepsInput.value); // Reads the value, parses (removed decimals) and adds it to steps
  const date = document.getElementById("stepDate").value;

    if (!steps || !date) {
    alert("Please enter both steps and a date.");
    return;
  }

  // Show confirmation
  document.getElementById("stepFeedback").textContent = `✅ You logged ${steps} steps for ${date}`;


  // Log the steps to later show in Option to allow for editing

let stepLog = JSON.parse(localStorage.getItem("stepLog")) || {};
stepLog[date] = steps;
localStorage.setItem("stepLog", JSON.stringify(stepLog));


  if (!isNaN(steps) && steps > 0) { // If steps is not NaN and steps is higher than 0, then this will run
    users = JSON.parse(localStorage.getItem("users")) || []; // Loads the users from the localStorage. JSON.parse() turns the saved string back into an array of user objects

    let userIndex = users.findIndex(u => u.name === username); // This finds the position of the current user in the array. If it returns -1, the user doesn't exist yet
      
      if (userIndex !== -1) { // If the user is found, it will not show -1 and therefore run this
        users[userIndex].steps += steps; // This adds the steps to their total
      } else {
        users.push({ name: username, steps }); // If the user was not found, add a new object with their name and step count
      }

    localStorage.setItem("users", JSON.stringify(users)); // Save the updated list of users back to localStorage. JSON.stringigy() converts the object into a string so it can be stored

  updateIndividualLeaderboard();
  updateGroupLeaderboard(); // Updates the leaderboard with the added steps, See function updateLeaderboard()


  }


  stepsInput.value = ""; // Clear input
});


// ----- Update individual leaderboard function ----- 

function updateIndividualLeaderboard() {
  const individualLeaderboardBody = document.querySelector("#individualLeaderboard tbody"); // This finds the <tbody> inside the table with id = "individualLeaderboard". This is where the rows with each user will be shown
  individualLeaderboardBody.innerHTML = ""; // Clears out any previous content inside the leaderboard table. This is important to avoid duplicating rows every time you update the list

  users = JSON.parse(localStorage.getItem("users")) || []; // Loads the users array from localStorage. JSON.parse() converts the saved string back into a real JavaScript array.
  // "|| []" is a fallback in case there's no data saved yet (like on the first visit)

  users.sort((a, b) => b.steps - a.steps); // Sorts the user array from highest to lowest step count. If b.steps is greater than a.steps, b comes first

  users.forEach((user, index) => { // Loops through each user in the sorted array. "user" is the object. "index" is the position in the array (0 for first, 1 for second, etc.)
    const row = document.createElement("tr"); // Creates a new table row <tr> to hold the user's data
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.steps}</td>
    `;  // Fills the row with HTML. Rank number: ${index + 1} (since arrays start at 0)

/*
Example: 
<tr>
  <td>1</td>
  <td>Anna</td>
  <td>2500</td>
</tr>
*/
    individualLeaderboardBody.appendChild(row); // Adds the finished row to the <tbody> in the leaderboard table. This repeats for every user.
  });
}


// ----- Update group leaderboard function ----- 

function updateGroupLeaderboard() {
  const groupLeaderboardBody = document.querySelector("#groupLeaderboard tbody"); // This finds the <tbody> inside the table with id = "groupLeaderboard". This is where the rows with each user will be shown
  groupLeaderboardBody.innerHTML = ""; // Clears out any previous content inside the leaderboard table. This is important to avoid duplicating rows every time you update the list

  const users = JSON.parse(localStorage.getItem("users")) || []; // Loads the users array from localStorage. JSON.parse() converts the saved string back into a real JavaScript array.
  // "|| []" is a fallback in case there's no data saved yet (like on the first visit)

// Step 1: Sum steps per group
  const groupStepsMap = {};

  users.forEach(user => {
    const groupName = user.group;
    if (!groupName) return; // Skip users without a group
    if (!groupStepsMap[groupName]) {
      groupStepsMap[groupName] = 0;
    }
    groupStepsMap[groupName] += user.steps;
  });

  // Step 2: Convert map to array
  const groupStepsArray = Object.entries(groupStepsMap).map(([name, steps]) => ({
    name,
    steps
  }));

  // Step 3: Sort descending by steps
  groupStepsArray.sort((a, b) => b.steps - a.steps); // Sorts the user array from highest to lowest step count. If b.steps is greater than a.steps, b comes first


  // Step 4: Render leaderboard

  groupStepsArray.forEach((group, index) => { // Loops through each user in the sorted array. "user" is the object. "index" is the position in the array (0 for first, 1 for second, etc.)
    const row = document.createElement("tr"); // Creates a new table row <tr> to hold the user's data
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${group.name}</td>
      <td>${group.steps}</td>
    `;  // Fills the row with HTML. Rank number: ${index + 1} (since arrays start at 0)

/*
Example: 
<tr>
  <td>1</td>
  <td>Anna</td>
  <td>2500</td>
</tr>
*/
    groupLeaderboardBody.appendChild(row); // Adds the finished row to the <tbody> in the leaderboard table. This repeats for every user.
  });
}


// ----- Clear individual leaderboard (localStorage) ----- 
const clearIndividualBtn = document.getElementById("clearIndividualBtn");
clearIndividualBtn.addEventListener("click", function () {

  let users = JSON.parse(localStorage.getItem("users")) || [];


  // Set all users' steps to 0
  users = users.map(user => ({
    ...user,
    steps: 0


  }));

  // Save updated users back to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Update the leaderboards
  updateIndividualLeaderboard();
  updateGroupLeaderboard();
});


// ----- Clear group leaderboard (localStorage) ----- 
const clearGroupBtn = document.getElementById("clearGroupBtn");
clearGroupBtn.addEventListener("click", function () {

  let users = JSON.parse(localStorage.getItem("users")) || [];


  // Set all users' steps to 0
  users = users.map(user => ({
    ...user,
    steps: 0


  }));

  // Save updated users back to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Update the leaderboards
  updateIndividualLeaderboard();
  updateGroupLeaderboard();
});




// ----- Show group leaderboard ----- 

const showGroupBtn = document.getElementById("showGroupBtn");

showGroupBtn.addEventListener("click", function(event) {
  event.preventDefault(); // stop the page from refreshing
  document.getElementById("individualLeaderboardSection").style.display = "none";
  document.getElementById("groupLeaderboardSection").style.display = "block";
  
  updateIndividualLeaderboard();
  updateGroupLeaderboard();
});

  

// ----- Show individual leaderboard ----- 

const showIndividualBtnFromGroup  = document.getElementById("showIndividualBtnFromGroup");

showIndividualBtnFromGroup.addEventListener("click", function(event) {
  event.preventDefault(); // stop the page from refreshing
  document.getElementById("individualLeaderboardSection").style.display = "block";
  document.getElementById("groupLeaderboardSection").style.display = "none";

  updateIndividualLeaderboard();
  updateGroupLeaderboard();
});


// ----- Auto-login if user is still stored in localStorage, if they closed the browser without pressing logout (because logout is set to clear the localStorage) -----   

window.addEventListener("load", function () {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    username = storedUsername;

    console.log("Restored user:", username);

    // Optionally: show the app directly
    showOnly("stepsForm", "individualLeaderboardSection");
  } else {
    showOnly("loginForm");
  }
});


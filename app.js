//Make IE have the forEach functionality for NodeList; so expenses can be deleted 
if (!NodeList.prototype.forEach && Array.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// Create event listeners
document.addEventListener("click", event => {
    // if form button is clicked, handle the new expense
    if (event.target.matches(".exp-form__submit-button")) {
        event.preventDefault(); //Prevent refreshing the page (among other things)
        handleSubmitBtn();
    } else if (event.target.matches(".toolbar__delete-btn")) {
        event.preventDefault();
        handleDeleteBtn();
    }
});
// document.addEventListener("change", event => {
//     if (event.target.checked && event.target.matches(".exp-table__exp-checkbox")) {
//         handleCheckedExpenses(event);
//     }
// });

function handleSubmitBtn() {
    //Access user's input values 
    let name   = document.querySelector(".exp-input-name").value.trim(),
        date   = document.querySelector(".exp-input-date").value.trim();
        amount = document.querySelector(".exp-input-amount").value.trim();

    //If date is empty, make it be today's date
    if (!date) { date = getTodaysDate(); }

    // let amountCurrency;

    //Create object for formatting for US currency
    // let format = new Intl.NumberFormat('en-US', { 
    //     style: "currency", 
    //     currency: "USD", 
    //     minimumFractionDigits: 2, 
    // });
        
    //Get the table's tbody element
    let tbody = document.querySelector(".exp-table__tbody");

    //Add the user's input to the table
    tbody.innerHTML +=
        `<tr class="exp-table__expense">
            <td class="exp-table__expense-selection">
                <input type="checkbox" class="exp-table__exp-checkbox">
            </td>
            <td class="exp-table__expense-date">${date}</td>
            <td class="exp-table__expense-name">${name}</td>
            <td class="exp-table__expense-amount">$${amount}</td>
        </tr>`;

    //Clear all the user's previous inputs from the webpage form 
    clearExpenseFormInputs();
}

function handleDeleteBtn() {
    //Get all the checked inputs and put them in a NodeList    
    let expensesToDelete = getCheckedInputs(); //Todo: probably want to rename this variable expensesToDelete to something else
    confirm("Delete checked expenses?");
    //Go up the parental chain to the expense row and delete it
    expensesToDelete.forEach(expense => { expense.parentElement.parentElement.remove(); });
}

function getCheckedInputs() {
    //Get all the checked inputs and put them in a NodeList
    let checkedInputs = document.querySelectorAll('input[class="exp-table__exp-checkbox"]:checked');
    return checkedInputs;
}

function clearExpenseFormInputs() {
    let inputs = document.querySelectorAll(".exp-form__input");
    inputs.forEach(input => {
        input.value = "";
    });
}

function getTodaysDate() {
    let [month, day, year] = new Date().toLocaleDateString("en-US").split("/"); //Create variables month, day, and year w/ destructuring assignment syntax

    // Pad month and date to start w/ 0s (example: "3" -> "03")
    month = month.padStart(2, "0");
    day = day.padStart(2, "0");

    return `${month}/${day}/${year}`;
}

//Run Flatpickr date picker
flatpickr(document.getElementById("exp-input-date"), { dateFormat: "m/d/Y" });
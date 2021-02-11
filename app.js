// Create event listeners
document.addEventListener("click", event => {
    // if form button is clicked, handle the new expense
    if (event.target.matches(".exp-form__submit-button")) {
        event.preventDefault(); //Prevent refreshing the page (among other things)
        handleSubmitBtn();
    }
});

function handleSubmitBtn () {
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
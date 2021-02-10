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
    let name   = document.querySelector(".exp-input-name").value,
        date   = document.querySelector(".exp-input-date").value,
        amount = document.querySelector(".exp-input-amount").value; // Turn into a string with decimal value
        
    //Get the table's tbody element
    let tbody = document.querySelector(".expense-table__tbody");

    //Add the user's input to the table
    tbody.innerHTML +=
        `<tr>
            <td>${name}</td>
            <td>${date}</td>
            <td>$${amount}</td>
        </tr>`;

    //Clear all the user's previous inputs from the webpage form
    let inputs = document.querySelectorAll(".exp-form__input");
    inputs.forEach(input => {
        input.value = "";
    });
}   
/*eslint.env browser*/
// CREATE AN ARRAY OF EMPLOYEES
var employees = [
    [12345678, "Jonathan Lee", 6016, "jlee2784@sdsu.edu", "Engineering"],
    [92104818, "Jack Black", 7474, "jackblack@po.com", "Sales"],
    [84013842, "Kobe Bryant", 2410, "blackmamba@nike.com", "Marketing"],
    [66718391, "Chris Evans", 1102, "captainamerica@avengers.com", "Executive"],
    [29896773, "Bruce Wayne", 6134, "darkknight@manor.com", "QA"]
];

var $ = (id) => {
    "use strict";
    return window.document.getElementById(id);
};

var employeeCount = employees.length;
$("empCount").textContent = "(# Employees: " + employeeCount + ")";


// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
if(localStorage.employees) {
    employees = JSON.parse(localStorage.employees);
}
else {
    localStorage.employees = JSON.stringify(employees);
}


// GET DOM ELEMENTS
var empTable = $("empTable");
var form = $("addForm");


// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();


// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    "use strict";
    var id, fullName, ext, email, department, newEmployee;

    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    id = $("id").value;
    fullName = $("name").value;
    ext = $("extension").value;
    email = $("email").value;
    department = $("department").value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    newEmployee = [id, fullName, ext, email, department];

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);

    // BUILD THE GRID
    buildGrid();

    // RESET THE FORM
    form.reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    $("id").focus();
});

// DELETE EMPLOYEE
// empTable.addEventListener('click', (e) => {
//     "use strict";
//     // CONFIRM THE DELETE
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//         // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
//         var index = e.target.parentNode.rowIndex;

//         // REMOVE EMPLOYEE FROM ARRAY
//         employees.splice(index-1, 1);

//         // BUILD THE GRID
//         buildGrid();
//     }
// });

/*
 * Side note for myself: 
 *  "var deleteEmployee = (e) => {"
 *  Why using a lambda function below does not work: 
 *   https://chat.openai.com/share/32626668-2468-4cce-9752-476c6fb83d94
 * 
 */
// DELETE EMPLOYEE using the X button instead of just a click even on empTable.
function deleteEmployee(e)  {
    console.log("delete employee");
    "use strict";
    // CONFIRM THE DELETE
    if (window.confirm("Are you sure you want to delete this employee?")) {
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        var index = e.target.parentNode.parentNode.rowIndex;

        console.log(index);
        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(index-1, 1);

        // BUILD THE GRID
        buildGrid();
    }
};

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    "use strict";
    var newTBody, employee, newRow, delBtnCell, delButton;

    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    // TODO: ?!?!?!?!?
    window.document.getElementsByTagName("tbody")[0].remove();

    // REBUILD THE TBODY FROM SCRATCH
    newTBody = document.createElement("tbody");

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (employee of employees) {
        newRow = document.createElement("tr");
        newRow.innerHTML = 
            `
            <td>${employee[0]}</td>
            <td>${employee[1]}</td>
            <td>${employee[2]}</td>
            <td>${employee[3]}</td>
            <td>${employee[4]}</td>
            `;

        // CREATE THE DELETE BUTTON
        delBtnCell = document.createElement("td");
        newRow.appendChild(delBtnCell);
        delButton = document.createElement("button");
        delButton.appendChild(window.document.createTextNode("X"));
        delButton.addEventListener("click", deleteEmployee);
        delBtnCell.appendChild(delButton);

        newTBody.appendChild(newRow);
    }

    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(newTBody);

    // UPDATE EMPLOYEE COUNT
    employeeCount = employees.length;
    $("empCount").textContent = "(# Employees: " + employeeCount + ")";

    // STORE THE ARRAY IN STORAGE
    localStorage.employees = JSON.stringify(employees);

};
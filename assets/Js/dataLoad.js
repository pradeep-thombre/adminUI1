// creating map to store data locally
var userMap= new Map();                                                  // using hashmap to store users data 
isError=false;

// hiding un-neccesary components initially 
$('#delete-all-btn').hide();
$('#edit-box').hide();
$('#dataError').hide();


// ----------------------------------------fetch all data from API -------------------------------------
// fetching data and storing in Map 
function fetchData(){

    // fetches data from api 
    $.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json", function (data) {

        // iterating over data 
        for (let user of data) {
            userMap.set(user.id,user);                               // storing data in map, id as key and doc as value
        }

        // handling error if any during api call
    }).fail(function (jqXHR, textStatus, errorThrown) {
        isError=true;
    });
}
fetchData();



// loading data 
function loadData(userMap){

    // iterating over the map and calling function to add child in table 
    for (const [key, data] of userMap.entries()) {
        addNewRow(data);
    }

    // adding data table format to table 
    $(document).ready( function () {
        $('#data-table').DataTable();
    } );

}

// this function gets a data and it inserts as child in table
function addNewRow(data){

    let tableRow = document.createElement('tr'); // create one table row element and setting its inner html as json response
    tableRow.id = data.id;

    // creating new row with data 
    tableRow.innerHTML = (`
        <th scope="row"><input type="checkbox" class="select" id = ${data.id}></th> 
        <td id="n${data.id}">${data.name}</td>
        <td id="e${data.id}">${data.email}</td>
        <td id="r${data.id}">${data.role}</td>
        <td>
            <i onClick="editRow('${data.id}')" class="fas fa-user-edit"></i>
            <i onClick="deleteRow('${data.id}')" class="fas fa-trash"></i>
        </td>
    `);

    // adding data in table body 
    document.getElementById('table-body').appendChild(tableRow); // adding all details to existing table
}


// loading structure of table in container 
function loadTable(){

    let tableRow = document.createElement('table'); // create one table row element and setting its inner html as json response
    tableRow.id = "data-table";
    tableRow.classList="table table-sm";

    // adding headers 
    tableRow.innerHTML =(`
        <thead>
            <tr>
                <th scope="col"><label><input type="checkbox" id="select-all" onclick="selectAll()"><p>Select All</p></label></th> 
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody id="table-body"></tbody>
    `);
    document.getElementById('container').appendChild(tableRow);
}


// function to fetch all data and load to table
$("#fetch").click(function () {

    // if any error occured showing error animation 
    if(isError){
        $('#dataError').show();
        return;
    }

    // creating table and adding data and headers 
    loadTable();
    loadData(userMap);

    // changing visiblity of components 
    $("#get-users h1").html('Geektrust Users');
    // $("#fetch").prop( "disabled", true );
    $('#animImg').hide();
    $('#delete-all-btn').show();
    
});

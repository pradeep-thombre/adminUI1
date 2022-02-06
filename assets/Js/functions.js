// -------------------------------------click listeners ----------------------------------------

// update users darta button - it updates the modified data in map
$("#update-button").click(function () {
    $('#edit-box').hide();

    // creating doc of modified data 
    var doc={
        id:editId,
        name:$("#edit-name").val(),
        email:$("#edit-email").val(),
        role:$("#edit-role").val(),
    }

    // updating in map 
    userMap.set(editId,doc);

    // updating data in rows on UI
    $('#e'+editId).html(doc.email);
    $('#n'+editId).html(doc.name);
    $('#r'+editId).html(doc.role);
});

// dalate all button to delete selected rows
$("#delete-all-btn").click( function(){

    const select = document.getElementsByClassName('select');

    // iterate over all rows and checks the checkbox and delete all checked rows
    for(let i=select.length-1;i>=0; i--){
        if(select[i].checked == true){ // it will check checked box is checked or not
            let id = select[i].id; //if checked then
            deleteRow(id); // it will send id of checked box to delete function
        }
    }
});

// this function selects all the rows for the table 
function selectAll() {
    const select = document.getElementsByClassName('select');

    isChecked=false;
    if(document.getElementById('select-all').checked == true){   // when we click on select all button it will run a loop on all 
        isChecked=true;
    }

    // ieraste over all rows and changes the checkbox value 
    for(let i = 0; i < select.length; i++){   
        select[i].checked = isChecked;
    }

}



//shows edit box to modify users data 
function editRow(clicked_id){

    // chnages visiblity of edit box
    $("#edit-box").show();


    $("#edit-name").val(userMap.get(clicked_id).name);
    $("#edit-email").val(userMap.get(clicked_id).email);
    $("#edit-role").val(userMap.get(clicked_id).role);
    editId=userMap.get(clicked_id).id;
}

// handling del button click 
function deleteRow(id){
    // delete from map 
    userMap.delete(id);

    // delete from UI 
    let element=document.getElementById(id);
    let tablebody=document.getElementById('table-body');
    tablebody.removeChild(element);
}


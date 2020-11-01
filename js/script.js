$(document).one('pageinit',function(){
 //Display runs
 showRuns();
 //add handler
 $('#submitAdd').on('tap',addRun);
//Edit handler
 $('#submitEdit').on('tap',editRun);
 //Delete Handler
 $('#stats').on('tap','#deleteLink',deleteRun); 
 //Set Current handler
 $('#stats').on('tap','#editLink',setCurrent);
 //Clear Handler
 $("#clearRuns").on('tap',clearRuns);
 
 /*
 Show all runs on homepage
 */
 function showRuns(){
 //get runs obj
 var runs=getRunsObject();
 //check if empty
 if(runs!=''&& runs!=null){
   for(var i=0;i<runs.length;i++){
     $('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>'+runs[i]["date"]+'<br><strong>Distance: </strong>'+runs[i]["miles"]+'m<div class="controls">'+'<a href="#edit" id="editLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'">Edit</a> | <a href="#" id="deleteLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'" onclick="return confirm("Are You Sure?")">Delete</a></div></li>');
   }
   $('#home').bind('pageinit',function(){
    $('$stats').listview('refresh');
   });
  }
  else{
   $('#stats').html('<p>You have no logged runs</p>');
  }
 }

 /*
 Add a run
 */
function addRun() {
 //Get form values
 var miles=$('#addMiles').val();
 var date=$('#addDate').val();

 //Create 'run' object
 var run={
  date: date,
  miles:parseFloat(miles)
 };

 var runs=getRunsObject();

 //Add Run To Runs Array
 runs.push(run);
 alert('Run Added');

 //Set stringified obj to localStorage
 localStorage.setItem('runs',JSON.stringify(runs));

 //Redirect
 window.location.href="index.html";
 return false;
}

/*
 Edit a run
*/
function editRun(){
 //Get current data
 currentMiles=localStorage.getItem('currentMiles');
 currentDate=localStorage.getItem('currentDate');

 var runs=getRunsObject();

 //loop through runs
 for(var i=0;i< runs.length;i++){
  if(runs[i].miles==currentMiles && runs[i].date==currentDate){
   runs.splice(i,1);
  }
  localStorage.setItem('runs',JSON.stringify(runs));
 } 
 //Get form values
  var miles=$('#editMiles').val();
  var date=$('#editDate').val();

  //Create 'run' object
  var update_run={
   date: date,
   miles:parseFloat(miles)
  };

 //Add Run To Runs Array
 runs.push(update_run);
 alert('Run Updated');

 //Set stringified obj to localStorage
 localStorage.setItem('runs',JSON.stringify(runs));

 //Redirect
 window.location.href="index.html";
 return false;
}

/*
 Delete a run
*/
function deleteRun(){
//Set ls items(ls=local storage)
 localStorage.setItem('currentMiles',$(this).data('miles'));
localStorage.setItem('currentDate',$(this).data('date'));

 //Get current data
 currentMiles=localStorage.getItem('currentMiles');
 currentDate=localStorage.getItem('currentDate');

 var runs=getRunsObject();

 //loop through runs
 for(var i=0;i< runs.length;i++){
  if(runs[i].miles==currentMiles && runs[i].date==currentDate){
   runs.splice(i,1);
  }
  localStorage.setItem('runs',JSON.stringify(runs));
 } 

 alert('Run Deleted');
 //Redirect
 window.location.href="index.html";
 return false;
}

function clearRuns(){
 localStorage.removeItem('runs');
 $('#stats').html('<p>You have no logged runs</p>');
}

/*
 Add the run object, i wanna get the obj str and then wanna change it
 */
function getRunsObject() {
 //Set runs array
 var runs=new Array();
 var currentRuns=localStorage.getItem('runs');

 //check localStorage
 if(currentRuns!=null){
  //set to runs
  var runs=JSON.parse(currentRuns);
 }

 //Return the runs obj
 return runs.sort(function(a,b){
  return new Date(b.date)-new Date(a.date);
  //sorting by date
 })
}
 
//set the current clicked miles and date
function setCurrent(){
//set ls items
localStorage.setItem('currentMiles',$(this).data('miles'));
localStorage.setItem('currentDate',$(this).data('date'));
//insert form fields
$('#editMiles').val(localStorage.getItem('currentMiles'));
$('#editDate').val(localStorage.getItem('currentDate'));
}; 
}); 
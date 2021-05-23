document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  let status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue =(id) => {
  // event.preventDefault();
  const issues = JSON.parse(localStorage.getItem('issues'));
 
  let currentIssue={};
  currentIssue = issues.find(issue =>issue.id == id);
  console.log("currentIssue",currentIssue);
  currentIssue.status = 'Closed';
  currentIssue.description=currentIssue.description.strike();
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remItem=issues.filter(i => {i.id != id });
  localStorage.setItem('issues', JSON.stringify(remItem));
  fetchIssues();
  
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
   
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
  

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
  totalIssues();
  openIssues();
}

const totalIssues=()=>
{
  const issues=JSON.parse(localStorage.getItem('issues'));
  const total=issues.length;
  document.getElementById('total-issue').innerText=total;
}

const openIssues=()=>{
  const issues=JSON.parse(localStorage.getItem('issues'));
  const open=issues.filter(i=>i.status=='Open');
  const openCount=open.length;
  document.getElementById('open-issue').innerText=openCount; 

  
}
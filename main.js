document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  issueCount()
}

const closeIssue = (id)=> {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  issueCount()
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
  issueCount()
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  const lineThrough = "text-decoration:line-through"
  const normal = "text-decoration:none"
  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
   
      issuesList.innerHTML +=   `<div class="well">
      <h6>Issue ID: ${id} </h6>
      <p><span class="label label-info"> ${status} </span></p>
      <h3 style=${status == "Closed" ? lineThrough : normal}> ${description} </h3> 
      <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
      <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
      <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
      <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
      </div>`;
    
    issueCount()
}}

//issue count part
function issueCount() {
const issues = JSON.parse(localStorage.getItem('issues'));
const closeIssue =  issues.filter(issue => issue.status == 'Closed')
const OpenIssue =  issues.filter(issue => issue.status == 'Open')
document.querySelector('.closeIssue').innerText = closeIssue.length
document.querySelector('.OpenIssue').innerText = OpenIssue.length
document.querySelector('.totalIssue').innerText = issues.length
}

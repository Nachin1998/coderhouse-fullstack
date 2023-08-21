import {
    EmployeePrompt
} from './EmployeePrompt.js';

import {
    Employee
} from './Employee.js';

import promptsData from "./employees.json" assert {type: "json"};

function GeneratePrompts() {
    const prompts = new Array();
    prompts.push(new EmployeePrompt("Whats your name?", "Name"));
    prompts.push(new EmployeePrompt("How long have you known the company?", "Company Knowledge"));
    prompts.push(new EmployeePrompt("Whats your desired salary?", "Desired Salary"));
    prompts.push(new EmployeePrompt("Whats your ID number?", "ID Number"));
    prompts.push(new EmployeePrompt("Whats position would you like in the company?", "Desired Position"));
    prompts.push(new EmployeePrompt("Whats your favourite dessert?", "Dessert"));
    return prompts;
}

function GenerateEmplyees() {
    let employees = new Array();
    employees.push(new Employee("Ignacio", "CEO"));
    employees.push(new Employee("Luciano", "Lead IT"));
    employees.push(new Employee("Nick", "QA"));
    employees.push(new Employee("Roma", "Lead Python Dev"));
    return employees;
}

function CheckForNameSimilarities(currentEmployees, prompts){
    for (const employee of currentEmployees) {
        for (const promptItem of prompts) {
            if (employee.name === promptItem.response) {
                return true;
            }
        }
    }

    return false;
}

function GenerateFinalMessage(prompts) {
    const endLine = "\n";
    let information = "Information:" + endLine;

    prompts.forEach(prompt => {
        information += prompt.GetInformationText();
        information += endLine;
    });

    information += endLine;
    information += "Thank you!";
    return information;
}

/* for (let index = 0; index < promptsData.length; index++) {
    alert(promptsData[i].prompt);
    alert(promptsData[i].promptId);
}

fetch("./employees.json")
.then(response => {
   return response.json();
})
.then(data => console.log(data)); */

console.log(promptsData);

const userKey = "user";
const acceptedJobKey = "acceptedJob";

const user = localStorage.getItem(userKey);

if (user != null)
{
    alert("welcome back " + user + "!");
}
else
{
    const name = prompt("Please input your name");
    localStorage.setItem(userKey, name);
    alert("welcome " + name + "!");
}

const isEmployee = localStorage.getItem(acceptedJobKey);

if (isEmployee)
{
    alert("Glad you are enjoying you time at the job!");
}
else
{
    const currentEmployees = GenerateEmplyees();
    const prompts = GeneratePrompts();
    const namePrompt = prompts[0];
    
    prompts.forEach(element => {
        element.SetResponse(prompt(element.prompt));
    })

    if (CheckForNameSimilarities(currentEmployees, prompts)) {
        alert("What a coincidence, we got someone working with your name already!");
    }
    
    alert(GenerateFinalMessage(prompts));
    
    const response = confirm("Would you like to apply for the position?");
    
    if (response)
    {
        localStorage.setItem(acceptedJobKey, response);
        let info = "Great! You are now part of the team! \n";
        currentEmployees.unshift(new Employee(namePrompt.response, "Junior IT Employee"));
        currentEmployees.forEach(employee => {
            info += employee.GetJobInformation();
        });
        alert(info);
    }
    else
    {
        alert("What a shame. Feel free to contact us if you change your mind!");
    }
}

const text = document.getElementsByClassName("header-text");

for (let i = 0; i < text.length; i++) {
    const element = text[i];
    element.addEventListener("click", (eventData) => {
    
        alert(element.text);
    });
}

'use strict';

import {
    Employee
} from './Employee.js';

import {
    EmployeePrompt
} from './EmployeePrompt.js';

async function GeneratePrompts() {
    const response = await fetch("./json/prompts.json");
    if (!response.ok) {
        console.error("Failed to load prompts");
        return null;
    }
    
    const data = await response.json();

    const prompts = new Array();
    for (let index = 0; index < data.prompts.length; index++) {
        const element = data.prompts[index];
        prompts.push(new EmployeePrompt(element.prompt, element.promptId));
    }

    return prompts;
}

async function GenerateEmployees() {
    const response = await fetch("./json/employees.json");
    if (!response.ok) {
        console.error("Failed to load employees");
        return null;
    }

    const data = await response.json();

    const employees = new Array();
    for (let index = 0; index < data.employees.length; index++) {
        const element = data.employees[index];
        employees.push(new Employee(element.name, element.currentJob));
    }

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

function GreetClient() {
    const userKey = "user";

    const user = localStorage.getItem(userKey);

    if (user != null) {
        alert("welcome back " + user + "!");
    }
    else {
        const name = prompt("Please input your name");
        localStorage.setItem(userKey, name);
        alert("welcome " + name + "!");
    }
}

GreetClient();

const acceptedJobKey = "acceptedJob";
const isEmployee = localStorage.getItem(acceptedJobKey);

if (isEmployee)
{
    alert("Glad you are enjoying you time at the job!");
}
else
{
    const currentEmployees = await GenerateEmployees();
    const prompts = await GeneratePrompts();
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

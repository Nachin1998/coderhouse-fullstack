import {
    EmployeePrompt
} from './EmployeePrompt.js';

import {
    Employee
} from './Employee.js';

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

    for (let i = 0; i < prompts.length; i++) {
        information += prompts[i].GetInformationText();
        information += endLine;
    }
    
    information += endLine;
    information += "Thank you!";
    return information;
}

const currentEmployees = GenerateEmplyees();
const prompts = GeneratePrompts();
const namePrompt = prompts[0];

for (const promptItem of prompts) {
    promptItem.SetResponse(prompt(promptItem.prompt));
}

if (CheckForNameSimilarities(currentEmployees, prompts)) {
    alert("What a coincidence, we got someone working with your name already!");
}

alert(GenerateFinalMessage(prompts));

const response = confirm("Would you like to apply for the position?");

if (response)
{
    let info = "Great! You are now part of the team! \n";
    currentEmployees.unshift(new Employee(namePrompt.response, "Junior IT Employee"));
    for (const item of currentEmployees) {
        info += item.GetJobInformation();
    }
    alert(info);
}
else
{
    alert("What a shame. Feel free to contact us if you change your mind!");
}
function EmployeePrompt(prompt, promptTitle) {
    this.prompt = prompt;
    this.promptTitle = promptTitle;
    this.response;
}

function GeneratePrompts() {
    var prompts = new Array();
    prompts.push(new EmployeePrompt("Whats your name?", "Name"));
    prompts.push(new EmployeePrompt("How long have you known the company?", "Company Knowledge"));
    prompts.push(new EmployeePrompt("Whats your desired salary?", "Desired Slalary"));
    prompts.push(new EmployeePrompt("Whats your ID number?", "ID Number"));
    prompts.push(new EmployeePrompt("Whats position would you like in the company?", "Desired Position"));
    prompts.push(new EmployeePrompt("Whats your favourite dessert?", "Dessert"));
    return prompts;
}

function GenerateFinalMessage(prompts) {
    const endLine = "\n";
    let information = "Information:" + endLine;

    for (let i = 0; i < prompts.length; i++) {
        information += prompts[i].promptTitle + ": " + prompts[i].response;
        information += endLine;
    }
    
    information += endLine;
    information += "Thank you!";
    return information;
}

let prompts = GeneratePrompts();

for (let i = 0; i < prompts.length; i++) {
    prompts[i].response = prompt(prompts[i].prompt);
}

let information = GenerateFinalMessage(prompts);

alert(information);

const response = confirm("Would you like to apply for the position?");

if (response)
{
    alert("Great! We will be contacting you shortly.");
}
else
{
    alert("What a shame. Feel free to contact us if you change your mind!");
}
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquire = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const inquirer = require("inquirer");

var team = [];

function managerData(){
   const managerQuestions = [
      {type: "input",
      name: "name",
      message:"What is your name?"
      },
      {type: "input",
      name: "id",
      message:"What is your ID?"
      },
      {type: "input",
      name: "email",
      message:"What is your email?"
      },
      {type: "input",
      name: "office",
      message:"What is your office number?"
      }
   ];
   inquirer.prompt(managerQuestions).then(function(answer){
      const manager = new Manager(answer.name, answer.id, answer.email, answer.office)
      team.push(manager);
      employeeData();
   })
}

function employeeData (){
   const employeeQuestions = [
      {
      type: "list",
      name: "role",
      message: "What is your employees role?",
      choices: ["Engineer", "Intern", "N/A"]
      }      
   ];
   inquirer.prompt(employeeQuestions).then(function(answer){
      if (answer.role === "Engineer"){
         engineerQuestions();
      }
      else if (answer.role === "Intern"){
         internQuestions();
      }
      else if (answer.role === "N/A"){
         let html = render(team);
         fs.writeFile(outputPath,html,function(err){
            if (err){
               console.log(err);
            } else{
               console.log("Go Team Go!");
            }
         })
      }
   })
}

function engineerQuestions(){
   const questions = [
      {
          type: "input",
          name: "name",
          message: "What is your employees name?"
      },
      {
          type: "input",
          name: "id",
          message: "What is your employees id number?"
      },
      {
          type: "input",
          name: "email",
          message: "What is your employees email address?"
      },
      {
          type: "input",
          name: "github",
          message: "What is your employees github username?"
      }
      ];
      inquirer.prompt(questions).then(function (answer) {
          const engineer = new Engineer (answer.name, answer.id, answer.email, answer.github);
          team.push(engineer);
          employeeData();
      });
}

function internQuestions(){
   const questions = [
      {
          type: "input",
          name: "name",
          message: "What is your employees name?"
      },
      {
          type: "input",
          name: "id",
          message: "What is your employees id number?"
      },
      {
          type: "input",
          name: "email",
          message: "What is your employees email address?"
      },
      {
          type: "input",
          name: "school",
          message: "What is your employees school?"
      }
      ];
      inquirer.prompt(questions).then(function (answer) {
          const intern = new Intern (answer.name, answer.id, answer.email, answer.school);
          team.push(intern);
          employeeData();
      });
}

managerData();

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

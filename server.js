const consoleTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = require('./db/connection');


 const beginningQuestion = [
        // Starting question 
        { 
            type: 'list',
            name: 'intro',
            message: 'What would you like to do?',
            choices: [
                "View All Employees", 
                "View All Roles", 
                "View All Departments", 
                "Add Employee", 
                "Add Role",
                "Add Department",
                "Update Employee Role", 
                "Quit"
            ]
        }
    ]

// displays all the employees
const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee', (error, results) => {
        if (error) console.error(error);
        console.log(consoleTable.getTable(results));
        startScreen();
      })
};

const viewAllRoles = () => {
    connection.query('SELECT * FROM roles', (error, results) => {
        if (error) console.error(error);
        console.log(consoleTable.getTable(results));
        startScreen();
      })
};

const viewAllDepartments = () => {
    connection.query('SELECT * FROM department', (error, results) => {
        if (error) console.error(error);
        console.log(consoleTable.getTable(results));
        startScreen();
      })
};

const addEmployee = () => {
    connection.query('SELECT * FROM roles', (error, results) => {
        if (error) console.error(error);
        inquirer.prompt([{
          type: "input",
          question: "What is their first name?",
          name: "firstName"
        },
        {
          type: "input",
          question: "What is their last name?",
          name: "lastName"
        },
        {
          type: "input",
          question: "What is their manager id?",
          name: "managerId"
        },
        {
          type: "list",
          name: "role",
          message: "What is their role?",
          choices: results.map(role => {
            return { name: role.title, value: role.id }
          })
        }
        ])
          .then((answers) => {
            console.log(answers)
            connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES` +
            `("${answers.firstName}", "${answers.lastName}", "${answers.role}", "${answers.managerId}")`, (error, results) => {
              if (error) console.error(error);
              console.log("You successfully added an employee!");
              startScreen();
            })
          })
      })
};

const addRole  = () => {
    connection.query('SELECT * FROM roles', (error, results) => {
        if (error) console.error(error);
        inquirer.prompt([{
          type: "input",
          question: "What is the new roles name?",
          name: "title"
        },
        {
          type: "input",
          question: "What is the salary?",
          name: "salary"
        },
        {
          type: "input",
          question: "What is the department id of the new role?",
          name: "departmentId"
        }
        ])
          .then((answers) => {
            connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${answers.title}", "${answers.salary}", "${answers.departmentId}")`, (error, results) => {
              if (error) console.error(error);
              console.log("You successfully added a role!");
              startScreen();
            })
          })
      })
};

const addDepartment  = () => {
    connection.query('SELECT * FROM department', (error, results) => {
    if (error) console.error(error);
    inquirer.prompt([{
      type: "input",
      question: "What is the name of the new department?",
      name: "name"
    }
    ])
      .then((answers) => {
        connection.query(`INSERT INTO department (name) VALUES ("${answers.name}")`, (error, results) => {
          if (error) console.error(error);
          console.log("You successfully added a department!");
          startScreen();
        })
      })
  })
};

const updateEmployeeRole = () => {
    let idValueForEmployee = "";
    connection.query('SELECT * FROM employee', (error, results) => {
      const employeeChoices = results.map(({ id, first_name, last_name }) => ({
        name: `${first_name}, ${last_name}`,
        value: id
      }))
      if (error) console.error(error);
      inquirer.prompt([{
        type: "list",
        name: "options",
        message: "Which employee would you like to update?",
        choices: employeeChoices
      }
      ])
        .then((answers) => {
          idValueForEmployee = answers.intro;
          connection.query('SELECT * FROM roles', (error, results) => {
            const roleChoices = results.map(({ id, title }) => ({
              name: title,
              value: id
            }))
            inquirer.prompt([{
              type: "list",
              name: "options",
              message: "What is their current role??",
              choices: roleChoices
            }
            ])
              .then((answers) => {
                connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [idValueForEmployee, answers.options], (error, answers) => {
                  if (error) console.error(error);
                  console.log("The role has been updated");
                  startScreen();
                })
              })
          })
        })
    })
};


function startScreen() {
    inquirer.prompt(beginningQuestion)
      .then((answers) => {
        if (answers.intro === "View All Employees") {
          viewAllEmployees();
        }
        else if (answers.intro === "Add Employee") {
          addEmployee();
        }
        else if (answers.intro === "Update Employee Role") {
          updateEmployeeRole();
        }
        else if (answers.intro === "View All Roles") {
          viewAllRoles();
        }
        else if (answers.intro === "Add Role") {
          addRole();
        }
        else if (answers.intro === "View All Departments") {
          viewAllDepartments();
        }
        else if (answers.intro === "Add Department") {
          addDepartment();
        }
        else if (answers.intro === "Quit") {
          console.log("See you again!");
          process.exit(1);
        }
      })
      .catch((error) => {
        if (error.isTypeError) {
          throw new Error('TypeError' + error.message);
        } else {
          throw new Error(error);
        }
      });
  }
  
connection.connect(function (err) {
    if (err) throw err;
    console.log(`
    ╔═══╗─────╔╗──────────────╔═╗╔═╗
    ║╔══╝─────║║──────────────║║╚╝║║
    ║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
    ║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
    ║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
    ╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
    ───────║║──────╔═╝║─────────────────────╔═╝║
    ───────╚╝──────╚══╝─────────────────────╚══╝`)
    // runs the app
    startScreen();
});
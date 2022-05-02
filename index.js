// Packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const fetch = require(`cross-fetch`);
const generateMarkdown = require('./utils/generateMarkdown');


const license_array = ['MIT', 'GNU', 'Apache']
const full_license_array = [{ license_info: `None`, description_of_license: `None`, website_link: `None` }];

// Inquirer questions
const projectInit = () => {
    const questions = [
        {
            type: 'input',
            name: 'github',
            message: 'Enter Github Username',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('enter your GitHub username');
                    return false; 
                }
            } 
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter Email Address',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('enter your email address');
                    return false; 
                }
            }
    
        },
        {
            type: 'input',
            name: 'title',
            message: 'Enter Project Name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('enter your project name');
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter Project Description',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('enter a description of your project');
                    return false; 
                }
            }
        }, 
        {
            type: 'list',
            name: 'licenseX',
            message: 'select a license for this project.',
            choices: license_array,
            validate: licenseX => {
                if (licenseX) {
                    return true;
                } else {
                    console.log('enter a project license');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'install',
            message: 'Enter steps required to install project',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('enter steps required to install your project');
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions on usage',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('enter a usage description');
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'test', 
            message: 'Enter Command to Run the Program',
            default: 'npm test',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('enter what command should be used to run tests');
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'contributors',
            message: 'Enter what users should know before contributing?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('enter what should be known before contributing');
                    return false; 
                }
            }
        }
    ]
    return inquirer.prompt(questions)
        .then((data) => {
            return data;
        })
}

// API call to github returning an array of license names to append 
const init = async () => {
    fetch("https://api.github.com/licenses")
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                const license_abbreviation = data[i].name
                license_array.push(license_abbreviation)
            }
        })
};

// API calls to Github returning license info
function licenseData() {
  fetch("https://api.github.com/licenses")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const license_links = data[i].url
        fetch(`${license_links}`)
          .then((response) => response.json())
          .then((data) => {
            description_of_license = {
              license_info: data.spdx_id,
              description_of_license: data.description,
              website_link: data.html_url,
              licenseName: data.name
            }
            full_license_array.push(description_of_license)
          })
      }
    })
};

// function to write README file 
const writeFile = data => {
    fs.writeFileSync('Project-README.md', data)
    console.log("Your README has been successfully created!")
}; 

//initialize
init()
    .then(licenseData)
    .then(projectInit)
    .then(data => { return generateMarkdown(data,full_license_array) })
    .then(writeFile)
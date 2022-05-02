const stripchar = require('stripchar').StripChar;

//Creates a function that returns a license badge based on which license is passed in
function renderLicenseBadge(license_func1) {
  const license_image = stripchar.RSspecChar(`${license_func1}`, `--`);
  return `![license badge](https://img.shields.io/badge/License-${license_image}-blue)`
};

// Creates a function that returns the license link
function renderLicenseLink(details_license) {
  const license_return = details_license.map(({ website_link }) => website_link);
  return `Link complete license(${license_return})`
};
// Creates a function that returns the license section of README
function renderLicenseSection(details_license,data) {
  const license_info= details_license.map(({ description_of_license }) => description_of_license);
  return `## License
  ${data.licenseX}
  ${license_info}`
};


// Generates markdown for README
function generateMarkdown(data, full_license_array) {
const details_license = full_license_array.filter(function (el) { return el.licenseName == data.licenseX });
const license_func1 = details_license.map(({ license_info }) => license_info)
const licenseBadge = renderLicenseBadge(license_func1);
const link_to_lincese = renderLicenseLink(details_license);
const license_information = renderLicenseSection(details_license,data);


return `# ${data.title}

## Description
${data.description}

## Table of Contents
* [Install](#install)
* [Usage](#usage)
* [License](#license)
* [Contribute](#contribute)
* [Questions](#questions)
* [Tests](#tests)



## Installation
${data.install}

## Usage
${data.usage}

${license_information}
${link_to_lincese}
${licenseBadge}

## Contribute
${data.contributors}

## Tests
${data.test}

## Questions
Email [${data.email}] questions regarding the repository.
`
}

module.exports = generateMarkdown;

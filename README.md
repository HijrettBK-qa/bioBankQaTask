# bioBankQaTask

This is the task was given by BioBank to me as a QA Engineer. 
In this project, Google Keep app(https://keep.google.com/) test cases will be automated.

**Getting Started**

I will be building a Playwright framework with Typescript. 

My framework is based on Page Object Model. So, while locators and methods are stored in **Page** files, test cases can be found under the **tests** field as spec files.

The given task and answers will be found under the TASK.md file. Further responses will be discussed in in person interview.


**Installation**

If you want to run this on your local machine, clone the repository using git clone. Then, navigate to the main directory and run the following commands to install Playwright and its dependencies:

npm install

npx playwright install

**Running the automated checks**

npx playwright test
npx playwright show-report  => run test and show the html report right after that

**Running the Tests in VS Code**

The Playwright team has released a VS Code Extension that allows you to debug tests easily with the click or right click of a button.




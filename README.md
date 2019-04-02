# Cardiff Council Cycling IOT Web

This repository contains the code for the backend and web application for the Cardiff Council Cycling IOT project.

## Quick Start

### Prerequisites

To build this application, you'll need Node.JS installed with NPM (bundled with Node.JS). You can download them here:

[Download Node.JS and NPM](https://nodejs.org/en/)

To run the application, you will need MySQL to be installed an configured on your system with a database named `clean_air`. When asked which authentication method you want to use, select legacy authentication.
You can download MySQL here:

[Download MySQL](https://dev.mysql.com/downloads/windows/installer/)

This project also contains an editor config file. To use this with VS Code or Atom, you will need to install an extension. These extensions are available here:

* [VS Code](https://marketplace.visualstudio.com/items?itemName=editorconfig.editorconfig)
* [Atom](https://atom.io/packages/editorconfig)

### Install and Run

Clone the repo:  
```
git clone git@gitlab.cs.cf.ac.uk:c1630757/cardiff-council-cycling-iot-web.git
```

Create an app.conf file in the config folder:  
_If you don't create a configuration file, the default configuration will be used._
```
{
  "server": {
    "port": 3000
  },
  "mysql": {
    "host": "localhost",
    "user": "root",
    "password": "password",
    "database": "clean_air"
  }
}
```

Install with NPM:  
```
npm install
```

Build the applcation:  
```
npm run build
```

Run the applcation:  
```
npm run start
```

View the application in your browser at [http://localhost:3000/](http://localhost:3000/)

## Automated Deployment

These instructions will guide you through deploying the project on AWS using Terraform. This will automatically create an EC2 server instance, an RDS MySQL database, and the relevant security groups, and automatically build and configure the web application.

### Prerequisites

In order to follow these instructions, you'll need an AWS account. You can try AWS for free here:  

[AWS Free Tier](https://aws.amazon.com/free/)  

You'll then need to create a new user with programmatic access. This user will need the AmazonEC2FullAccess and AmazonRDSFullAccess permissions. You can do this here:  

[Manage AWS Users](https://console.aws.amazon.com/iam/home#/users)  

In order to run the automated deployment scripts, you'll need Terraform installed on you system, instructions on how to do this can be found here:  

[Install Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html)  

If you're deploying the application from a different Git repository/service, you will need to update lines 22 and 33 of the `deploy-script.sh.tpl` file.

### Instructions

1. Generate an SSH key for GitLab and copy the private key into a file in the root of this repository named `git.key`.

2. Open a terminal/bash window.

3. Initialise Terraform:
```
terraform init
```

4. Create a file called `override.tf` in the root of this repository and add your AWS credentials (the access key ID and secret access key for your AWS user), a username and password for the database, and the name of the branch that you want to deploy:  
_If you want to be promted for a variable when you deploy, don't include it in this file._
```
variable "aws_access_key_id" { default = "YOUR ACCESS KEY ID" }
variable "aws_secret_access_key" { default = "YOUR SECRET ACCESS KEY" }
variable "db_username" { default = "DATABASE USERNAME" }
variable "db_password" { default = "DATABASE PASSWORD" }
variable "git_branch" { default = "BRANCH NAME" }
```

5. View the Terraform plan to see the changes that will be made:
```
terraform plan
```

6. Apply the Terraform plan:
```
terraform apply
```

7. Terraform will now create the instances for you. When the instances have been created, Terraform will output the public IP address for your server. Once the application has finished building, you'll be able to access it at this IP.  
_It will take a while to update, build, and start the application, but it should finish within 15 minutes._

## Commands

The following NPM scripts are included in the project. For the commands that build or start the project, you can specify the environment with `:prod` or `:dev`.  

* **Start**  
  Runs the application on port 8080.  
  `npm run start`

* **Build**  
  Runs webpack to build the client-side Javascript.  
  `npm run build`  

* **Watch**  
  Runs webpack to build the client-side Javascript, watching for changes.  
  `npm run watch`  

* **Build and Run**  
  Runs webpack to build the client-side Javascript and starts the app, watching for changes.  
  `npm run buildRun`

* **Test**  
  Runs Jest to test the code.  
  `npm run test`

* **Linting**  
  Runs ESLint to lint both the client and server-side code. Use `:fix` to attempt to automatically apply fixes.  
  `npm run lint`  

## Tools and Config

* **React**  
  Used for the creating the interface.

* **Express**  
  Used for the web server.

* **Editor Config**  
  Sets editor settings for supported editors.  
  May require a plugin for some editors, including Atom and VS Code.  
  Configured in `.editorconfig`

* **ES Lint**  
  Used for Javascript linting.  
  Configured in `package.json` and with `.eslintignore`.

* **Webpack**  
  Used for running build tasks.  
  Configured with the webpack files in the config folder.

* **Babel**  
  JS compiler for client-side code.  
  Configured in `package.json`.

* **Jest**  
  Used for testing.  
  Configured in `package.json`.

* **Enzyme**  
  Used for improved testing of React components.  
  Configured in `config/jest/jestSetup.js`

## Project Structure

* **Client**  
  Contains the client-side code to be compiled with Webpack and Babel.

* **Public**  
  Contains static files that will be hosted by the server, including the compiled Javascript generated by Webpack.

* **Server**  
  Contains the server-side code, including index.js, which is executed with `npm run start` to run the application.

* **Config**  
  Contains Webpack and Jest config files.

## Tests

Testing files for React components are named with `.spec.js` and are located in the same directory as the component being tested. Jest will automatically find files with this extension when running the `npm run test` command.

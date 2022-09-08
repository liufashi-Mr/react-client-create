#!/usr/bin/env node
const program = require("commander");
const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const chalk = require("chalk");
const inquirer = require("inquirer");
const process = require("child_process");
const ora = require("ora");
const spinner = ora("try to get the registry ...");
program
  .version("1.0.0", "-v, --version")
  .command("create <name>")
  .action((name) => {
    figlet(`react - client`).then((data) => {
      console.log(chalk.yellow(data));
      inquirer
        .prompt([
          {
            type: "list",
            name: "lang",
            message: "use javascript or typescript",
            choices: ["javascript", "typescript"],
            filter: function (val) {
              return val.toLowerCase();
            },
          },
        ])
        .then(({ lang }) => {
          spinner.start();
          if (lang === "javascript") {
            process.exec(
              "git clone https://github.com/liufashi-Mr/react-cli.git " + name,
              function (error, stdout, stderr) {
                if (error !== null) {
                  spinner.fail("exec error: " + error);
                  console.log(stdout);
                  return;
                }
                console.log(stdout);
                spinner.succeed("download successfully!!!");
              }
            );
          } else {
            spinner.fail("还没有写！！！");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
program.parse(process.argv);

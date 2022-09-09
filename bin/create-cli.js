#!/usr/bin/env node
const program = require("commander");
const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const chalk = require("chalk");
const inquirer = require("inquirer");
const process = require("child_process");
const ora = require("ora");
const spinner = ora("try to get the registry ...");

const getClone = (type, name) => {
  let url;
  switch (type) {
    case "javascript": {
      url = "https://github.com/liufashi-Mr/react-cli.git ";
      break;
    }
    case "typescript": {
      url = "https://github.com/liufashi-Mr/react-cli.git ";
      break;
    }
    case "admin template (with react + ant-design)": {
      url = "https://github.com/liufashi-Mr/react-antd-admin.git ";
      break;
    }
    case "h5 template (with react + ant-mobile)": {
      url = "https://github.com/liufashi-Mr/h5-react-typescript.git ";
      break;
    }
  }
  spinner.start();
  process.exec("git clone " + url + name, (error, stdout, stderr) => {
    if (error !== null) {
      spinner.fail("exec error: " + error);
      console.log(stdout);
      return;
    }
    console.log(stdout);
    process.exec(
     `cd ${name} && rm -rf .git && git init && git add . && git commit -m "init with create-cli"`,
      (error, stdout, stderr) => {
        if (error !== null) {
          spinner.fail("exec error: " + error);
          console.log(stdout);
          return;
        }
        console.log(stdout);
        spinner.succeed("download successfully!!!");
      }
    );
  });
};
program
  .version(require("../package.json").version)
  .command("create <name>")
  .alias("c")
  .action((name) => {
    figlet(`react - client`).then((data) => {
      console.log(chalk.yellow(data));
      inquirer
        .prompt([
          {
            type: "list",
            name: "type",
            message: "which do you want",
            choices: [
              "only react-cli ( you can user-defined )",
              "admin template ( with react + ant-design )",
              "h5 template (with react + ant-mobile )",
            ],
            filter: function (val) {
              return val.toLowerCase();
            },
          },
        ])
        .then(({ type }) => {
          if (type === "only react-cli ( you can user-defined )") {
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "lang",
                  message: "work with javascript or typescript",
                  choices: ["javascript", "typescript"],
                  filter: function (val) {
                    return val.toLowerCase();
                  },
                },
              ])
              .then(({ lang }) => {
                if (lang === "javascript") {
                  getClone(lang, name);
                } else {
                  spinner.fail("还没有写！！！");
                }
              })
              .catch((err) => console.log(err));
          } else {
            getClone(type, name);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
program.parse(process.argv);

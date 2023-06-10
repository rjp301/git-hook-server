import express from "express";
import bodyParser from "body-parser";

import path from "path";
import fs from "fs";

import dotenv from "dotenv";
import exec_process from "./exec_process.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
const REPO_DIR = process.env.REPO_DIR || "";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ version: "1.0.0" });
});

app.post("/", async (req, res) => {
  console.log("----------------");

  const repoName = req.body.repository.name;
  if (!repoName) {
    console.log("repo name not specified");
    return res.end();
  }

  console.log(req.body.repository.name);
  console.log(new Date(req.body.repository.pushed_at * 1000));

  const repoPath = path.join(REPO_DIR, repoName);
  const isDir = fs.existsSync(repoPath) && fs.lstatSync(repoPath).isDirectory();
  if (!isDir) {
    console.log(`repo directory does not exist at ${repoPath}`);
    return res.end();
  }

  const commandStr = `cd ${repoPath} && git fetch && git reset --hard HEAD && git merge @{u}`;
  try {
    const result = await exec_process(commandStr);
    console.log(result);
    console.log("repo updated");
  } catch (err) {
    console.log(err);
    console.log("repo not updated");
  }

  return res.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

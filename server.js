require("dotenv").config();
const express = require("express");
const path = require("path");
const { monitorDomain } = require("./monitor.js");
const { exec } = require("child_process");

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const PORT = 3000;

// Route for checking domain check.
app.post("/monitor", async (req, res) => {
  const { domain } = req.body;

  console.log(req.body);

  try {
    const response = await monitorDomain(domain);

    // if (isSuspicious) {
    //     res.status(200).json({ alert: true, message: `Suspicious activity detected for domain: ${domain}` });
    // } else {
    //     res.status(200).json({ alert: false, message: `No suspicious activity detected for domain: ${domain}` });
    // }

    console.log(response);

    res.status(200).json({
      success: true,
      message: "Hello Worrls",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      alert: false,
      message: `Error monitoring domain: ${error.message}`,
    });
  }
});

// Route for scanning the PORTs,.
app.post("/scan", (req, res) => {
  console.log(req.body);

  const domain = req.body.domain;

  if (!domain) {
    return res.status(400).json({ error: "Domain name is required" });
  }

  // Execute Nmap command with the provided domain
  exec(`nmap -sT ${domain}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Nmap: ${error}`);
      return res.status(500).json({ error: "Failed to execute Nmap" });
    }
    if (stderr) {
      console.error(`Nmap stderr: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }

    // Send the Nmap scan output to the client

    console.log(stdout);
    

    res.status(200).json({
      success: true,
      message: "Scanning Successful",
      data: stdout,
    });
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/info", (req, res) => {
  res.render("info.ejs");
});

app.get("/nmap", (req, res) => {
  res.render("nmap");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

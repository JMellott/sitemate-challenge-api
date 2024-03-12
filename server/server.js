const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let issues = [];

// Get issue by id
app.get('/api/issue/:id', (req, res) => {
    const issue = issues.find((item) => item.id == req.params.id)
    if (issue) {
        console.log("Get: ", issue)
        res.json(issue);
    } else {
        console.log("Error: No issue found with given id");
        res.json({"Error": "No issue found with given id"});
    }
});

// Create new issue
app.post('/api/issue', (req, res) => {
    const newIssue = req.body;
    issues.push(newIssue);
    console.log("Create:", newIssue);
    res.json(newIssue);
});

// Update issue by id
app.put('/api/issue', (req, res) => {
    const updatedIssue = req.body;
    const index = issues.findIndex((item) => item.id == updatedIssue.id)
    if (index !== -1) {
      issues[index] = updatedIssue;
      console.log("Updated:", updatedIssue);
      res.json(updatedIssue);
    } else {
      res.status(404).json({ error: 'Issue not found' });
    }
});

// Delete issue by id
app.delete('/api/issue/:id', (req, res) => {
    const id = req.params.id;
    const index = issues.findIndex((item) => item.id == req.params.id);
    if (index !== -1) {
      const deletedIssue = issues.splice(index, 1)[0];
      console.log("Deleted:", deletedIssue);
      res.json(deletedIssue);
    } else {
      res.status(404).json({ error: 'Issue not found' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

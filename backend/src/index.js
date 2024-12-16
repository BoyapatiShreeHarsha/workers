const express = require('express');
const { Worker } = require('worker_threads');
const { fork } = require('child_process');
const path = require('path');
const app = express();

const port = 8000;

app.get("/", (req, res) => {
    res.send("Server is up");
})

app.get("/worker", (req, res) => {
    let start = Date.now();
    const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
        workerData: { number: 20_000_000_000 }
    });
    worker.on('message', (data) => {
        res.status(200).json({ data, timeTaken: Date.now() - start })
    })
    worker.on('error', (error) => {
        res.status(404).json({ error })
    })
})

app.get("/child", (req, res) => {
    let start = Date.now();
    const child = fork(path.resolve(__dirname, 'child.js'));
    child.send({ number: 20_000_000_000 });
    child.on('message', (data) => {
        res.status(200).json({ data, timeTaken: Date.now() - start })
    })
    child.on('error', (error) => {
        res.status(404).json({ error })
    })
})

app.listen(port, () => {
    console.log(`listening at port:${port}`);
})
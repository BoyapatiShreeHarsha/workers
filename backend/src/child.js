process.on('message', (data) => {
    let counter = 0;
    for (let i = 0; i < data.number; i++) {
        counter++;
    }
    process.send(counter)
})
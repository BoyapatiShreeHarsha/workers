onmessage = (e) => {
  let result = 0;
  for (let i = 0; i < e.data.number; i++) {
    result++;
  }
  postMessage(result);
};

import Worker from "./worker.ts?worker";

function App() {
  const handleBtn1 = () => {
    const divElement = document.getElementById("logs");
    const p = document.createElement("li");
    p.innerText = "hello";
    divElement?.appendChild(p);
  };

  const handleBtn2 = () => {
    const start = Date.now();
    const worker = new Worker();
    worker.postMessage({ number: 20_000_000_000 });
    worker.onmessage = (e) => {
      const divElement = document.getElementById("result");
      if (divElement) {
        divElement.innerText = `Result: ${e.data} in Time ${
          Date.now() - start
        }ms`;
      }
    };
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Web workers</h1>
      <div>
        <button onClick={handleBtn1}>hello btn</button>
        <button onClick={handleBtn2}>Result</button>
      </div>
      <div id="result"></div>
      <div id="logs"></div>
    </div>
  );
}

export default App;

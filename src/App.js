import React, { useRef, useEffect, useState } from "react";
import "./App.css";

function App() {
  const workerRef = useRef(null);
  const canvasWorkerRef = useRef(null);
  const [log, setLog] = useState(0);

  const onClickInteract = () => {
    const value = parseInt(log, 10) + 1;
    setLog(value);
  };

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("./test.worker.js", import.meta.url)
    );
    const offscreen = canvasWorkerRef.current.transferControlToOffscreen();
    workerRef.current.postMessage({ msg: "init", canvas: offscreen }, [
      offscreen,
    ]);

    playAnimation();
  }, []);

  const playAnimation = () => {
    workerRef.current.postMessage({ msg: "start", isThemed: true });
  };

  return (
    <main className="supported">
      <section>
        <p className="desc">
          If an app has long running rendering tasks (e.g. ray tracing in
          WebGL), running those tasks in a worker allows the web app’s UI to
          remain responsive while the rendering task runs continuously in the
          background.
        </p>
        <p className="desc">
          The animation below is running a heavy task while changing the color
          theme. If you click on the button at such moment, the interaction is
          blocked for a short while causing bad user experience.
        </p>
        <p>
          <label className="lbl">"Runs in worker"</label>
        </p>
        <p>
          <button onClick={onClickInteract}>
            Click me! Counter: <span id="log">{log}</span>
          </button>
        </p>

        <div className="display">
          <div>
            <h1>Canvas on worker thread</h1>
            <p>Interaction works even if a theme is loading</p>
            <canvas width="400" height="400" ref={canvasWorkerRef} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

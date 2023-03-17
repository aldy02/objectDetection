import Webcam from "react-webcam"
import * as tf from "@tensorflow/tfjs"
import * as cocoModel from "@tensorflow-models/coco-ssd"
import { useState, useEffect } from "react";

function App() {

  const [model, setModel] = useState()

  const videoConstraints = {
    with: 720,
    height: 480,
    facingMode: 'environment',
    frameRate: { ideal: 30, max: 60 }

  }

  async function recognizeObject() {
    const result = await model.detect(document.getElementById('dataTest'))
    console.log(result);
  }

  async function loadModel() {
    try {
      // Set Dataset
      const data = await cocoModel.load()
      setModel(data)
      //
    } catch (err) {
      console.log("Something went wrong!, ", err);
    }
  }

  useEffect(() => {
    tf.ready().then(() => {
      loadModel()
    })
  }, [])

  console.log();
  
  return (
    <div className="App">
      <p>Test</p>
      <Webcam id="dataTest" audio={false} videoConstraints={videoConstraints} /> <br />
      <button onClick={() => recognizeObject()}>Check</button>
    </div>
  );
}

export default App;
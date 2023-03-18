import Webcam from "react-webcam"
import * as tf from "@tensorflow/tfjs"
import * as cocoModel from "@tensorflow-models/coco-ssd"
import { useState, useEffect } from "react";
import './App.css'

function App() {

  const [model, setModel] = useState()
  const [objectResult, setObjectResult] = useState()

  const videoConstraints = {
    width: 917,
    height: 536,
    facingMode: 'environment',
    frameRate: { ideal: 30, max: 60 }

  }

  async function recognizeObject() {
    const result = await model.detect(document.getElementById('dataTest'))
    setObjectResult(result)
    // console.log(result);
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


  return (
    <div className="App">
      <p id="header">Object Detection</p>
      <div className="container">
        <div className="camera">
          <Webcam id="dataTest" audio={false} mirrored={true} videoConstraints={videoConstraints} /> <br />
        </div>
        <div className="resultContainer">
          <div className='resultBox'>
            <h2 id="resultHeader">RESULT</h2>
            <div className="resultBody">
              {objectResult?.map((result, index) => (
                <p id="textResult" key={index}>{`${result.class} acuracy ${(result.score*100).toFixed(2)}%`}</p>
              ))}
            </div>
          </div>
          <button id="btnCheck" onClick={() => recognizeObject()}>CHECK</button>
        </div>
      </div>
    </div>
  );
}

export default App;
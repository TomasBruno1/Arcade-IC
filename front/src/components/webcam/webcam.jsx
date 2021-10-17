import React, {useState} from 'react';
import Webcam from "react-webcam";
import {Button} from "@material-ui/core";
import './Webcam.css';

const WebcamComponent = () => <Webcam/>;

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

export const WebcamCapture = (props) => {

    const [image, setImage] = useState('');
    const webcamRef = React.useRef(null);


    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            const image = webcamRef.current;
            setImage(imageSrc)
            props.setPicture(imageSrc);
        });

    return (
        <>
            <div className="webcam-container">
                {image === '' ? <Webcam
                    audio={false}
                    height={200}
                    mirrored={true}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={videoConstraints}
                /> : <img src={image}/>}
            </div>
            <div className="webcam-container">
                {image !== '' ?
                    <Button
                        color="primary"
                        id='face-recognition-button'
                        onClick={(e) => {
                            e.preventDefault();
                            setImage('')
                        }}>
                        Retake Image</Button> :
                    <Button
                        color="primary"
                        id='face-recognition-button'
                        onClick={(e) => {
                            e.preventDefault();
                            capture();
                        }}>Capture</Button>
                }
            </div>
        </>

    );
};
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
            setImage(imageSrc)

            let arr = imageSrc.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }


            props.setPicture(new File([u8arr], `${props.user}.jpg`, {type:mime}));
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
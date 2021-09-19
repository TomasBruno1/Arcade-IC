import cv2
import mediapipe as mp

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_pose = mp.solutions.pose

# For webcam input:
cap = cv2.VideoCapture(0)
cap.set(3, 1280)
cap.set(4, 720)

colorR = (255, 0, 255)
textR = "none"

with mp_pose.Pose(
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5) as pose:
    while cap.isOpened():
        success, image = cap.read()
        if not success:
            print("Ignoring empty camera frame.")
            # If loading a video, use 'break' instead of 'continue'.
            continue

        # Flip the image horizontally for a later selfie-view display, and convert
        # the BGR image to RGB.
        image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)
        # To improve performance, optionally mark the image as not writeable to
        # pass by reference.
        image.flags.writeable = False
        results = pose.process(image)

        # Draw the pose annotation on the image.
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        mp_drawing.draw_landmarks(
            image,
            results.pose_landmarks,
            mp_pose.POSE_CONNECTIONS,
            landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())

        if results.pose_landmarks.landmark:
            leftHand = results.pose_landmarks.landmark[16]
            rightHand = results.pose_landmarks.landmark[15]
            if (0.3 < leftHand.x < 0.7 and 0 < leftHand.y < 0.25) or (0.3 < rightHand.x < 0.7 and 0 < rightHand.y < 0.25):
                colorR = 0, 255, 0
                textR = "UP"
            elif (0.3 < leftHand.x < 0.7 and 0.75 < leftHand.y < 1) or (0.3 < rightHand.x < 0.7 and 0.75 < rightHand.y < 1):
                colorR = 0, 255, 0
                textR = "DOWN"
            elif (0 < leftHand.x < 0.25 and 0.3 < leftHand.y < 0.7) or (0 < rightHand.x < 0.25 and 0.3 < rightHand.y < 0.7):
                colorR = 0, 255, 0
                textR = "LEFT"
            elif (0.75 < leftHand.x < 1 and 0.3 < leftHand.y < 0.7) or (0.75 < rightHand.x < 1 and 0.3 < rightHand.y < 0.7):
                colorR = 0, 255, 0
                textR = "RIGHT"
            else:
                colorR = 255, 0, 255
                textR = "none"

        cv2.rectangle(image, (100, 100), (300, 300), colorR, cv2.FILLED)
        cv2.putText(image, textR, (120, 220), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 0))

        cv2.imshow('MediaPipe Pose', image)
        if cv2.waitKey(5) & 0xFF == 27:
            break

cap.release()

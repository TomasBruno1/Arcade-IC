import cv2
import mediapipe as mp
import pyautogui as keyboard_controller


mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_holistic = mp.solutions.holistic

# For webcam input:
cap = cv2.VideoCapture(0)
cap.set(3, 1280)
cap.set(4, 720)

colorR = (255, 0, 255)
textR = "none"

upIsPressed = False
downIsPressed = False
leftIsPressed = False
rightIsPressed = False


def press_key(is_pressed, key):
    global colorR
    colorR = 0, 255, 0
    if not is_pressed:
        keyboard_controller.keyDown(key)
        is_pressed = True
    global textR
    textR = key
    return is_pressed


def release_key(key):
    keyboard_controller.keyUp(key)
    return False


with mp_holistic.Holistic(
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5) as holistic:
    while cap.isOpened():
        success, image = cap.read()
        if not success:
            print("Ignoring empty camera frame.")
            continue

        image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
        results = holistic.process(image)

        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        mp_drawing.draw_landmarks(
            image,
            results.pose_landmarks,
            mp_holistic.POSE_CONNECTIONS,
            landmark_drawing_spec=mp_drawing_styles
                .get_default_pose_landmarks_style())
        mp_drawing.draw_landmarks(image,
                                  results.left_hand_landmarks,
                                  mp_holistic.HAND_CONNECTIONS,
                                  landmark_drawing_spec=mp_drawing_styles
                                  .get_default_hand_landmarks_style()
                                  )
        mp_drawing.draw_landmarks(image,
                                  results.right_hand_landmarks,
                                  mp_holistic.HAND_CONNECTIONS,
                                  landmark_drawing_spec=mp_drawing_styles
                                  .get_default_hand_landmarks_style()
                                  )

        if results.pose_landmarks and results.left_hand_landmarks and results.right_hand_landmarks:
            leftHand = results.pose_landmarks.landmark[20]
            rightHand = results.pose_landmarks.landmark[19]

            if (0.3 < leftHand.x < 0.7 and 0 < leftHand.y < 0.25) or (
                    0.3 < rightHand.x < 0.7 and 0 < rightHand.y < 0.25):
                upIsPressed = press_key(upIsPressed, 'up')
            elif upIsPressed:
                upIsPressed = release_key('up')

            if (0.3 < leftHand.x < 0.7 and 0.75 < leftHand.y < 1) or (
                    0.3 < rightHand.x < 0.7 and 0.75 < rightHand.y < 1):
                downIsPressed = press_key(downIsPressed, 'down')
            elif downIsPressed:
                downIsPressed = release_key('down')

            if (0 < leftHand.x < 0.25 and 0.3 < leftHand.y < 0.7) or (
                    0 < rightHand.x < 0.25 and 0.3 < rightHand.y < 0.7):
                leftIsPressed = press_key(leftIsPressed, 'left')
            elif leftIsPressed:
                leftIsPressed = release_key('left')

            if (0.75 < leftHand.x < 1 and 0.3 < leftHand.y < 0.7) or (
                    0.75 < rightHand.x < 1 and 0.3 < rightHand.y < 0.7):
                rightIsPressed = press_key(rightIsPressed, 'right')
            elif rightIsPressed:
                rightIsPressed = release_key('right')

            if (0.25 < leftHand.x < 0.75 and 0.25 < leftHand.y < 0.75) and (
                    0.25 < rightHand.x < 0.75 and 0.25 < rightHand.y < 0.75):
                colorR = 255, 0, 255
                textR = "none"

        cv2.rectangle(image, (100, 100), (300, 300), colorR, cv2.FILLED)
        cv2.putText(image, textR, (120, 220), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 0))

        cv2.imshow('MediaPipe Holistic', image)
        if cv2.waitKey(5) & 0xFF == 27:
            break
cap.release()
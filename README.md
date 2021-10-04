# Retro Web Kinect
Introducción a la computación python project by [TomasBruno1](https://github.com/TomasBruno1), [TomasBerretta](https://github.com/TomasBerretta), [CatalinaMendizabal](https://github.com/CatalinaMendizabal) and [NumaLeone](https://github.com/NumaLeone).

# Trabajo Práctico


# Introducción a la computación


## **_<span style="text-decoration:underline;">Profesores:</span>_** _Alejandro Silvestri, Ignacio Nuñez, Facundo González_


## **_<span style="text-decoration:underline;">Alumnos:</span>_ _Tomás Bruno, Tomás Berretta, Numa Leone Elizalde, Catalina Mendizabal_**



**<span style="text-decoration:underline;">Introducción</span>**

La idea principal del proyecto consiste en la creación de un arcade en donde en lugar de utilizar un dispositivo físico para jugar se puedan utilizar gestos realizados por el jugador, los cuales serán captados mediante un cámara y procesados como input para el juego.

**<span style="text-decoration:underline;">Iniciando con el proyecto</span>**

Para poder llevar a cabo el proyecto, primero debemos contar con diversos elementos de hardware y software que nos ayuden como herramientas para la implementación del arcade. 

_<span style="text-decoration:underline;">Para el hardware necesitamos contar con:</span>_



* Cámara para el reconocimiento de movimientos 
* Laptop para manejar el streaming: elegimos utilizar una laptop en lugar de una RaspberryPi debido a que el manejo de streaming es constante. 

_<span style="text-decoration:underline;">Para la parte del software:</span>_



* Django REST framework
* React.js
* MediaPipe para poder reconocer los diferentes tipos de gestos.

**<span style="text-decoration:underline;">Desarrollo:</span>**

En primer lugar, vamos a comenzar haciendo una REST API con Django para poder manejar los usuarios, leaderboards y toda la información relacionada con los juegos. 

Luego, utilizando React.js realizaremos una aplicación web en la cual se puedan registrar los usuarios y jugar a los respectivos juegos. El registro de los usuarios se realizará mediante el pedido de información básica, como un nombre de usuario, y la toma de imágenes para poder ingresar mediante el uso del reconocimiento facial. Para esto, tenemos pensado utilizar librerías como face_recognition en conjunto de Python y OpenCV.

Así mismo, para lograr que el usuario pueda jugar utilizando sus gestos, se correrá un script de fondo, el cual tomará la cámara como input reconociendo los gestos realizados por la persona y la posición de sus manos.

Por último, para el reconocimiento de estos movimientos de la persona, consideramos utilizar MediaPipe que nos permite captar tanto los movimientos de la mano de la persona, como también distintas poses que el jugador realice. Se va a realizar un “mapeo” de los distintos gestos y poses a los distintos botones que tiene un arcade o joystick tradicional para poder interactuar con el juego.

**<span style="text-decoration:underline;">Primera etapa</span>**

En esta primera etapa, creímos que era de suma importancia comenzar con la parte del software. Por este motivo, nuestro objetivo era lograr generar un programa capaz de interpretar nuestros movimientos corporales mediante el uso de una WebCam, para poder luego utilizar los movimientos de la persona como los controles del juego.

Comenzamos investigando sobre la librería MediaPipe y las diversas soluciones que esta nos propone para el reconocimiento corporal. Como primera opción, miramos la herramienta para las manos. La forma de operar es la siguiente: Con OpenCV se genera un objeto VideoCapture para tomar los video frames de la webcam. Luego, como OpenCV usa frames con el formato BGR y MediaPipe con RGB hay que hacer un cambio. Hecho esto, se siguen procesando los frames con landmarks según el tipo de modelo que estemos usando y van produciendo un “result” que indica si en el frame se encontró algún landmark. Implementamos la herramienta con Python y pudimos captar los diversos puntos de ambas manos. En un principio creímos que nos iba a ser de mucha ayuda, pero luego nos dimos cuenta que si para la emulación de los controles del arcade éramos capaces de interpretar otras partes del cuerpo, íbamos a poder generar más control y precisión para lograr nuestro objetivo.

<p align="center">
 <img src= "https://github.com/TomasBruno1/Arcade-IC/blob/master/mano1.png" width=400 >
 <img src= "https://github.com/TomasBruno1/Arcade-IC/blob/master/mano2.png" width=400 >
</p>

Luego de familiarizarnos con el control de los diversos puntos de la mano, decidimos optar por la herramienta de la librería MediaPipe llamada Pose. Esta nueva herramienta nos brindaba la posibilidad de reconocer el cuerpo de la persona por completo, teniendo en cuenta diversos puntos corporales y faciales. Esto nos fue de mucha utilidad ya que en conjunto con el lenguaje Python, logramos reconocer ciertos puntos de ambas manos para lograr simular los controles de “up”, “down”, “left” y “right” de un típico control de videojuegos.

<p align="center">
 <img src= "https://github.com/TomasBruno1/Arcade-IC/blob/master/poseNone.png" width=400 >
 <img src= "https://github.com/TomasBruno1/Arcade-IC/blob/master/poseLeft.png" width=400 >
 <img src= "https://github.com/TomasBruno1/Arcade-IC/blob/master/poseRight.png" width=400 >
 <img src= "https://github.com/TomasBruno1/Arcade-IC/blob/master/poseUP.png" width=400 >
 <img src= "https://github.com/TomasBruno1/Arcade-IC/blob/master/poseDown.png" width=400 >
</p>

Una vez que probamos las herramientas de Pose y Hands por separado, decidimos usar Holistic, la cuál es un conjunto de ambas con la adición de Face. Esto nos va a permitir incorporar más formas de controlar los distintos inputs que posee un control de arcade mediante la combinación de gestos tanto de las manos como de todo el cuerpo.

**<span style="text-decoration:underline;">Comienzo implementación Face Recognition y diseño web</span>**

Usando la biblioteca face_recognition empezamos a implementar un script que reconozca la cara de una persona en una foto. El funcionamiento de esta biblioteca se realiza utilizando un directorio el cual contiene imágenes de personas para realizar el encoding de esa persona.  Luego, cuando le pasas una imagen específica, esta se encodea para poder compararla con las imágenes del directorio.

Para el desarrollo de la página web, empezamos diseñando unos wireframes para las pantallas que tenemos pensado implementar : Landing Page, Register Page, Login Page, Home Page y Dashboard. Una vez hecho esto, comenzamos con la implementación de las páginas utilizando React.js.

**<span style="text-decoration:underline;">Referencias: </span>**

[https://www.figma.com/file/rNgWfEkZC4nLj4hhakDGO3/RetroMove?node-id=313%3A339](https://www.figma.com/file/rNgWfEkZC4nLj4hhakDGO3/RetroMove?node-id=313%3A339) 

[https://google.github.io/mediapipe/](https://google.github.io/mediapipe/) 

[https://www.irjet.net/archives/V4/i11/IRJET-V4I11182.pdf](https://www.irjet.net/archives/V4/i11/IRJET-V4I11182.pdf)

[https://www.django-rest-framework.org/](https://www.django-rest-framework.org/)  

[https://es.reactjs.org/](https://es.reactjs.org/)  

[https://github.com/ageitgey/face_recognition](https://github.com/ageitgey/face_recognition)

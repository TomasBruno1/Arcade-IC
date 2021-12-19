<h1>RetroMove</h1>


<h1>Introducción a la computación</h1>


**_<span style="text-decoration:underline;">Profesores:</span>_** _Alejandro Silvestri, Ignacio Nuñez, Facundo González_

**_<span style="text-decoration:underline;">Alumnos:</span>_ _Tomás Bruno, Tomás Berretta, Catalina Mendizabal, Numa Leone Elizalde_**



**<span style="text-decoration:underline;">Introducción</span>**

La idea principal del proyecto consiste en la creación de una aplicación web en donde en lugar de utilizar un dispositivo físico para jugar se puedan utilizar gestos realizados por el jugador, los cuales serán captados mediante un cámara y procesados como input para los distintos juegos. Además, el inicio de sesión de la aplicación funcionará con reconocimiento facial.

**<span style="text-decoration:underline;">Iniciando con el proyecto</span>**

Para poder llevar a cabo el proyecto, primero debemos contar con diversos elementos de hardware y software que nos ayuden como herramientas para la implementación del mismo. 

_<span style="text-decoration:underline;">Para el hardware necesitamos contar con:</span>_



* Cámara para el reconocimiento de movimientos (en este caso decidimos utilizar la cámara de la laptop).
* Laptop para manejar el streaming y correr la aplicación: elegimos utilizar una laptop en lugar de una RaspberryPi debido a que el manejo de streaming es constante.

_<span style="text-decoration:underline;">Para la parte del software:</span>_



* Django REST framework 
* React.js
* MediaPipe para poder reconocer los diferentes tipos de gestos.
* Biblioteca face-recognition para identificar a los jugadores permitiendo que puedan iniciar sesión

**<span style="text-decoration:underline;">Desarrollo:</span>**

En primer lugar, vamos a comenzar haciendo una REST API con Django para poder manejar los usuarios, leaderboards y toda la información relacionada con los juegos. 

Luego, utilizando React.js realizaremos una aplicación web en la cual se puedan registrar los usuarios y jugar a los respectivos juegos. El registro de los usuarios se realizará mediante el pedido de información básica, como un nombre de usuario, y la toma de imágenes para poder ingresar mediante el uso del reconocimiento facial. Para esto, se decidió utilizar la biblioteca face_recognition en Python, la cual funciona de la siguiente manera:



1. Detecta en donde se encuentra la cara en la imagen.
2. Agrega puntos de referencia en la cara para después rotar, transformar y escalar la imagen de forma que quede posicionada mirando hacia el frente.
3. Utiliza una red neuronal entrenada para realizar un encode de la cara.
4. Compara el encoding de la cara calculado en el paso anterior con aquellas caras ya asociadas a nombres, y devuelve el nombre si coinciden.

Así mismo, para lograr que el usuario pueda jugar utilizando sus gestos, se correrá un script de fondo, el cual tomará la cámara como input reconociendo los gestos realizados por la persona y la posición de sus manos.

Por último, para el reconocimiento de estos movimientos de la persona, utilizamos MediaPipe que nos permite captar tanto los movimientos de la mano de la persona, como también distintas poses que el jugador realice. Se va a realizar un “mapeo” de los distintos gestos y poses a los distintos botones que permiten mover al jugador en los distintos juegos.

**<span style="text-decoration:underline;">Primera etapa</span>**

En esta primera etapa, creímos que era de suma importancia comenzar con la parte del reconocimiento de movimientos. Por este motivo, nuestro objetivo era lograr generar un programa capaz de interpretar nuestros movimientos corporales mediante el uso de una WebCam, para poder luego utilizar los movimientos de la persona como los controles del juego.

Comenzamos investigando sobre la biblioteca MediaPipe y las diversas soluciones que esta nos propone para el reconocimiento corporal. Como primera opción, miramos la herramienta para las manos. La forma de operar es la siguiente: Con OpenCV se genera un objeto VideoCapture para tomar los video frames de la webcam. Luego, como OpenCV usa frames con el formato BGR y MediaPipe con RGB hay que hacer una transformación. Hecho esto, se siguen procesando los frames con landmarks según el tipo de modelo que estemos usando y van produciendo un resultado que indica si en el frame se encontró algún landmark. Implementamos la herramienta con Python y pudimos captar los diversos puntos de ambas manos.

--------------------------------------------------------------------

Luego de familiarizarnos con el control de los diversos puntos de la mano, decidimos optar por la herramienta de la librería MediaPipe llamada Pose. Esta nueva herramienta nos brindaba la posibilidad de reconocer el cuerpo de la persona por completo, teniendo en cuenta diversos puntos corporales y faciales. Esto nos fue de mucha utilidad ya que en conjunto con el lenguaje Python, logramos reconocer ciertos puntos de ambas manos para lograr simular los controles de “up”, “down”, “left” y “right” de un típico control de videojuegos.

---------------------------------------------------------------------

Una vez que probamos las herramientas de Pose y Hands por separado, decidimos usar Holistic, la cuál es un conjunto de ambas con la adición de Face. Esto nos va a permitir incorporar más formas de controlar los distintos inputs que posee un control de arcade mediante la combinación de gestos tanto de las manos como de todo el cuerpo.

**<span style="text-decoration:underline;">Comienzo implementación Face Recognition y diseño web</span>**

Usando la biblioteca face_recognition empezamos a implementar un script que reconozca la cara de una persona en una foto. El funcionamiento de esta biblioteca se realiza utilizando un directorio el cual contiene imágenes de personas para realizar el encoding de esa persona. Luego, cuando le pasas una imagen específica, esta se encodea para poder compararla con las imágenes del directorio.



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


-------------------------------------------------------------------


Para el desarrollo de la página web, empezamos diseñando unos wireframes para las pantallas que tenemos pensado implementar: Landing Page, Register Page, Login Page, Home Page y Leaderboard. Una vez hecho esto, comenzamos con la implementación de las páginas utilizando React.js.

A su vez, se realizó el backend de la aplicación utilizando Django REST framework. Para esto se generó un modelo User el cual tiene nombre de usuario, la imagen que lo representa, y sus puntajes máximos en los distintos juegos. Se utiliza una base de datos SQlite. Para proveer distintos endpoints al frontend, se implementaron views provistas por Django y distintos urls a los cuales se les pueden pedir datos.

**<span style="text-decoration:underline;">Resultado final </span>**

Luego de haber integrado todo (Mediapipe, face-recognition, Django y React.js) , llegamos a obtener el siguiente resultado:



_Pantalla de registro de usuario_

_Pantalla de home_

_Pantalla de juego_

_Pantalla de leaderboard_

_Pantalla de juego en conjunto con mediapipe_


**<span style="text-decoration:underline;">Source code</span>**

Se puede encontrar todo el código del proyecto en el siguiente repositorio de GitHub:

[https://github.com/TomasBruno1/RetroMove](https://github.com/TomasBruno1/RetroMove)<span style="text-decoration:underline;"> </span>

**<span style="text-decoration:underline;">Referencias: </span>**

[https://www.figma.com/file/rNgWfEkZC4nLj4hhakDGO3/RetroMove?node-id=313%3A339](https://www.figma.com/file/rNgWfEkZC4nLj4hhakDGO3/RetroMove?node-id=313%3A339) 

[https://google.github.io/mediapipe/](https://google.github.io/mediapipe/) 

[https://www.irjet.net/archives/V4/i11/IRJET-V4I11182.pdf](https://www.irjet.net/archives/V4/i11/IRJET-V4I11182.pdf)

[https://www.django-rest-framework.org/](https://www.django-rest-framework.org/)  

[https://es.reactjs.org/](https://es.reactjs.org/)  

[https://github.com/ageitgey/face_recognition](https://github.com/ageitgey/face_recognition)

[https://github.com/felamaslen/pacman-react](https://github.com/felamaslen/pacman-react)

[https://github.com/ChigabigaChannel/react-hour-projects/tree/master/snake-game](https://github.com/ChigabigaChannel/react-hour-projects/tree/master/snake-game)

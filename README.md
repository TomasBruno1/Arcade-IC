# Arcade-IC
Intro comp python project by [TomasBruno1](https://github.com/TomasBruno1), [TomasBerretta](https://github.com/TomasBerretta), [CatalinaMendizabal](https://github.com/CatalinaMendizabal) and [NumaLeone](https://github.com/NumaLeone).


![alt_text](images/image1.png "image_tooltip")



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
* Control NES (USB) / Botones y joystick (estilo arcade) conectados mediante un arduino para el control del juego
* Laptop para manejar el streaming y la emulación: elegimos utilizar una laptop en lugar de una RaspberryPi debido a que el manejo de streaming constante y emulación es muy pesado para esta.  
* Fichero arcade impreso en 3D con sensor infrarrojo
 

_<span style="text-decoration:underline;">Para la parte del software:</span>_



* RetroArch para emular: optamos por utilizar RetroArch en lugar de RetroPie debido a que el primero permite mayor libertad a la hora de correr scripts en el background y en la elección de núcleos para emular una mayor cantidad y variedad de juegos.
* MediaPipe para poder reconocer los diferentes tipos de gestos.

**<span style="text-decoration:underline;">Desarrollo:</span>**

En primer lugar, tenemos pensado realizar el diseño de un fichero para poder realizar la impresión 3D del mismo en caso de ser imposible su compra. Este será utilizado con un sensor infrarrojo para reconocer la cantidad de créditos insertados y de esta manera poder iniciar el juego. 

Luego, utilizando una laptop se realizará la instalación de RetroArch como el emulador de arcade en el cual instalaremos los respectivos juegos. Nuestro “arcade” tendrá un joystick NES conectado mediante USB o una consola de estilo arcade con diferentes botones conectados a un arduino para que pueda interactuar con  la interfaz gráfica. Sin embargo, lo que caracteriza al proyecto es el reconocimiento de movimiento por lo que para los juegos queremos abrir la posibilidad de que una cámara reconozca gestos del jugador y sean utilizados como inputs de un control.

Por último, para el reconocimiento de los movimientos de la persona, consideramos utilizar MediaPipe o alguna librería similar que nos permita captar tanto los movimientos de la mano de la persona, como también distintas poses que realice.  Se va a realizar un “mapeo” de los distintos gestos y poses a los distintos botones que tiene un arcade o joystick tradicional para poder interactuar con el juego.

**<span style="text-decoration:underline;">Primera etapa</span>**

En esta primera etapa, creímos que era de suma importancia comenzar con la parte del software. Por este motivo, nuestro objetivo era lograr generar un programa capaz de interpretar nuestros movimientos corporales mediante el uso de una WebCam, para poder luego utilizar los movimientos de la persona como los controles del juego.

Comenzamos investigando sobre la librería MediaPipe y las diversas soluciones que esta nos propone para el reconocimiento corporal. Como primera opción, miramos la herramienta para las manos. Implementamos la herramienta con Python y pudimos captar los diversos puntos de ambas manos. En un principio creímos que nos iba a ser de mucha ayuda, pero luego nos dimos cuenta que si para la emulación de los controles del arcade éramos capaces de interpretar otras partes del cuerpo, íbamos a poder generar más control y precisión para lograr nuestro objetivo.

Luego de familiarizarnos con el control de los diversos puntos de la mano, decidimos optar por la herramienta de la librería MediaPipe llamada Pose. Esta nueva herramienta nos brindaba la posibilidad de reconocer el cuerpo de la persona por completo, teniendo en cuenta diversos puntos corporales y faciales. Esto nos fue de mucha utilidad ya que en conjunto con el lenguaje Python, logramos reconocer ciertos puntos de ambas manos para lograr simular los controles de “up”, “down”, “left” y “right” de un típico control de videojuegos.

Una vez que probamos las herramientas de Pose y Hands por separado, decidimos usar Holistic, la cuál es un conjunto de ambas con la adición de Face. Esto nos va a permitir incorporar más formas de controlar los distintos inputs que posee un control de arcade mediante la combinación de gestos tanto de las manos como de todo el cuerpo.

**<span style="text-decoration:underline;">Conexión con el emulador</span>**

Una vez implementado un sistema básico de reconocimiento de poses y manos, procedimos a tomar los signos “UP”, “DOWN”, “LEFT” y “RIGHT” como inputs mediante la librería PyAutoGUI. Con esto establecido, empezamos a incorporar los inputs en el emulador RetroArch. Luego de instalar el core de Arcade MAME para poder correr juegos, utilizamos PACMAN como prueba ya que solo requiere los inputs que hasta ahora pudimos implementar.

**<span style="text-decoration:underline;">Referencias: </span>**

[https://google.github.io/mediapipe/](https://google.github.io/mediapipe/) 

[https://www.irjet.net/archives/V4/i11/IRJET-V4I11182.pdf](https://www.irjet.net/archives/V4/i11/IRJET-V4I11182.pdf)

[https://www.retroarch.com/index.php](https://www.retroarch.com/index.php) 

[https://pyautogui.readthedocs.io/en/latest/](https://pyautogui.readthedocs.io/en/latest/) 

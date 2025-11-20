# Shaders

## Objetivo 
El proyecto utiliza un shader personalizado en GLSL (OpenGL Shading Language) para generar un fondo animado de tipo nebulosa que acompaña visualmente al sistema solar representado en Three.js.


## Descripción del Shader

### Uniforms

u_resolution: contiene el ancho y alto de la pantalla en píxeles
u_time: es un contador que incrementa continuamente, proporcionando animación basada en tiempo

### Vertex Shader 

El vertex shader tiene como función posicionar un plano que abarca toda la pantalla. Se utiliza un PlaneGeometry, el cual, al ser renderizado sin matriz de transformación, ocupa el espacio completo en ambos ejes. Esto garantiza que cubra toda el área visible independientemente de la posición de la cámara.
En el vertex shader, la posición original del vértice se asigna directamente a gl_Position, sin transformaciones adicionales. Gracias a esto, el plano ocupa la totalidad de la pantalla, dado que se desea aplicar el shader a el fondo de l imagen.

### Fragment Shader

El fragment shader es el encargado de generar el efecto visual. Su diseño combina tres elementos principales: ruido aleatorio, variación de la onda y mezcla de colores.

Ruido:
Para producir el ruido, se implementa una función basada en operaciones matemáticas simples (sin, dot, fract). Este ruido se suaviza mediante interpolación bilineal, lo que genera una variación continua en los valores y evita transiciones bruscas.

Ondas:
El shader genera una línea ondulante mediante una combinación de funciones seno. Esta línea se desplaza y se distorsiona con el tiempo (u_time), produciendo una animación constante en el fondo. Cada píxel calcula su distancia respecto a esa onda para determinar su intensidad visual.

Esta es la sección que crea el movimiento característico de la aurora:
t = u_time * 0.5: reduce la velocidad de animación a la mitad.
w = sin(p.x * 2. + t) * 0.3 + sin(p.x * 3. - t * 0.6) * 0.2 + 0.2: genera ondas sinusoidales superpuestas.

Desglose de las ondas:

1) Primera onda: sin(p.x * 2. + t) * 0.3, se mueve hacia la derecha con una amplitud de 0.3.

2) Segunda onda: sin(p.x * 3. - t * 0.6) * 0.2, se mueve hacia la izquierda más lentamente, con una amplitud de 0.2.

3) Desplazamiento vertical: +0.2, que eleva ligeramente el centro de las ondas.

Color y brillo:
Los colores se interpolan dinámicamente en función del ruido y de la distancia a la onda. Además, se añade un leve gradiente vertical que incrementa el brillo en la parte superior de la pantalla. El resultado es un fondo con apariencia de nebulosa en movimiento, suave y visualmente atractivo. Esto se consigue mediante el uso de mix(color2, color3, a), que mezcla entre azul y violeta según la intensidad de la aurora, y sin(t + p.x) * 0.5 + 0.5, que oscila entre 0 y 1 según el tiempo y la posición horizontal, generando variaciones horizontales en el color.


## Incorporación al código

Se utiliza un ShaderMaterial con los dos shaders personalizados. El plano que contiene el shader se añade a la escena con las siguientes características:
frustumCulled = false: evita que el motor elimine el plano por estar fuera de la vista.
depthWrite = false y depthTest = false: garantiza que ningún objeto del sistema solar quede oculto por el fondo y viceversa.

Gracias a estas configuraciones, el fondo siempre se dibuja primero, sin interferir con planetas, estrellas o la cámara.

## Resultados

https://codesandbox.io/p/sandbox/ig2526-s6-forked-4kc9cq

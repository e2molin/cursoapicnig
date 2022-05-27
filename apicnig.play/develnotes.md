# Apuntes de desarrollo

## Entendiendo el Base64

En origen el código ASCII se componía de 8 bits, 7 para representar catacreres y 1 bit de control de errores. Con 7 bits se pueden representar 2<sup>7</sup> caracteres, que son 128. A cada uno le corresponde un código del 0 al 127. Los caracteres del 32 [espacio] al 126 [virgulilla ~] son los caracteres imprimibles.

![](assets/tabla-ascii.jpg)

Con estos 128 cracteres iniciales, no se podían representar caracteres como las letras con tilde o la ñ, pñor lo que en 1987 se empezó a desarrollar el código **ASCII extendido**, que utilizaba el octavo bit también para representar información, por lo que pasábamos de 128 a 256 caracteres. Esto se aprobó y definió del todo en la norma ISO/IEC 8889-1:1998.

Sin embargo, esa nueva codificación impedía la comunicación con equipos de impresión. Por ello se creó un código intermedio de 6 bits con todos sus elementos imprimibles, que permitía comunicar equipos con ASCII y **ASCII Extendido**. Con estos seis bits se consiguen codificar 64 caracteres, de ahí su nombre, **Base64**. Se compone de las letras mayúsculas y minúsculas del alfabeto inglés, los numeros del 0 al 9, el signo más + y el signo slash /.

![](assets/table-base64.png)

En Javascript es fácil realizar la codificación y decodificación:

```javascript
// Encode string
const encode = window.btoa('Patata');
console.log(`--- ENCODED --- ${encode}`) 
/* --- ENCODED --- cGF0YXRh */

// Decode string
const decode = window.atob('cGF0YXRh');
console.log(`--- DECODED --- ${decode}`) 
/* --- DECODED --- Patata */

// Otra manera
const input='Kello';
const buffer = new Buffer.from(input);
const base64Converted = buffer.toString('base64');
console.log(base64Converted);

const original = buffer.toString('ascii');
console.log(`original ASCII ${original}`)

// Conversión de una imagen
const fs = require('fs');
const fileBuffer = fs.readFileSync('PATH/nombreImagen.jpg');
const base64Image = fileBuffer.toString('base64');
console.log(base64Image);

// Si partimos de una imagen en Base64 almacenada en imageBuffer
const imageBuffer = new Buffer.from(inputImage,'base64');
fs.writeFileSync('foo.jpeg',imageBuffer)



```

Los archivos adjuntos del correo se transmiten en **Base64**.


### Fuentes

* [base64](https://www.base64encode.org/)
## Documentación de la práctica - Parte de DIW

### Arquitectura:

- **¿Por qué has colocado tus variables en la capa Settings y tus estilos en Components?**:

He colocado mis variables en la capa Settings porque esta capa está destinada a contener todas las configuraciones y valores reutilizables que pueden ser utilizados en diferentes partes del proyecto. Al tener las variables en una capa separada, puedo mantener una estructura organizada y facilitar la gestión de los estilos. Además, al tener los estilos en la capa Components, puedo enfocarme en la creación de componentes específicos sin preocuparme por las variables, lo que me permite una mayor modularidad y reutilización de código. 

- **¿Qué pasaría si importaras Components antes que Settings en el manifiesto?**:

Si importara Components antes que Settings en el manifiesto, podría enfrentar problemas de dependencia. Esto se debe a que los estilos en Components podrían depender de las variables definidas en Settings. Si Components se importa antes, no tendría acceso a esas variables, lo que podría resultar en errores o estilos incorrectos. Por lo tanto, es crucial importar Settings antes que Components para asegurar que todas las variables estén disponibles cuando se necesiten en los estilos de los componentes.

### Metodología:

- **Explica una ventaja real que te haya aportado usar BEM en este examen frente a usar selectores de etiqueta anidados (ej: div > button)**:

Una ventaja real que me ha aportado usar BEM en este examen frente a usar selectores de etiqueta anidados es la claridad y la mantenibilidad del código. BEM me permite crear clases de CSS que son descriptivas y fáciles de entender, lo que facilita la identificación de qué estilos se aplican a cada componente. Además, al usar BEM, puedo evitar conflictos de estilos y asegurar que mis componentes sean reutilizables sin preocuparme por la especificidad de los selectores. En contraste, los selectores de etiqueta anidados pueden volverse complicados y difíciles de mantener a medida que el proyecto crece, lo que puede llevar a errores y dificultades para realizar cambios en el futuro.

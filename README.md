# Test Candidatura BEATEAM

· This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.
· Acceder al directorio del proyecto y ejecutar 'ng serve'. Al final de la compilación podremos acceder a la aplicación navegando a 'localhost:4200'.
· El token de acceso se encuentra encriptado en el servicio 'api.service.ts'.
· La URL de la API se encuentra en el archivo 'GLOBAL.ts'.

## Funcionalidades implementadas

1. Busqueda por cliente.
2. Busqueda por referencia.
3. Busqueda por usuario (el usuario aparece al sostener el raton durante un segundo encima de los indicadores de advertencia al lado de la cantidad solicitada).
4. Busqueda por tipo.
5. Filtrado por estados.

## Funcionalidades no implementadas

1. Filtrado por fecha.
2. Uso del boton buscar, puesto que para las funcionalidades que hemos implementado, no es necesario, la pagina se recarga automaticamente al cambiar una busqueda.

## Mejoras

En otras versiones, se podría mejorar la aplicación separando la seccion de filtrado de la del contenedor central (la tabla), siendo así más accesible a la hora de realizar correctivos y evolutivos. En esta ocasión no lo he contemplado, pues no es una sección muy grande.

## Dificultades encontradas

Me he encontrado con dificultades a la hora de combinar algunos filtros. No poseo mucha experiencia programando filtrados de búsqueda debido a que siempre las he hecho en el backend.

También me he encontrado dificultades para implementar la busqueda por fecha, la cual no funcionaba correctamente, y he decidido finalmente no implementarla la lógica de éstos inputs.


# Jesús Díaz Muñoz - 05 de diciembre de 2021.

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
5. Busqueda por rango de fecha

## Funcionalidades no implementadas

1. Filtrado por estado usando checkboxes

## Mejoras

En otras versiones, se podría mejorar la aplicación separando la seccion de filtrado de la del contenedor central (la tabla), siendo así más accesible a la hora de realizar correctivos y evolutivos. En esta ocasión no lo he contemplado, pues no es una sección muy grande.

## Dificultades encontradas

Me he encontrado con dificultades a la hora de detectar qué checkbox esta marcado.
¿Que he hecho? Bien, en primer lugar, he llamado a la API trayendome en un array todos los estados. En el HTML he hecho un *ngFor por el array y he montado cada estado en un checkbox. El problema me lo he encontrado a la hora de pasar esto a la queryString, pues obtenia el valor del checkbox y siempre obtenía el mismo (el primero de la lista). Solo podia filtrar por estado "Pendiente".


# Jesús Díaz Muñoz - 07 de diciembre de 2021.

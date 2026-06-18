# currency-converter-api
prueba técnica - API conversión de divisas usando Spring Boot

# Sistema de Gestión de Divisas

Este proyecto es una aplicación web desarrollada con **Spring Boot (backend)** y **React (frontend)** que permite gestionar divisas mediante operaciones CRUD (Crear, Leer, Actualizar y Eliminar), conversion de divisas seleccionando a que moneda se requiere. Además, la API está documentada con Swagger.


## Arquitectura del sistema

El sistema está dividido en dos repositorios independientes:

- Backend: Spring Boot (API REST)
- Frontend: React (Vite)


## Tecnologías utilizadas

### Backend:
- Java 17+
- Spring Boot
- Spring Data JPA
- Hibernate
- H2
- Swagger
- Maven

### Frontend:
- React (Vite)
- JavaScript (ES6+)
- Fetch API
- CSS3 (Responsive Design)


## Funcionalidades

### Backend (API REST)
- Crear divisa
- Listar divisas
- Actualizar divisa
- Eliminar divisa
- Conversion de divisas
- Documentación con Swagger

### Frontend
- Visualización de divisas
- Crear nuevas divisas
- Editar divisas existentes
- Eliminar divisas
- Búsqueda de divisas
- Interfaz responsive
- Validaciones y manejo de errores
- Mensajes de éxito y error
- Página de conversion de divisas
- Selección de divisas para la conversión 


## Estructura del proyecto

### Backend

backend/
├── config/
├── controller/
├── dto/
├── entity/
├── exception/
├── mapper/
├── repository/
├── service/


### Frontend

frontend-divisas-react/
├── src/
│ ├── services/
│ ├── App.css
│ ├── App.jsx
│ ├── conversionPage.jsx
│ ├── main.jsx
│ └── styles.css


## Patrones de diseño utilizados

1. Patrón MVC (Model - View - Controller)
2. Patrón Repository
3. Patrón DTO (Data Transfer Object)
4. Patrón Service Layer

## Principios de diseño

1. SRP - Single Responsibility Principle
2. Separation of Concerns
3. Encapsulación
4. Inversión de Dependencias (Dependency Injection)
5. Programación por Abstracción

## Instalación y ejecución

### Backend (Spring Boot)

1. Clonar el repositorio:
Bash: git clone https://github.com/dcrob92/currency-converter-api

2. Ejecutar el proyecto:
Bash: mvn spring-boot:run

3. Acceder a la API: http://localhost:8080/api/currencies

4. Swagger: http://localhost:8080/swagger-ui/index.html


### Frontend(React)

1. Clonar el repositorio
Bash: git clone https://github.com/dcrob92/frontend-divisas-react

2. Instalar dependencias
Bash: npm install

3. Ejecutar el proyecto
Bash: npm run dev

4. acceder a la aplicacion: http://localhost:5173


# Comunicación entre frontend y backend

El frontend consume la API REST del backend mediante fetch: http://localhost:8080/api/currencies

**Importante: El backend debe tener habilitado CORS para permitir solicitudes desde el frontend.**


## Validaciones implementadas

- Campos obligatorios en formulario
- Validación de tipo numérico en valor
- Manejo de errores en peticiones HTTP
- Mensajes de éxito y error en la interfaz
- Ingreso de valores en la conversion

## Diseño UI

- Diseño tipo dashboard moderno
- Layout responsive (móvil y escritorio)
- Tarjetas para visualización de datos
- Barra de búsqueda de divisas
- Botón de conversión de divisas
- Pagina de selección de conversion de divisas segun el valor y moneda ingresados
- Resultado de la conversión

# Evidencias de la interfaz:

Video de Flujo de trabajo:
![Interfaz flujo de Trabajo](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/flujo%20de%20trabajo.gif?raw=true)

1. Interfaz sin registros:
![Interfaz sin registros](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/1%20interfaz-sin-resgitros.png?raw=true)

2. Registro de Divisas
![Registro de Divisas](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/2%20registros%20divisas.png?raw=true)

3. Busqueda de Divisas
![Interfaz sin registros](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/3%20buscar.png?raw=true)

4. Creación de Divisa
![Creación de Divisa](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/4%20crear%20divisa%201.png?raw=true)

4.1 Opción de Divisa
![Opción de Divisa](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/4%20crear%20divisa%202.png?raw=true)

4.2  Estado de creación de Divisa
![Estado de creación de Divisa](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/4%20crear%20divisa%202.png?raw=true)


5. Creacion con éxito de Divisa
![Creacion con éxito de Divisa](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/4%20crear%20divisa%202.png?raw=true)

6. Opción de editar Divisa
![Opción de editar Divisa](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/5%20edicion%20divisa%201.png?raw=true)


6.1 Edicion de Divisa
![Interfaz sin registros](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/1%20interfaz-sin-resgitros.png?raw=true)

6.2 Mensaje de exito de actualización de Divisa
![Mensaje de exito de actualización de Divisa](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/5%20edicion%20divisa%202.png?raw=true)

7. Boton para la direccion al conversor de Divisas
![Boton para la direccion al conversor de Divisas](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/7%20btn_conversor.png?raw=true)

8. Visualizacion de pantalla del conversor
![Visualizacion de pantalla del conversor](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/8%20conversor-divisas.png?raw=true)

9. Selección de Divisas para la conversion
![Ielección de Divisas para la conversion](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/9%20seleccionDivisaConversion.png?raw=true)

10. Botón de conversión
![Botón de conversión](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/10%20actionConvertir.png?raw=true)

11. Conversión Exitosa de Divisas
![Conversión Exitosa de Divisas](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/11%20conversionExitosa.png?raw=true)

12. Página principal
![Página principal](https://github.com/dcrob92/frontend-divisas-react/blob/main/evidencias/12%20PaginaPpal.png?raw=true)

### Autor
**Proyecto desarrollado por Diana Rodriguez** 
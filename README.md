# Mi Portafolio UBB 

Mi Portafolio UBB, es mi proyecto de título para titularme de la carrera de Ingeniería de Ejecución en Computación e Informática.

Este proyecto permite a los alumnos de la Universidad del Bío-Bío disponer de una plataforma web en la que podrán crear un portafolio digital en el que mostrarán las tecnologías que dominan, su experiencia profesional y sus proyectos desarrollados. 

De igual manera, la plataforma servirá como administradora de portafolios, por lo que empleadores podrán entrar a ella, en busca de alumnos para trabajos o prácticas profesionales, facilitando la comunicación entre alumnos y empleadores.

## Vista previa
### Crea tu portafolio digital
<img src="https://github.com/pablovrl/mi-portafolio-ubb/blob/main/public/create-portfolio.gif" width="auto" height="300" />

### Comparte y exporta tu nuevo portafolio
<img src="https://github.com/pablovrl/mi-portafolio-ubb/blob/main/public/share-portfolio.gif" width="auto" height="300" />

## Construido con 

  - [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programación utilizado en todo el proyecto.
  - [Next.js](https://www.nextjs.org/) - Usado como framework de front-end y back-end.
  - [MUI](https://mui.com/) - Para los componentes del front-end.
  - [Prisma.io](https://prisma.io/) - Usado para la comunicación con la base de datos.
  - [Playwright](https://playwright.dev/) - Para los tests end-to-end.
  - [NextAuth.js](https://next-auth.js.org/) - Para la autenticación de usuarios.

## Primeros Pasos 

A continuación se encuentran las instrucciones que permitirán tener una copia del proyecto corriendo en su máquina local.

### Prerequisitos

- [Node](https://nodejs.org/es/)

### Instalación

Clonar el repositorio
```bash
git clone https://github.com/pablovrl/mi-portafolio-ubb.git
```

Entrar a la carpeta raíz
```bash
cd mi-portafolio-ubb
```

Crear un archivo .env con las siguientes variables de entorno:
```bash
DATABASE_URL='' # string de conexión a la bd.
NEXTAUTH_URL='' # url del proyecto
EMAIL='' # email para el envío de correos
EMAIL_PASSWORD='' # token del email

# credenciales para el usuario administrador
ADMIN_EMAIL=''
ADMIN_PASSWORD=''

# credenciales para el usuario que se ocupa en los tests
TEST_EMAIL=''
TEST_PASSWORD=''
```

Instalar dependencias
```bash
npm install
```

Crear las tablas en la base de datos
```bash
npx prisma db push
```

Hacer el seeding a la base de datos
```bash
npx prisma db seed
```

Iniciar proyecto en modo desarrollador
```bash
npm start dev
```

## Tests E2E

Una vez creamos y hacemos el seeding a la base de datos, podemos correr los tests E2E con la siguiente instrucción (la aplicación debe estar corriendo):

```bash
npx playwright test
```

## Autor

  - **Pablo Villarroel** - 
    [pablovrl](https://github.com/pablovrl)

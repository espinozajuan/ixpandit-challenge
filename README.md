### Pasos para correr la aplicación
1. Clonar el repositorio:
```bash
git clone https://github.com/espinozajuan/ixpandit-challenge.git
cd my-app
```
2. Correr el build de Docker:
```bash
docker build -t my-app .
```
3. Ejecutar el contenedor de Docker:
```bash
docker run -p 3000:3000 --env-file .env my-app
```
4. Dentro de Docker, abrimos una terminal y ejecutamos los tests:
```bash
npm test
```
5. Visualizar la aplicación desde `https://localhost:3000`

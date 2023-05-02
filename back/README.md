# Para ejecutar el proyecto instalar la ultima verison de deno

https://deno.land/manual@v1.32.4/getting_started/installation

To test your installation, run deno --version. If this prints the Deno version to the console the installation was successful

Si no teneis instalado Docker:

- Windows https://docs.docker.com/desktop/install/windows-install/

- Mac https://docs.docker.com/desktop/install/mac-install/

- Ubuntu https://docs.docker.com/engine/install/ubuntu/

Para lanzar mongo local usar Docker:

```
docker run -d -p 27017:27017 --name practica_4 mongo:latest
```

Crear un .env igualito que el .env.sample

Una vez instalado y teniendo mongo ejecutandose correctamente lanzar el comando:

```
deno task run
```

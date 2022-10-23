<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Videogames

## Imágenes del Proyecto terminado 
<h2>Landing Page</h2>
<img src ="https://media.discordapp.net/attachments/961831653624381440/1019707611995721738/foto1.png?width=851&height=375" />
<h2>Home</h2>
<img src="https://media.discordapp.net/attachments/961831653624381440/1019707612314476635/foto2.png?width=857&height=375" />
<h2>Formulario de creacion de videojuego</h2>
<img src="https://media.discordapp.net/attachments/961831653624381440/1019707612666789998/foto3.png?width=855&height=375" />
<h2>Detalles de videojuegos</h2>
<img src="https://media.discordapp.net/attachments/961831653624381440/1019707612989771836/foto4.png?width=857&height=375" />



__IMPORTANTE__: No está permitido utilizar los filtrados, ordenamientos y paginados brindados por la API externa, todas estas funcionalidades tienen que implementarlas ustedes.

- [ ] __GET /videogames__:
  - Obtener un listado de los videojuegos
  - Debe devolver solo los datos necesarios para la ruta principal
- [ ] __GET /videogames?name="..."__:
  - Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
  - Si no existe ningún videojuego mostrar un mensaje adecuado
- [ ] __GET /videogame/{idVideogame}__:
  - Obtener el detalle de un videojuego en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
  - Incluir los géneros asociados
- [ ] __GET /genres__:
  - Obtener todos los tipos de géneros de videojuegos posibles
  - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
- [ ] __POST /videogame__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  - Crea un videojuego en la base de datos

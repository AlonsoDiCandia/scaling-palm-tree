
# Instalación

Para revisar este proyecto es necesario tener **Docker** instalado. Para levantar el proyecto, se debe ejecutar el siguiente comando en una terminal ubicada en la carpeta raíz del proyecto:

```bash
docker compose up -d --build
```

Luego, abrir un navegador y acceder a:  
```http://localhost:3000```

Para efectos de este desarrollo, **no se consideró un sistema de inicio de sesión**.

![Página de inicio](images/img1.png)

A continuación, se debe seleccionar el porcentaje de acciones que debe contener el portafolio.

![Página para seleccionar el porcentaje de acciones](images/img2.png)

Se deben seleccionar acciones hasta completar el **100% del portafolio**.

![Porcentaje acciones 2](images/img3.png)

Una vez se haya asignado el 100% de las acciones, se podrá avanzar a la siguiente pantalla.

![Porcentaje acciones 3](images/img4.png)

En esta página se podrá visualizar el precio actual de cada acción y las operaciones necesarias (compra o venta) para mantener el portafolio balanceado según los porcentajes definidos previamente.

![Operando](images/img5.png)

En esta pantalla se simula el cambio de precio de las acciones utilizando como referencia un archivo JSON ubicado en:  
```src/data/precios_acciones_250s.json```

Puede modificar dicho archivo para observar cómo varían los precios. Sin embargo, **por motivos de tiempo**, las acciones utilizadas quedaron codificadas directamente en el proyecto, por lo que **para que funcione correctamente con su set de datos, las acciones deben coincidir con las del JSON** mencionado.

La lógica principal relacionada con el problema planteado se encuentra en:  
```src/models/Portfolio.ts```  
específicamente en la función `rebalance`, que se muestra a continuación:

![Rebalance](images/img6.png)

Para esta prueba, se parte comprando todas las acciones al primer precio disponible en el archivo JSON. Ese es el punto de referencia según el porcentaje seleccionado. Luego, cada 2 segundos se actualiza el precio de las acciones, y con ello se calcula cómo varía el peso porcentual de cada acción dentro del portafolio.

El proceso de cálculo funciona así:

1. Se actualiza el precio de todas las acciones.
2. Se obtiene la valorización total del portafolio.
3. A partir de esto, se determina el porcentaje actual de cada acción dentro del portafolio.
4. Luego, se compara con el porcentaje objetivo definido inicialmente.

- Si la diferencia es **positiva**, significa que el porcentaje actual es menor al esperado → se debe **comprar**.
- Si la diferencia es **negativa**, el porcentaje actual supera al esperado → se debe **vender**.



# Contenido del arhivo .env
PORT=5001



SECRETORPRIVATEKEY=Iq25LtixfmzLj9EosZJcz11HdX02KhaD
DATABASE_URL="mysql://u297027335_juego:u297027335_juegO@82.197.82.40:3306/u297027335_juego"


1. instalar dependecias npm i
2. levantar api con: npm run dev
3.  end point para las peticiones 
    1. /api/code  para validar codigo (requiere codigo valido que se encuentra en la bd)
    2. /api/validate  al precionar el boton (requiere token asignado )
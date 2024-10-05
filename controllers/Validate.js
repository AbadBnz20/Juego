const { response } = require("express");
const prisma = require("../lib/prisma");
const ResponseClient = require("../helpers/responseclient");

const ValidateInformation = async (req, res = response) => {
  const { id_juego, usuario_id,codigo } = req.usuario;
  try {
    const codefind= await prisma.juegos.findFirst({
        where:{
            usuario_id: usuario_id,
            codigo: codigo,
            estado:true
        }
    });
    if (!codefind) {
      return   res.status(400).json({
            status: "Error",
            message: "El intento ya fue registrado",
          });  
    }
    await prisma.$transaction(async (p) => {
      await p.juegos.update({
        where: {
          id_juego: id_juego,
        },
        data: {
          estado: false,
        },
      });

      const attempts = await p.juegos.count({
        where: {
          usuario_id: usuario_id,
          estado: false,
        },
      });

      if (attempts === 5) {
      return  await ResponseClient(usuario_id,attempts,"Este usuario 10,000 Pesos Argentinos",res);
      } else if (attempts === 10) {
        return   await ResponseClient(usuario_id,attempts,"Este usuario gano Perfume A eleccion",res);
      } else if (attempts === 1000) {
        return   await ResponseClient(usuario_id,attempts,"Este usuario gano Viaje para 2 Personas",res);
      } else if (attempts === 5000) {
        return  await ResponseClient(usuario_id,attempts,"Este usuario gano Auto 0Km",res);
      }
      res.json({
        status: "success",
        attempts: attempts,
      });
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "HA ocurrido un problema al procesar los datos",
    });
  }
};

module.exports = ValidateInformation;

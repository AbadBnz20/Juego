const { response } = require("express");
const prisma = require("../lib/prisma");
const { message } = require("../helpers/sendmessage");

const InitChat = async (req, res = response) => {
  try {
    const { ProfileName, WaId, From } = req.body;
    const user = await prisma.juegos.findFirst({
      where: {
        telefono: WaId,
        estado: true,
      },
    });
    if (!user) {
      const cad = `Hola ${ProfileName} en este momento no cuentas con ningun codigo activo. Gracias!.`;
      await message(cad, From);
    }
    await message(
      `Hola ${ProfileName} Este es el codigo para poder ingresar al juego`,
      From
    );
    await message(`Codigo:`, From);
    await message(user.codigo, From);
    await message(
      `Este es el url para ingresar a la pagina web: https://chatgpt.com/`,
      From
    );

    res.json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Error",
    });
  }
};

module.exports = InitChat;

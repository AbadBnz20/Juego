const { response } = require("express");
const prisma = require("../lib/prisma");
const generarJWT = require("../helpers/generateJwt");

const ValidateCode = async (req, res = response) => {
  try {
    const { code } = req.body;
    const user = await prisma.juegos.findFirst({
      where: {
        codigo: code,
        estado: true,
      },
    });

    if (!user) {
      return res.status(204).json({
        status: "success",
        message: "El codigo ingresado no existe o ya fue usado",
      });
    }
    const attempts = await prisma.juegos.count({
      where: {
        usuario_id: user.usuario_id,
        estado: false,
      },
    });
    const token = await generarJWT(user.usuario_id, user.correo_usuario,user.codigo);
    res.json({
      name: user.nombre_completo,
      attempts: attempts,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "Erro al procesar los datos.",
    });
  }
};

module.exports = {
  ValidateCode,
};

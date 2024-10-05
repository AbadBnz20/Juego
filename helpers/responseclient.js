const { response } = require("express");
const prisma = require("../lib/prisma");

const ResponseClient = async (id, attempts,message, res = response) => {
  await prisma.ganadores.create({
    data: {
      usuario_id: id,
      numero_intento: attempts,
      tipo: "10,000 Pesos Argentinos",
    },
  });
  return res.json({
    status: "success",
    attempts: attempts,
    message: message,
  });
};

module.exports = ResponseClient;

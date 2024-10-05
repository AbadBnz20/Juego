const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

const validarJWT = async (req = request, res = response, next) => {
    const authtoken = req.header("Authorization");
    try {
      const token = authtoken.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          status: "error Auth",
          message: "No hay token en la petición",
        });
      }
      const { id,code } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
      const usuariofind = await prisma.juegos.findFirst({
        where:{
            usuario_id:id,
            codigo:code
        }
      });
  
      if (!usuariofind) {
        return res.status(401).json({
          status: "error Auth",
          message: "Token no válido",
        });
      }
    
     
  
      req.usuario = usuariofind;
      next();
    } catch (error) {
      return res.status(401).json({
        status: "error Auth",
        message: "No hay token en la petición",
      });
    }
  };



module.exports= validarJWT;
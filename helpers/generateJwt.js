const jwt = require('jsonwebtoken');

const generarJWT = ( id = '',email='',code='' ) => {
    return new Promise( (resolve, reject) => {

        const payload = { id,email,code };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '3h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}


module.exports = generarJWT
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])
const flowGracias = addKeyword(['7','gracias', 'grac']).addAnswer(
    [
        'de nada, DIRTIC PNP trabajando dia a dia para mejorar la atencion.',
        '@etp',
    ],
    null,
    null,
    [flowSecundario]
)
const flowImagen = addKeyword(['logo']).addAnswer(['📄Logo'],{
    media:'https://drive.google.com/file/d/1-NtyMl_0QcliTqWsB0LgG4g7T3NmTjR-/view?usp=sharing'
})

const flowusuario = addKeyword(['1','error', 'usuario o clave incorrecta']).addAnswer(
    [
        '📄 la contraseña de la INTRANET caduca cada 45 dias, ingresar en el siguiente enlace y genera una nueva contraseña',
        'https://gestionaidentidad.policia.gob.pe/recovery',
        '\n*menu* Para regresar al menu principal.',
    ],
    null,
    null,
    [flowSecundario,flowGracias]
)
const flowusuariodesactivado = addKeyword(['2','usuario bloqueado', 'clave incorecta','bloqueado']).addAnswer(
    [
        '📄 La vigencia de los sistemas policiales son de 6 meses y se tiene que renovar enviando el oficio corespondiente a su OFITIC o  DIVPOL segun sea el caso, adjuntar ela cta corespondiente firmada',
        'https://www.policia.gob.pe/sistemaspnp/tramite-sistemas-policiales.html',
        '\n*2* Para regresar al menu principal.',
    ],
    null,
    null,
    [flowSecundario,flowGracias]
)

const flowSicpip = addKeyword(['3','sicpip', 'cenopol']).addAnswer(
    [
        '📄 para consultas sobre el funcionamiento, correciones de notas informativas, asignar unidad  cominicarce con CENOPOL - SICPIP.',
        '980121831',
        '\n*menu* Para regresar al menu principal.',
    ],
    null,
    null,
    [flowSecundario,flowGracias]
)

const flowCorreoUni = addKeyword(['4','correo', 'crear correo']).addAnswer(
    [
        '📄 Para crear un Correo de UNIDAD *Nuevo o recuperar contraseña* enviar OFICO a la DIRTIC a traves de Mesa de Partes DIGITAL con HT a traves del SIGE ',
        'Dirigido al:',
        'CRNL JARAMILLO CAMPOS SANTOS',
        'Director DIRTIC',
        'designar encargado de la administracion del CORREO nombre, apellidos y telefono',
        'https://mpd.policia.gob.pe/',
        '\n*menu* Para regresar al menu principal.',
    ],
    null,
    null,
    [flowSecundario,flowGracias]
)

const flowCorreoUniRecu = addKeyword(['5','correo', 'recuperar contraseña']).addAnswer(
    [
        '📄 Para crear un Correo de UNIDAD *Nuevo o recuperar contraseña* enviar OFICO a la DIRTIC a traves de Mesa de Partes DIGITAL con HT a traves del SIGE ',
        'Dirigido al:',
        'CRNL JARAMILLO CAMPOS SANTOS',
        'Director DIRTIC',
        'designar encargado de la administracion del CORREO nombre, apellidos y telefono',
        'https://mpd.policia.gob.pe/',
        '\n*menu* Para regresar al menu principal.',
    ],
    null,
    null,
    [flowSecundario,flowGracias]
)

const flowCorreoGestorIdentidad = addKeyword(['6']).addAnswer(
    [
        '📄 Para cambiar el correo para generar su contraseña tiene que ingersar al SIGCP ex AGUILA6 y en *domicilo, correo, telefono* o a tarvez de la OFAD de su DIRICCION o DIVPOL',
        '\n*menu* Para regresar al menu principal.',
    ],
    null,
    null,
    [flowSecundario,flowGracias]
)





const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)




const flowPrincipal = addKeyword(['hola', 'buenos dias', 'ayuda', 'buenas noches','menu'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot* del Centro de Datos DIRTIC PNP')
    .addAnswer(
        [
            '*cual es su consulta*',
            '👉 *1* Usuario o clave incorecta',
            '👉 *2* Usuario bloqueado',
            '👉 *3* conultas sobre SICPIP',
            '👉 *4* Creacion de Correo de UNIDAD',
            '👉 *5* Olvide clave de Correo UNIDAD',
            '👉 *6* el correo registrado para recuperar contraseña es incorrecto',
            '👉 *7 gracias* por segir los pasos',
            'escribe el mensaje de error que sale en pantalla *cerrar el comunicado*'
        ],
        null,
        null,
        [flowusuariodesactivado, flowGracias, flowusuario,flowSicpip,flowCorreoUni,flowCorreoUniRecu,flowCorreoGestorIdentidad]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
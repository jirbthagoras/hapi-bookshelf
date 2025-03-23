const Hapi = require("@hapi/hapi")
const port = 9000;
const { routes } = require("./routes")

const init = async () => {
     const server = Hapi.server({
          port: port,
          host: 'localhost'
     });

     server.route(routes)

     await server.start();
     console.log(`Server listening at ${server.info.uri}`);
}

init();
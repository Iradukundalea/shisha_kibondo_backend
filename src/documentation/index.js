const swaggerJSDoc=require( "swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "SHISHA KIBONDO",
      version: "1.0.0",
      description: "Welcome to easy shisha kibondo",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "easy movement",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "/api",
      }
    ],
    components: {
      securitySchemes: {
        BearerToken: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["**/*.doc.js"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports= swaggerDocs;
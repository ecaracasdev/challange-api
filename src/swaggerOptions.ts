export const options = {
  definition: {
    openapi:"3.0.0",
    info: {
      title:"Challange API",
      version:"1.0.0",
      description:"A simple express library API"
    },
    servers:[
      {
        url:"http://localhost:3000"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type:"http",
          scheme:"bearer",
          bearerFormar:"JWT"
        }
      }
    },
    security: [
      {
        barearAuth:[]
      }
    ]
  },
  apis:["./src/routes/*.ts"]
}
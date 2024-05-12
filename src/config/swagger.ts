import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from 'swagger-ui-express';


const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version: '1.0.0',
            description: 'API docs for Products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)


// Customizar apariencia

const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('https://xxxxxxxxxxxxxxxxxxxxxxx');
            height: 120px;
            width: auto;
        }
    `,
    customSiteTitle: 'Documentacion Rest API Express / Typescript'
}
export default swaggerSpec
export {
    swaggerUiOptions
}
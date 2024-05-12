import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./midlleware";

const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                    id:
 *                       type: integer
 *                       description: The Product ID
 *                       example: 1
 *                    name:
 *                       type: string
 *                       description: The Product name
 *                       example: Monitor curvo 24 pulgadas
 *                    price:
 *                       type: number
 *                       description: The product price
 *                       example: 300
 *                    availability:
 *                       type: boolean
 *                       description: The product availability
 *                       example: true
 */

/**
 * @swagger
 * /api/products:
 *       get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *               200:
 *                   description: Successful response
 *                   content:
 *                       application/json:
 *                           schema:
 *                               type: array
 *                               items:
 *                                  $ref: '#/components/schemas/Product'
 */

router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *        summary: Get a product by id
 *        tags:
 *             - Products
 *        description: Return a product basde on its unique ID
 *        parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to retrieve
 *                required: true
 *                schema:
 *                    type: integer
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                            schema:
 *                               $ref: '#/components/schemas/Product'
 *            404:
 *                description: Not found
 *            400:
 *                description: Bad request - Invalid ID
 *
 */

router.get(
  "/:id",
  param("id").isInt().withMessage("Valor no admitido"),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products/{id}:
 *  post:
 *       summary: Create a new product
 *       tags:
 *           - Products
 *       description: Return a new record in the database
 *       requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                               name:
 *                                   type: string
 *                                   example: "Monitor curvo 24 pulgadas"
 *                               price:
 *                                   type: number
 *                                   example: 200
 *
 *       responses:
 *             201:
 *              description: Successful response
 *              content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/Product'
 *             400:
 *                 description: Bad request - Invalid input data
 */

router.post(
  "/",
  // Validar y recuperar los mensajes de error si los hubiere

  body("name").notEmpty().withMessage("Debes ingresar un nombre de producto"),

  body("price")
    .isNumeric()
    .withMessage("Valor no admitido")
    .notEmpty()
    .withMessage("Debes ingresar un precio de producto")
    .custom((value) => value > 0)
    .withMessage("Valor no admitido"),

  handleInputErrors,
  createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *     summary: Updates a product with user input
 *     tags:
 *         - Products
 *     description: returns the updates product
 *     parameters:
 *             - in: path
 *               name: id
 *               description: The ID of the product to retrieve
 *               required: true
 *               schema:
 *                    type: integer
 *     requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                name:
 *                                    type: string
 *                                    example: "Monitor curvo 24 pulgadas"
 *                                price:
 *                                    type: number
 *                                    example: 200
 *                                availability:
 *                                    type: boolean
 *                                    example: true
 *     responses:
 *           200:
 *               description: Successful response
 *               content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *           400:
 *              description: Bad request - Invalid ID or Invalid input data
 *           404:
 *              description: Product not found
 */

router.put(
  "/:id",

  param("id").isInt().withMessage("Valor no admitido"),
  // Validar y recuperar los mensajes de error si los hubiere
  body("name").notEmpty().withMessage("Debes ingresar un nombre de producto"),

  body("price")
    .isNumeric()
    .withMessage("Valor no admitido")
    .notEmpty()
    .withMessage("Debes ingresar un precio de producto")
    .custom((value) => value > 0)
    .withMessage("Valor no admitido"),

  body("availability")
    .isBoolean()
    .withMessage("Valor de disponibilidad no válido"),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update product availability
 *     tags:
 *       - Products
 *     description: Returns the updated availability
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid ID 
 *       404:
 *         description: Product not found 
 *     operationId: updateProductAvailability
 */

router.patch(
  "/:id",
  param("id").isInt().withMessage("Valor no admitido"),
  handleInputErrors,
  updateAvailability
);


router.patch(
  "/:id",
  param("id").isInt().withMessage("Valor no admitido"),
  handleInputErrors,
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *       summary: Delete a product by a given ID
 *       tags:
 *           - Products
 *       description: Returns the updated availability
 *       parameters:
 *         - in: path
 *           name: id
 *           description: The ID of the product to delete
 *           required: true
 *           schema:
 *               type: integer
 *       responses:
 *           200:
 *               description: Successful response
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: string
 *                           value: 'Product delete'
 *           400:
 *               description: Bad request - Invalid ID
 *           404:
 *               description: 'Product not found'
 */

router.delete(
  "/:id",
  param("id").isInt().withMessage("Valor no admitido"),
  handleInputErrors,
  deleteProduct
);

export default router;

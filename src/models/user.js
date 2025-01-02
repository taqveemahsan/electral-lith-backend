// src/models/user.js

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - password
 */
class User {
  constructor({ id, name, email, password }) {
    this.id = id;           // integer
    this.name = name;       // string
    this.email = email;     // string
    this.password = password; // string
  }
}

module.exports = User;

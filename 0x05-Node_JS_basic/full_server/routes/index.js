import AppController from '../controllers/AppController';
import StudentsController from '../controllers/StudentsController';

/**
 * Binds express routes.
 * @param {Express} app The Express application.
 * @author Andrew Wreford <https://github.com/wrefinity>
 */
const mapRoutes = (app) => {
  app.get('/', AppController.getHomepage);
  app.get('/students', StudentsController.getAllStudents);
  app.get('/students/:major', StudentsController.getAllStudentsByMajor);
};

export default mapRoutes;
module.exports = mapRoutes;

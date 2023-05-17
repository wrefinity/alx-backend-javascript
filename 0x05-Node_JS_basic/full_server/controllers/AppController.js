/**
 * Hompage handler.
 * @author Andrew wreford <https://github.com/wrefinity>
 */
class AppController {
  static getHomepage(request, response) {
    response.status(200).send('Hello Holberton School!');
  }
}

export default AppController;
module.exports = AppController;

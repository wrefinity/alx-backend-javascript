/**
 * a controller for home page.
 * @author Andrew Wreford <https://github.com/wrefinity>
 */
class AppController {
  static getHomepage(_, res) {
    res.status(200).send('Hello Holberton School!');
  }
}

export default AppController;
module.exports = AppController;

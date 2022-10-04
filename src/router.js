/**
 * A class to control Routers in webpage
 *
 */
export default class Router {
  #routes = {};

  /**
   * Add a new page in the router control
   *
   * @param {string} routerName The name of router
   * @param {string} page The path to the page
   */
  add(routerName, page) {
    this.#routes[routerName] = page;
  };

  /**
   * Get the window URL and load a router to show on webpage, at same time change the body classe to the correspondent ID of the page
   */
  handle() {
    const { pathname } = window.location;
    const route = this.#routes[pathname];

    fetch(route)
    .then(page => page.text())
    .then(html => document.getElementById('app').innerHTML = html);

    document.querySelector('body').setAttribute("id",`${pathname.substring(1) || 'home'}`);
  };

  /**
   * Get the href address and save on history to in case that user back to the last page the document load the last
   *    page that was visited, prevent auto refresh when click on buttons or menus
   *    call the handle to load the href in case that user type a page directly on adress bar
   *
   * @param {object} event Window event
   */
  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  };
};

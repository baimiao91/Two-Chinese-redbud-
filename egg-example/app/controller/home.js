'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = `<p>我是egg-我手动修改的</p>`;
  }
}

module.exports = HomeController;

/*
* @Author: i白描
* @Date:   2019-03-04 18:30:42
* @Last Modified by:   i白描
* @Last Modified time: 2019-03-04 18:31:22
*/
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async list() {
    const { ctx } = this;
    ctx.body = `<p>我是egg-hooby</p>`;
  }
}

module.exports = HomeController;

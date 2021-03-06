import dva from 'dva';
import './index.css';
import './common/css/common.scss'
import './common/js/flexible'
// import 'antd-mobile/dist/antd-mobile.css';

// 引入vconsole
// import VConsole from 'vconsole';
// var vConsole = new VConsole();

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// 挂载发现页models
app.model(require('./models/found').default);
// 挂载登录页models
app.model(require('./models/login').default);
// 挂载账户页models
app.model(require('./models/account').default);
// 挂载搜索页models
app.model(require('./models/search').default);
// 挂载播放页models
app.model(require('./models/play').default);
// 挂载我的页models
app.model(require('./models/mine').default);
// 挂载歌单详情页models
app.model(require('./models/soglitdet').default);

// 4. Router
app.router(require('./router/index').default);

// 5. Start
app.start('#root');
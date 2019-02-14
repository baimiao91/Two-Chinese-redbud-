import dva from 'dva';
import './index.css';
import './common/css/common.scss'
import './common/js/flexible'

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/found').default);

// 4. Router
app.router(require('./router/index').default);

// 5. Start
app.start('#root');
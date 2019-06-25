// redux最核心的模块代码
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
// 向外暴露store对象
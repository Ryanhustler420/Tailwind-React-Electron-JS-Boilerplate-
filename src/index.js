import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TerminalContextProvider } from "react-terminal";

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';

// console.log("\n                  ,d\"=≥,.,qOp,\n                 ,7'  ''²$(  )\n                ,7'      '?q$7'\n             ..,$$,.\n   ,.  .,,--***²\"\"²***--,,.  .,\n ²   ,p²''              ''²q,   ²\n:  ,7'                      '7,  :\n ' $      ,db,      ,db,      $ '\n  '$      ²$$²      ²$$²      $'   \n  '$                          $'        \n   '$.     .,        ,.     .$'\n    'b,     '²«»«»«»²'     ,d'\n     '²?bn,,          ,,nd?²'\n       ,7$ ''²²²²²²²²'' $7,\n     ,² ²$              $² ²,\n     $  :$              $:  $\n     $   $              $   $\n     'b  q:            :p  d'\n      '²«?$.          .$?»²'\n         'b            d'\n       ,²²'?,.      .,?'²²,\n      ²==--≥²²==--==²²≤--==²\n");
// setTimeout(console.log.bind(console, "%c%s", "color: red; background: yellow; font-size: 24px;", "WARNING!"))
// setTimeout(console.log.bind(console, "%c%s", "font-size: 18px;", "Using this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.\nDo not enter or paste code that you do not understand."))
// setTimeout(console.log.bind(console, '%cThis software is made under Company Inc! ', 'background: #f00; color: #eee'));

ReactDOM.render(
  <React.StrictMode>
    <TerminalContextProvider>
      <App />
    </TerminalContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

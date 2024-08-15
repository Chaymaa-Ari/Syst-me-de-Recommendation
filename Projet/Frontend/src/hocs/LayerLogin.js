

import React  from 'react';


import Sign from 'D:/IID2/S2/Projet tuto/Django/my_appD/app1/src/Components/Sign.js';


const LayerLogin = (props)  =>(
      <div>
         <Sign/>
         {props.children}
      </div>
  );

export default LayerLogin;

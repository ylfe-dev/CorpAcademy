import React, { createContext, useRef } from 'react';
export const UserContext = createContext();


export const UserContextProvider = ({ children }) => {

  let local_guid = localStorage.getItem("guid");
  if (!local_guid) {
    local_guid = generateGUID();
    localStorage.setItem("guid", local_guid)
  }

  const state = useRef({ 
    guid: local_guid,
    learnedLanguage: "angielski"
   });


  return (
    <UserContext.Provider value={ state }>
      {children}
    </UserContext.Provider>
  );
};



function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
function Spa() { //single page application
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBcuqgtA_N2XnLl1uf0SB4OvTrTht4rItA",
    authDomain: "badbank-d6968.firebaseapp.com",
    projectId: "badbank-d6968",
    storageBucket: "badbank-d6968.appspot.com",
    messagingSenderId: "430035139494",
    appId: "1:430035139494:web:1a8a908eaf5fc1cc6ead67"
  };
  //Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  return (
    <HashRouter>
      <Route path="/" exact component={Home} />
      <Route path="/account" component={Account} />
      <Route path="/transact" component={Transact}/>
      <Route path="/changePassword" component={changePassword}/>
      <Route path="/APIDocs" component={APIDocs}/>
  </HashRouter>
  );
}

ReactDOM.render( //render it into the DOM
  <Spa/>, //tell what to render
  document.getElementById('root') //tell where to put it in the html page
);

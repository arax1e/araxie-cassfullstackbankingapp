function Home(){
  const [show, setShow] = React.useState(true);

  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newuser, setNewUser] = React.useState('');


  function validate(field, label){
      if (!field) {
        alert('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleLogin(){
    console.log(email,password);
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        console.log('login successful');
        window.location.href = "#/account";
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Invalid credentials. Please try again.");
      });
  }    

  function googleLogin(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
       
        const {additionalUserInfo: {isNewUser}} = result;
      
       if(isNewUser){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "name": `${user.displayName}`,
          "email": `${user.email}`,
          "password": `${user.password}`,
          "balance": 0
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("/api/post", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }
      window.location.href = "#/account";
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      
  }
  function passwordlength(password){
    if(password.length < 8) {
      alert('Password must be more than 8 characters');
      setTimeout(() => setStatus(''),3000);
        return false;
    }
    return true;
  }

  function handleCreate(){
    if (!validate(name,     'Please enter a name'))     return;
    if (!validate(email,    'Please enter an email'))    return;
    if (!validate(password, 'Please enter a password')) return;
    if(!passwordlength(password, 'Password must be more than 8 charaters')) return;
    console.log(name,email,password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .then(function(result) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "name": `${name}`,
        "email": `${email}`,
        "password": `${password}`,
        "balance": 0,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("/api/post", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        
        
      alert('account creation successful');
      window.location.href = "#/account";

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
        
  }    
  
  return (
    <>
    <div className="wrap" id="gap">
    <div className="left-frame">
      <div>
        <div className="panel-3"><span className="hop"></span></div>
        <div className="panel-4"><span className="hop"></span></div>
        <div className="panel-5"><span className="hop"></span></div>			
      </div>
    </div>
    <div className="right-frame">
      <div className="bar-panel">
        <div className="bar-6"></div>
        <div className="bar-7"></div>
        <div className="bar-8"></div>
        <div className="bar-9"><div className="bar-9-inside"></div></div>
        <div className="bar-10"></div>
      </div>
      <div className="runner">
        <div className="corner-bg">
          <div className="corner"></div>
        </div>
        <div className="block-2"></div>
        <div className="block-3"></div>
        <div className="block-4b">
          <div className="block-4-floatbar"></div>
        </div>
      </div>
    <div className="content">
        <h2>Welcome to the bank of the future.</h2>
       <div className="buttons">
        <div className="button" id="top-left"><a href="#" onClick={() => setShow(true)}>Log In</a></div>
        <div className="button" id="bottom-left"><a href="#" onClick={() => setShow(false)}>Sign Up</a></div>
        </div> 
        {show ? (<> {/*if "show" = true, display this */}
              Email address<br/>
              <input type="input" className="form-control col-sm-5" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control col-sm-5" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleLogin}>Log In</button>
              &nbsp; <button type="submit" className="btn btn-light" onClick={googleLogin}>Log In With Google</button>
              </>) : (<> {/*if "show" = true, display this */}
              Name<br/>
              <input type="input" className="form-control col-sm-5" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control col-sm-5" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control col-sm-5" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
              </>)}
    </div>
    </div>
    </div>
    </>
  );  
}

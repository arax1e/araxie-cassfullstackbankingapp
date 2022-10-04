function changePassword(){
    const [data, setData] = React.useState('');
    const [password, setPassword] = React.useState('');

    let currentuser;
    let email;
  
    React.useEffect(() => {
      const getUser = async() => {
        const user = await firebase.auth().currentUser;
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          email = user.email;
          console.log("email = " + email);
      
        } else {
          // No user is signed in.
          
          console.log("no one is signed in")
        }
      
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch(`/api/getOne/${email}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            result = JSON.stringify(result);
            setData(JSON.parse(result));
            })
          .catch(error => console.log('error', error));
      };
      
      getUser();
  
  }, []);
  
  currentuser = data;
  console.log(currentuser.name);

  function validate(field, label){
    if (!field) {
      alert('Error: ' + label);
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
}

function passwordlength(password){
    if(password.length < 8) {
      alert('Password must be more than 8 characters');
      setTimeout(() => setStatus(''),3000);
        return false;
    }
    return true;
}

  function newPassword(){
    if (!validate(password, 'Please enter a password')) return;
    if(!passwordlength(password, 'Password must be more than 8 charaters')) return;
    const user = firebase.auth().currentUser;
    
    user.updatePassword(password).then(() => {
      // Update successful.
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
          "password": password
      });

      var requestOptions = {
         method: 'PATCH',
         headers: myHeaders,
         body: raw,
         redirect: 'follow'
      };

      fetch(`/api/update/${currentuser.email}`, requestOptions)
         .then(response => response.text())
         .then(result => console.log(result))
         .catch(error => console.log('error', error));
    window.location.href = "#/account";
    }).catch((error) => {
      // An error ocurred
      // ...
    });
  }

  function handleLogout(email){
    firebase.auth().signOut().then(function() {

      console.log('Signed Out');
      window.location.href = "#";
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    
  }

return(
<>
<div className="wrap" id="gap">
    <div className="left-frame">
        <div>
            <div className="panel-3"><span className="hop"><a href="#/account">Account</a></span></div>
            <div className="panel-4"><span className="hop"><a href="#/transact">Transact</a></span></div>
             <div className="panel-5"><span className="hop" onClick={handleLogout}>Log Out</span></div>			
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
              Current Password: {currentuser.password}<br/>
              New Password<br/>
              <input type="password" className="form-control col-sm-5" id="password" placeholder="Enter new password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={newPassword}>Change Password</button>
        </div> 
    </div>
    </div>
    </>
  );
}
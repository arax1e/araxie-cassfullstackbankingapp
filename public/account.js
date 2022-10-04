function Account(){
    const [data, setData] = React.useState('');
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

  function handleLogout(email){
    firebase.auth().signOut().then(function() {

      console.log('Signed Out');
      window.location.href = "#";
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    
  }


return (
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
        <h4 style={{textAlign: "right"}}>Hello, {currentuser.name}.</h4>
        <h2>Account Information</h2>
        <p>Name: {currentuser.name}</p>
        <p>Email: {currentuser.email}</p>
        <p>Password: {currentuser.password}</p>
        <p>Balance: {currentuser.balance}</p>
       <div className="buttons">
        <div className="button" id="top-left"><a href="#/transact">Transact</a></div>
        <div className="button" id="top-left"><a href="#/changePassword">Change Password</a></div>
        </div> 
    </div>
    </div>
    </div>
</>
);
}
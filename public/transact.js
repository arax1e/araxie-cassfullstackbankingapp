function Transact(){
    const [data, setData] = React.useState('');
    const [deposit, setDeposit]   = React.useState(0);
    const [withdrawal, setWithdrawal]   = React.useState(0);
    const [show, setShow] = React.useState(true);
    const [test, setTest] = React.useState(0);
    const [status, setStatus] = React.useState('');


    let user;
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
        if (!field || isNaN(deposit) || deposit < 0) {
          setStatus('Error: ' + label);
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        return true;
    }
    
    function handleDeposit(){
        let balance = Number(currentuser.balance);
        if (!validate(deposit,     'Please enter a positive number'))     return;
        balance += Number(deposit);
        currentuser.balance = balance;
        console.log('current user '+ currentuser.name + ' balance '+ balance);
        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
     
            var raw = JSON.stringify({
                "balance": balance
            });
     
            var requestOptions = {
               method: 'PATCH',
               headers: myHeaders,
               body: raw,
               redirect: 'follow'
            };
            console.log(currentuser.email);
            fetch(`/api/update/${currentuser.email}`, requestOptions)
               .then(response => response.text())
               .then(result => console.log(result))
               .catch(error => console.log('error', error));
        console.log('deposited');
        setTest(test+1);
        
      }
    function overdraft(label) {
        let balance = Number(currentuser.balance);
        if(withdrawal > balance) {
          alert('Error: Account Overdraft');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        return true;
    }

    function handleWithdrawal(){
        let balance = Number(currentuser.balance);
        if (!validate(withdrawal,     'Please enter a positive number'))     return;
        if (!overdraft(withdrawal,     'Error: Account Overdraft'))          return;
        balance -= Number(withdrawal);
        currentuser.balance = balance;
        console.log('current user '+ currentuser.name + ' balance '+ balance);
        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
     
            var raw = JSON.stringify({
                "balance": balance
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
        console.log('withdrawn');
        setTest(test-1);
      }
    
    function handleLogout(email){
        firebase.auth().signOut().then(function() {
             //use api to update database
             var myHeaders = new Headers();
             myHeaders.append("Content-Type", "application/json");
     
             var raw = JSON.stringify({
               "loggedin": false
             });
     
             var requestOptions = {
               method: 'PATCH',
               headers: myHeaders,
               body: raw,
               redirect: 'follow'
             };
     
             fetch(`/api/update/${email}`, requestOptions)
               .then(response => response.text())
               .then(result => console.log(result))
               .catch(error => console.log('error', error));
          console.log('Signed Out');
          window.location.href = "#";
        }, function(error) {
          console.error('Sign Out Error', error);
        });
        
    }

return(<>
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
       <div className="buttons">
        <div className="button" id="top-left"><a href="#/transact" onClick={() => setShow(true)}>Deposit</a></div>
        <div className="button" id="bottom-left"><a href="#/transact" onClick={() => setShow(false)}>Withdraw</a></div>
        </div> 
        {show ? (<> {/*if "show" = true, display this */}
              Balance: {currentuser.balance}<br /><br />
              Deposit Amount<br/>
              <input type="input" className="form-control col-sm-5" id="deposit" placeholder="Enter deposit amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /><br/>
              <button type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button>
              </>) : (<> {/*if "show" = true, display this */}
              Balance: {currentuser.balance}<br /><br />
              Withdrawal Amount<br/>
              <input type="input" className="form-control col-sm-5" id="withdraw" placeholder="Enter deposit amount" value={withdrawal} onChange={e => setWithdrawal(e.currentTarget.value)} /><br/>
              <button type="submit" className="btn btn-light" onClick={handleWithdrawal}>Withdraw</button>
              </>)}
    </div>
    </div>
    </div>
</>);
}
async function userinfo(){
    const form = document.getElementById("info");
    const email = document.getElementById("email");
    const user = document.getElementById("username");
    const pswrd = document.getElementById("passwrd");
    
    const response = await fetch('./userinfo.php');
        
    var data = await response.json();

    for (let i = 0; i < data.length; i++) {
      document.getElementById("email").value=data[i].email;
      document.getElementById("username").value=data[i].username;
      document.getElementById("passwrd").value=data[i].passw;
      document.getElementById("totals").value=data[i].total_score;
      document.getElementById("months").value=data[i].monthly_score;
      document.getElementById("totaltok").value=data[i].total_tokens;
      document.getElementById("lasttok").value=data[i].last_tokens;
    }
    
    }
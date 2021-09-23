import './App.css';
import React, { useState, useEffect } from 'react'

function App() {

  const [minisgimis, setminisgimis] = useState(() => {
    return 0
  })

  const [minisgimisPower, setminisgimisPower] = useState(() => {
    return 1
  })

  function minisgimisIt() {
    setminisgimis(prevminisgimis => prevminisgimis + minisgimisPower)
  }

  function increasePower() {
    var notification_bar = document.getElementById("notification")
    var required = Math.round(((minisgimisPower*minisgimisPower)*0.75) + 10)
    if (minisgimis < required) {
      
      notification_bar.innerHTML = (`not enough MinisGimis, need ${required} MinisGimis!`.bold())
      setTimeout(() => { notification_bar.innerHTML=("Made by minisgimis#3308")}, 3000);
    }
    else {
      setminisgimis(prevminisgimis => prevminisgimis - required)
      setminisgimisPower(prevPower => prevPower + 1)
      notification_bar.innerHTML = (`MinisGimis' strength increased to ${minisgimisPower + 1}!`.bold())
      setTimeout(() => { notification_bar.innerHTML=("Made by minisgimis#3308")}, 3000);
    }
  }

  function moreInformation() {
    alert("Random website made by MinisGimis to test out React hooks and Azure Static Web Apps. You can contact me on Discord at MinisGimis#3308 or dk3zhang@uwaterloo.ca.\nClicking on Get x MinisGimis will increase your MinisGimis count, feeding MinisGimis will increase the number of MinisGimis you get each time. You may occasionally get lucky and find your MinisGimis strength increased or your MinisGimis count doubled!")
  }

  useEffect(() => {
    const interval = setInterval(() => {
      var lucky_num = Math.random()
      var notification_bar = document.getElementById("notification")
      if (lucky_num < 0.015 && lucky_num > 0.009) {
        var increase = Math.floor(Math.random()*5) + 1
        setminisgimisPower(prevPower => prevPower + 1 + increase)
        
        notification_bar.innerHTML=(`you got lucky! MinisGimis' strength increased by ${increase}!`.bold())
        //console.log("click power increased")
        setTimeout(() => { notification_bar.innerHTML=("Made by minisgimis#3308")}, 3000);
      }

      if (lucky_num < 0.009) {
        notification_bar.innerHTML=("you got lucky! MinisGimis doubled!".bold())
        //console.log("double MinisGimis!")
        setminisgimis(prevminisgimis => prevminisgimis + prevminisgimis)
        setTimeout(() => { notification_bar.innerHTML=("Made by MinisGimis#3308")}, 3000);
      }

    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      
        <p id="notification">Made by minisgimis#3308</p>
        <button className="btn" onClick={
          () => {
            moreInformation()
          }
        }>more information</button>
      
        <header className="App-header" id="header">{minisgimis}
        
          <div className="btn-group">

            <button onClick={() => {
              minisgimisIt()
            }}>Get {minisgimisPower} MinisGimis!</button>
            <button onClick={() => {
              increasePower()
            }}>Feed MinisGimis!</button>

          </div>


        </header>


    </div>
    
  );
}

export default App;

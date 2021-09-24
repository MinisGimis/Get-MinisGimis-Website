import './App.css';
import React, { useState, useEffect } from 'react'

function App() {

  const [logs, setlogs] = useState(() => {
    return 0
  })

  const [minisgimisPower, setminisgimisPower] = useState(() => {
    return 1
  })

  const [time, setTime] = useState(() => {
    return 0
  })



  function minisgimisIt() {
    setlogs(prevlog => prevlog + minisgimisPower)
  }

  function increasePower() {
    var notification_bar = document.getElementById("notification")
    var required = Math.round(((minisgimisPower*minisgimisPower)*0.75) + 10)
    if (logs < required) {
      
      notification_bar.innerHTML = (`not enough MinisGimis, need ${required} MinisGimis!`.bold())
      setTime(3)
      
    }
    else {
      setlogs(prevlogs => prevlogs - required)
      setminisgimisPower(prevPower => prevPower + 1)
      notification_bar.innerHTML = (`MinisGimis' strength increased to ${minisgimisPower + 1}!`.bold())
      setTime(3)
      
    }
  }

  function moreInformation() {
    alert("Random website made by MinisGimis to test out React hooks and Azure Static Web Apps. You can contact me on Discord at MinisGimis#3308 or dk3zhang@uwaterloo.ca.\nClicking on Chop x Trees will give you logs, feeding MinisGimis will increase how many logs you chop. There are also bonus events giving you free logs or buffing your MinisGimis!")
  }

  useEffect(() => {
    const interval = setInterval(() => {
      var lucky_num = Math.random()
      var notification_bar = document.getElementById("notification")
      console.log(time)

      if (time === 0) {
        notification_bar.innerHTML=("made by MinisGimis#3308")
      }

      if (lucky_num < 0.025 && lucky_num > 0.015) {
        var increase = Math.floor(Math.random()*Math.random()*minisgimisPower+1) + 1
        setminisgimisPower(prevPower => prevPower + increase)
        
        notification_bar.innerHTML=(`you got lucky! MinisGimis' strength increased by ${increase}!`.bold())
        setTime(3)
        console.log("click power increased")
        console.log(time)
      }

      if (lucky_num < 0.015) {
        var gain = Math.round(Math.random()*100*minisgimisPower)
        notification_bar.innerHTML=(`You got lucky! A large tree just fell over giving you ${gain} logs!`.bold())
        console.log("free logs!")
        setlogs(prevlogs => prevlogs + gain)
        setTime(3)
        console.log(time)
      }

      if (time > 0) {
        setTime(prevTime => prevTime -1)
      }

    }, 1000);
    return () => clearInterval(interval);
  }, [time, minisgimisPower]);

  return (
    <div className="App">
      
        <p id="notification">Made by MinisGimis#3308</p>
        <button className="btn" onClick={
          () => {
            moreInformation()
          }
        }>more information</button>
      
        <header className="App-header" id="header">{logs} Logs
        
          <div className="btn-group">

            <button onClick={() => {
              minisgimisIt()
            }}>Chop {minisgimisPower} Trees!</button>
            <button onClick={() => {
              increasePower()
            }}>Feed MinisGimis!</button>

          </div>


        </header>


    </div>
    
  );
}

export default App;

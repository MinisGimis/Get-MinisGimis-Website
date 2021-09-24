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

  const [balance, setbalance] = useState(() => {
    return 0.00
  })

  const [logValue, setlogValue] = useState(() => {
    return 0.5
  })

  const [workers, setworkers] = useState(() => {
    return 0
  })

  const [payday, setpayday] = useState(() => {
    return 600
  })

  const [workerValue, setworkerValue] = useState(() => {
    return 1
  })

  function minisgimisIt() {
    setlogs(prevlog => prevlog + minisgimisPower)
  }

  function buyWorker() {
    var notification_bar = document.getElementById("notification")
    var workerCost = Math.round((workers*workers*workers/minisgimisPower) +10)

    if (payday === 0) {
      var payment = workers*50 + workers*50*logValue
      if (balance >= payment) {
        setpayday(600)
        setworkers(0)
        setbalance(prevbal => prevbal - payment)
        notification_bar.innerHTML = (`You paid $${payment} as salary to your workers`.bold())
        setTime(2)
      }

      else {
        notification_bar.innerHTML = (`You need $${payment} to pay your workers.`)
        setTime(2)
      }
    }

    else {
      if (balance >= workerCost) {
        setworkers(prevworkers => prevworkers + 1)
        setbalance(prevbal => prevbal - workerCost)
        notification_bar.innerHTML = (`You bought another worker for $${workerCost}! Now you have ${workers + 1} workers`.bold())
        setTime(2)
      }
      else {
        notification_bar.innerHTML = (`You need $${workerCost} to buy another worker.`)
        setTime(2)
      }
    }
  }

  function increasePower() {
    var notification_bar = document.getElementById("notification")
    var required = Math.round(((minisgimisPower*minisgimisPower)*0.75) + 10)
    if (balance < required) {
      
      notification_bar.innerHTML = (`not enough money, need $${required} to feed MinisGimis!`)
      setTime(3)
      
    }
    else {
      setbalance(prevbal => prevbal - required)
      setminisgimisPower(prevPower => prevPower + 1)
      notification_bar.innerHTML = (`MinisGimis' strength increased to ${minisgimisPower + 1}!`.bold())
      setTime(3)
      
    }
  }

  function sellLogs() {
    if (logs > 0) {
      var notification_bar = document.getElementById("notification")
      var value = Math.round(logs*logValue*100)/100
      notification_bar.innerHTML = (`you sold ${logs} logs for $${logValue} each, earning $${value}`.bold())
      setbalance(prebal => prebal + value)
      setlogs(0)
      setTime(2)
    }
  }

  function moreInformation() {
    alert("Random website made by MinisGimis to test out React hooks and Azure Static Web Apps. You can contact me on Discord at MinisGimis#3308 or dk3zhang@uwaterloo.ca.\nClicking on Chop x Trees will give you logs, you can sell your logs for money. Feeding MinisGimis will cost money but will increase your logs per click. You can spend money to hire some workers for a few minutes. At the end of the duration, you will need to pay the workers their salary before being able to hire workers again. There are also bonus events giving you beneficial perks.")
  }

  //auto workers
  useEffect(() => {
    setbalance(prevbal => Math.round(prevbal*100)/100)
    const interval = setInterval(() => {
      //console.log(payday)
      var worker_button = document.getElementById('workerbtn')

      if ((workers > 0) && (payday > 0)) {
        setpayday(prevday => prevday - 1)
        setlogs(prevlogs => prevlogs + workers*workerValue)
      }

      if (payday > 0) {
        worker_button.innerHTML = ("Hire Workers")
      }

      if (payday === 0) {
        worker_button.innerHTML = ("Pay workers' salary")
      }
      
    }, 500);
    return () => clearInterval(interval);
  }, [payday, workerValue, workers]);


  //notifications and events
  useEffect(() => {
    const interval = setInterval(() => {
      var lucky_num = Math.random()
      var notification_bar = document.getElementById("notification")
      //console.log(time)

      if (time === 0) {
        notification_bar.innerHTML=(`Balance: $${balance}`)
      }

      if (lucky_num < 0.025 && lucky_num > 0.015) {
        var increase = Math.floor(Math.random()*Math.random()*minisgimisPower+1) + 1
        setminisgimisPower(prevPower => prevPower + increase)
        
        notification_bar.innerHTML=(`you got lucky! MinisGimis' strength increased by ${increase}!`.bold())
        setTime(3)
        console.log("click power increased")
        //console.log(time)
      }

      if (lucky_num < 0.015) {
        var gain = Math.round(Math.random()*100*minisgimisPower)
        notification_bar.innerHTML=(`You got lucky! A large tree just fell over giving you ${gain} logs!`.bold())
        console.log("free logs!")
        setlogs(prevlogs => prevlogs + gain)
        setTime(3)
        //console.log(time)
      }

      if (lucky_num < 0.035 && lucky_num > 0.025) {
        var increase2 = Math.round((Math.random()*(logValue*100)))/100
        notification_bar.innerHTML=(`MinisGimis just achieved some englightenment! Log value increased by $${increase2}!`.bold())
        console.log("better logs!")
        setlogValue(prevval => prevval + increase2)
        setTime(3)
      }
      if (lucky_num < 0.04 && lucky_num > 0.035) {
        var increase3 = Math.round((Math.random()+1))
        notification_bar.innerHTML=(`Your workers become more proficient! Workers now gather ${workerValue+increase3} logs.`.bold())
        console.log("better workers!")
        setworkerValue(prevval => prevval + increase3)
        setTime(3)
      }

      if (time > 0) {
        setTime(prevTime => prevTime -1)
      }

    }, 1000);
    return () => clearInterval(interval);
  }, [time, minisgimisPower, balance, logValue, workerValue]);

  return (
    <div className="App">
      
        <p id="notification">Balance: ${balance}</p>
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

            <button onClick={() => {
              sellLogs()
            }}
            >Sell Logs

            </button>

            <button id="workerbtn" onClick={() => {
              buyWorker()
            }}
            >Hire Workers

            </button>

          </div>


        </header>


    </div>
    
  );
}

export default App;

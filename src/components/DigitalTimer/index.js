import {Component} from 'react'
import './index.css'

const playIcon = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const pauseIcon = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
const resetIcon = 'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    runningSeconds: 0,
    timerRunning: false,
  }

  updateTime = () => {
    const {runningSeconds} = this.state
    this.setState(prevState => ({
      runningSeconds: prevState.runningSeconds + 1,
      timerRunning: true,
    }))

    if (runningSeconds === 25 * 60) {
      this.setState({timerRunning: false, runningSeconds: 0, minutes: 0})
      clearInterval(this.timerID)
    }
  }

  timeStart = () => {
    const {timerRunning} = this.state

    if (!timerRunning) {
      this.timerID = setInterval(this.updateTime, 1000)
    } else {
      clearInterval(this.timerID)
      this.setState({timerRunning: false})
    }
  }

  resetTimer = () => {
    clearInterval(this.timerID)
    this.setState({
      minutes: 25,
      runningSeconds: 0,
      timerRunning: false,
    })
  }

  timeInMinutes = () => {
    const {minutes, runningSeconds} = this.state
    const calMin = minutes * 60 - runningSeconds
    const runMinutes = Math.floor(calMin / 60)
    return runMinutes < 10 ? `0${runMinutes}` : runMinutes
  }

  timeInSeconds = () => {
    const {minutes, runningSeconds} = this.state
    const calSec = minutes * 60 - runningSeconds
    const runSeconds = Math.floor(calSec % 60)
    return runSeconds < 10 ? `0${runSeconds}` : runSeconds
  }

  increaseTime = () => {
    const {timerRunning} = this.state

    if (!timerRunning) {
      this.setState(prevState => ({minutes: prevState.minutes + 1}))
    }
  }

  DecreaseTime = () => {
    const {minutes, timerRunning} = this.state

    if (minutes > 25 && !timerRunning) {
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    }
  }

  render() {
    const {timerRunning} = this.state
    const runState = timerRunning ? 'Running' : 'Paused'
    const timerImg = timerRunning ? pauseIcon : playIcon
    const altText = timerRunning ? 'pause icon' : 'play icon'

    const timer = `${this.timeInMinutes()}:${this.timeInSeconds()}`

    return (
      <div className="bg-container">
        <div>
          <h1 className="timer-heading">Digital Timer</h1>
          <div className="content-container">
            <div className="timer-container">
              <div className="timer-zone">
                <h1 className="timer-zone-heading">{timer}</h1>
                <p className="timer-zone-sub-head">{runState}</p>
              </div>
            </div>
            <div className="buttons-container">
              <div className="flex">
                <div className="button-head mar">
                  <button
                    type="button"
                    className="button"
                    onClick={this.timeStart}
                  >
                    <img src={timerImg} alt={altText} className="icon mar" />
                    <p className="icon-head">
                      {timerRunning ? 'Pause' : 'Start'}
                    </p>
                  </button>
                </div>
                <div className="button-head">
                  <button
                    type="button"
                    className="button"
                    onClick={this.resetTimer}
                  >
                    <img
                      src={resetIcon}
                      alt="reset icon"
                      className="icon mar"
                    />
                    <p className="icon-head">Reset</p>
                  </button>
                </div>
              </div>
              <p>Set Timer Limit</p>
              <div className="set-buttons-container">
                <button
                  type="button"
                  className="btn"
                  onClick={this.DecreaseTime}
                >
                  -
                </button>
                <p className="number-button">25</p>
                <button
                  type="button"
                  className="btn"
                  onClick={this.increaseTime}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer

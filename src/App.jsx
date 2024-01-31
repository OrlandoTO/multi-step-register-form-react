import {  useState } from 'react'
import './App.css'
import { TOPICS, TOTAL_STEPS } from './constans'
import { isEmail, isEmpty } from './helpers'
import Modal from './Modal' 

function App() {
  const [step, setStep] = useState(1)
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [errorInputName, setErrorInputName] = useState('')
  const [errorInputEmail, setErrorInputEmail] = useState('')
  const [errorTopics, setErrorTopics] = useState('')
  const [open,setOpen] = useState(false)

  const [topics, setTopics] = useState(TOPICS)
  let togleItem = (topic) => {
    setErrorTopics('')
    setTopics(topics.map(e => e.id === topic.id ? { ...e, selected: !e.selected } : e))
  }
  let changeNextStep = () => {
    let isValid = true
    if (step == 3) {
      setOpen(true)
      setStep(1)
    } else {
      setStep(prevStep => {
        if (prevStep == 1) {
          if (isEmpty(inputName)) {
            setErrorInputName('The field name is required')
            isValid = false
          }
          if (isEmpty(inputEmail)) {
            setErrorInputEmail('The field email is required')
            isValid = false
          } else {
            if (!isEmail(inputEmail)) {
              setErrorInputEmail('The format email is incorrect')
              isValid = false
            }
          }

          if (isValid) {
            return prevStep + 1
          } else {
            return prevStep
          }
        } else if (prevStep == 2) {
          let topicsSelected = topics.filter(e => e.selected)
          console.log(topicsSelected)
          if (topicsSelected.length == 0) {
            setErrorTopics('You must choose at least 1 topic')
            return prevStep
          }
          return prevStep + 1

        }
      })
    }

  }

  let onChangeInputName = (event) => {
    setErrorInputName('')
    let currentValue = event.target.value;
    if (currentValue == ' ') return
    setInputName(event.target.value)
  }

  let onChangeInputEmail = (event) => {
    setErrorInputEmail('')
    let currentValue = event.target.value;
    if (currentValue == ' ') return
    setInputEmail(event.target.value)
  }

  let onCloseHandler = ()=>{
    setOpen(!open)
  }

  
  return (
    <div>
      <div className='card' key="card">
        {
          step == 1 ? <div className='mb-30' key='step-1'>
            <h1>Register</h1>
            <div className="form-control">
              <label htmlFor="name">Name:</label>
              <input type="text" onChange={onChangeInputName} value={inputName} placeholder="enter your name" />
              {
                errorInputName !== '' ? <div className='error'>{errorInputName}</div> : null
              }
            </div>
            <div className="form-control">
              <label htmlFor="Email">Email</label>
              <input type="email" onChange={onChangeInputEmail} value={inputEmail} placeholder="example@gmail.com" />
              {
                errorInputEmail !== '' ? <div className='error'>{errorInputEmail}</div> : null
              }
            </div>
          </div> : null
        }
        {
          step == 2 ? <div className='mb-30' key='step-2'>
            <h1>Which topics you are interested in?</h1>
            <div className='topics'>
              {
                topics.map(e =>
                  <div key={e.id}
                    onClick={() => togleItem(e)}
                    className={`item-topic ${e.selected ? 'select' : ''}`}>
                    {e.text}
                  </div>
                )
              }
            </div>
            {
              errorTopics !== '' ? <div className='error'>{errorTopics}</div> : null
            }
          </div> : null
        }

        {
          step == 3 ? <div className='mb-30' key='step-3'>
            <h1>Summary</h1>
            <div className='data'>
              <div className='data-name'><span className='color-label'>Name:</span><span className="color-text">{inputName}</span></div>
              <div className="data-email"><span className="color-label">Email:</span><span className="color-text">{inputEmail}</span></div>
            </div>
            <div className='topics color-label'>
              Topics:
              <ul className="color-text">
                {
                  topics.filter(e => e.selected).map(r => <li key={r.id}>{r.text}</li>)

                }
              </ul>
            </div>
          </div> : null
        }
        <div className='form-btn'>
          <button onClick={changeNextStep} className='btn'>{step == 3 ? "Confirm" : "Continue"}</button>
        </div>


      </div>
      <div className="steps" id="footer-step-1" key="steps">
        <div>Step <span>{step}</span> of <span>{TOTAL_STEPS}</span> </div>
        <div className="items-step ">
          {
            Array.from({ length: TOTAL_STEPS }, (_, index) => index + 1).map(e => (
              <span className={`item-step ${step == e ? 'blur' : 'reduce-width'}`}></span>
            ))
          }
        </div>
      </div>
      <Modal open={open} onClose={onCloseHandler}>
        <p>✅ Success</p>
      </Modal>
      
    </div>

  )
}

export default App

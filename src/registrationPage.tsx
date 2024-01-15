import './registrationPage.css'
import { RegData, registr } from './modules/registration.ts'
import { useState, useEffect} from 'react'



function RegistrationPage() {
  const [nameValue, setNameValue] = useState('')
  const [phoneValue, setPhoneValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
 



  const SubmitReg = async () =>{
    const response = await registr(nameValue, emailValue, phoneValue, passwordValue)
  }


  return ( 
    <>
    <div className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Регистрация</h3>
          <div className="form-group mt-3">
            <label>Имя пользователя*</label>
            <input
              type="text"
              name="name"
              className="form-control mt-1"
              placeholder="Введите имя пользователя"

              onChange={(event => setNameValue(event.target.value))}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Введите email"

              onChange={(event => setEmailValue(event.target.value))}
            />
          </div>
          <div className="form-group mt-3">
            <label>Номер телефона</label>
            <input
              name="phone"
              type="tel"
              className="form-control mt-1"
              placeholder="Введите номер телефона"

              onChange={(event => setPhoneValue(event.target.value))}
            />
          </div>
          <div className="form-group mt-3">
            <label>Пароль*</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Введите пароль"

              onChange={(event => setPasswordValue(event.target.value))}
            />
          </div>
          <p>Поля отмеченные * обязательны для заполнения</p>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={()=>SubmitReg()}>
              Подтвердить
            </button>
          </div>
          
        </div>
      </div>
    </div>
    </>
  )
}

export default RegistrationPage

import { QRCodeCanvas } from "qrcode.react"
import { useLocation, useNavigate } from "react-router-dom"
import "./Thanks.css"
import logo from "../assets/images/Nex_Lab_horizontal.svg"

function Thanks(){

  const location = useLocation() // recebe dados da navegação
  const navigate = useNavigate()

  const imageUrl = location.state?.imageUrl // url da imagem

  function logout() {
    localStorage.removeItem("token")
    navigate("/auth/login")
  }

  function finish(){

    navigate("/upload") // volta para tela inicial

  }

  return (

    <div className="nexLabContainer">

<button className="logoutButton" onClick={logout}>
      Logout
    </button>

    
      <img src={logo} alt="NEX .lab" className="nexLabLogo" />

     
      
      <h1 className="thanksTitle">Obrigado!</h1>
      
      
      <div className="qrCodeWrapper">
        <QRCodeCanvas
          value={imageUrl}
          size={200}
          className="qrCode"
        />
      </div>
      
      <button className="finishButton" onClick={finish}>
        Finalizar
      </button>
    </div>
  )
}

export default Thanks
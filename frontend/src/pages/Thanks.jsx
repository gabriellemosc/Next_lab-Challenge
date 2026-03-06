import { QRCodeCanvas } from "qrcode.react"
import { useLocation, useNavigate } from "react-router-dom"

function Thanks(){

  const location = useLocation() // recebe dados da navegação
  const navigate = useNavigate()

  const imageUrl = location.state?.imageUrl // url da imagem

  function finish(){

    navigate("/upload") // volta para tela inicial

  }

  return(

    <div className="thanksContainer">

      <h1>Obrigado!</h1>

      <p>Escaneie o QR Code para baixar sua foto</p>

      <QRCodeCanvas
        value={imageUrl} // QR aponta para foto
        size={200}
      />

      <button onClick={finish}>
        Finalizar
      </button>

    </div>

  )

}

export default Thanks
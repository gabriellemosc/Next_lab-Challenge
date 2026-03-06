import { QRCodeCanvas } from "qrcode.react" // biblioteca para gerar QR Code
import { useLocation } from "react-router-dom"
import {useNavigate } from "react-router-dom"
import { useState } from "react"

import "./Result.css"
import frame from "../assets/images/frame.png"


function Result() {

  const navigate = useNavigate() // cria função de navegação

  const location = useLocation() // pega dados enviados pela rota
  const imageUrl = location.state?.imageUrl // URL da imagem no S3

  const [showThanksBox, setShowThanksBox] = useState(false) 

  async function downloadImage() { // função async para permitir uso de await

    const response = await fetch(imageUrl) // faz requisição HTTP para baixar imagem
    const blob = await response.blob() // transforma resposta em arquivo blob

    const url = window.URL.createObjectURL(blob) // cria URL temporária para o arquivo

    const link = document.createElement("a") // cria elemento <a> dinamicamente
    link.href = url // aponta para o blob gerado
    link.download = "photo.png" // define nome do arquivo no download

    document.body.appendChild(link) // adiciona link ao DOM
    link.click() // dispara download automaticamente

    link.remove() // remove elemento do DOM
    window.URL.revokeObjectURL(url) // libera memória usada pela URL temporária

  }

  function goToThanks(){

    setShowThanksBox(true) // mostra caixa de agradecimento

    setTimeout(() => {

      navigate("/thanks", { // redireciona após 2s
        state:{
          imageUrl: imageUrl
        }
      })
  
    }, 2000)
  
  }
  return (

    <div className="resultContainer">


    <div className="resultContent">

      <div className="photoContainer">

        <img
          src={imageUrl} // foto salva no S3
          alt="foto"
          className="userPhoto"
        />

        <img
          src={frame} // moldura
          alt="frame"
          className="frameOverlay"
        />

      </div>

      <div className="qrSection">

        <QRCodeCanvas
          value={imageUrl} // QR Code aponta para imagem
          size={180}
        />

        <button onClick={downloadImage}>
          Baixar imagem
        </button>


        <button onClick={goToThanks}>
          Finalizar
        </button>

      </div>


      {showThanksBox && ( 
        // se showThanksBox for true, mostra a caixa

          <div className="thanksPopup">

            <h2>Obrigado!</h2>
            <p>Preparando sua tela de download...</p>

          </div>

        )}



    </div>

  </div>


  )

}

export default Result
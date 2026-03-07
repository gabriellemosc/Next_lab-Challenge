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
  return(

    <div className="resultContainer">

      <div className="photoArea">

        {/* FOTO DE FUNDO */}
        <img
          src={imageUrl}
          className="userPhoto"
          alt="foto"
        />

        {/* MOLDURA */}
        <img
          src={frame}
          className="frameOverlay"
          alt="frame"
        />

        {/* CARD QR CODE */}
        <div className="qrCard">

          <p>Fazer download</p>

          <QRCodeCanvas
            value={imageUrl} // QR aponta para imagem
            size={120}
          />

        </div>

      </div>

      {/* BOTÃO FINALIZAR */}
      <button
        className="finishButton"
        onClick={goToThanks}
      >
        Finalizar
      </button>

      {showThanksBox && (

        <div className="thanksPopup">

          <h2>Obrigado!</h2>
          <p>Preparando sua tela de download...</p>

        </div>

      )}

    </div>

  )

}

export default Result
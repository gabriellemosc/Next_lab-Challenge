import { useEffect, useState } from "react"
import { getPhotos } from "../services/api"
import { QRCodeCanvas } from "qrcode.react"

function Dashboard(){

  const [stats,setStats] = useState(null) // guarda métricas
  const [photos,setPhotos] = useState([]) // guarda fotos
  const [page,setPage] = useState(1) // página atual
  const [limit,setLimit] = useState(10) // fotos por página
  const [startDate,setStartDate] = useState("") // filtro inicial
  const [endDate,setEndDate] = useState("") // filtro final
  const [total, setTotal] = useState(0)
  const [filteredTotal, setFilteredTotal] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState(null) // foto para modal QR



    // Carrega fotos do backend
    const loadPhotos = async () => {
        const token = localStorage.getItem("token")
        const params = new URLSearchParams({ page, limit, startDate, endDate })
        const res = await fetch(`http://localhost:3000/photos?${params.toString()}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        setPhotos(data.photos)
        setTotal(data.total)
        setFilteredTotal(data.filteredTotal)
      }


  // =============================
  // Carrega métricas
  // =============================

  useEffect(()=>{

    async function loadStats(){

      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:3000/admin/stats",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      const data = await res.json()

      setStats(data)

    }

    loadStats()

  },[])


  // =============================
  // Carrega fotos com paginação
  // =============================

  useEffect(()=>{

    async function loadPhotos(){

      const data = await getPhotos(page,limit,startDate,endDate)

      setPhotos(data.photos)

    }

    loadPhotos()

  },[page,limit,startDate,endDate])


  if(!stats) return <p>Carregando...</p>


  return(

    <div>

      <h1>Painel Administrativo</h1>

      {/* ============================= */}
      {/* MÉTRICAS */}
      {/* ============================= */}

      <h2>Total de fotos: {stats.totalPhotos}</h2>
      <h2>Fotos hoje: {stats.todayPhotos}</h2>


      {/* ============================= */}
      {/* FILTROS */}
      {/* ============================= */}

      <div>

        <h3>Filtros</h3>
        <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <button onClick={() => { setPage(1); loadPhotos() }}>Filtrar</button>

        <button disabled={page === 1} onClick={() => { setPage(page - 1); loadPhotos() }}>Anterior</button>
            <button onClick={() => { setPage(page + 1); loadPhotos() }}>Próximo</button>
            <select value={limit} onChange={e => { setLimit(parseInt(e.target.value)); setPage(1); loadPhotos() }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            </select>

      </div>


      {/* ============================= */}
      {/* PAGINAÇÃO */}
      {/* ============================= */}

      <div>

        <label>Fotos por página:</label>

        <select
          value={limit}
          onChange={(e)=>setLimit(Number(e.target.value))} // altera limite
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>

      </div>


      {/* ============================= */}
      {/* LISTA DE FOTOS */}
      {/* ============================= */}

      <div style={{display:"flex",flexWrap:"wrap",gap:"20px"}}>

        {photos.map(photo => (

            <img
            key={photo.id}
            src={photo.s3_url}
            width="200"
            style={{cursor:"pointer"}}
            onClick={() => setSelectedPhoto(photo)} // <-- seta a foto selecionada
            />

        ))}

      </div>


      {/* ============================= */}
      {/* CONTROLE DE PAGINA */}
      {/* ============================= */}

      <div style={{marginTop:"20px"}}>

        <button onClick={()=>setPage(page-1)} disabled={page===1}>
          Anterior
        </button>

        <span> Página {page} </span>

        <button onClick={()=>setPage(page+1)}>
          Próxima
        </button>

      </div>


      {selectedPhoto && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
          justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
            <h3>QR Code da Foto</h3>
            <QRCodeCanvas value={selectedPhoto.s3_url} size={200} />
                        <div style={{ marginTop: "10px" }}>
              <button onClick={() => setSelectedPhoto(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}



    </div>

  )

}

export default Dashboard
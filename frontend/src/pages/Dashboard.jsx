import { useEffect, useState } from "react"
import { getPhotos } from "../services/api"

function Dashboard(){

  const [stats,setStats] = useState(null) // guarda métricas
  const [photos,setPhotos] = useState([]) // guarda fotos
  const [page,setPage] = useState(1) // página atual
  const [limit,setLimit] = useState(10) // fotos por página
  const [startDate,setStartDate] = useState("") // filtro inicial
  const [endDate,setEndDate] = useState("") // filtro final

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

        <input
          type="date"
          value={startDate}
          onChange={(e)=>setStartDate(e.target.value)} // altera data inicial
        />

        <input
          type="date"
          value={endDate}
          onChange={(e)=>setEndDate(e.target.value)} // altera data final
        />

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


    </div>

  )

}

export default Dashboard
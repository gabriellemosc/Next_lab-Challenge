import { useEffect, useState } from "react"

function Dashboard(){

  const [stats,setStats] = useState(null)

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


  if(!stats) return <p>Carregando...</p>


  return(

    <div>

      <h1>Painel Administrativo</h1>

      <h2>Total de fotos: {stats.totalPhotos}</h2>

      <h2>Fotos hoje: {stats.todayPhotos}</h2>


    </div>

  )

}

export default Dashboard
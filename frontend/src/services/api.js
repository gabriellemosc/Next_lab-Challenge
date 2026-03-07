// pega URL da API definida nas variáveis de ambiente
const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '') // remove barra final

// ============================
// LOGIN
// ============================

export async function login(email, password) {

  const response = await fetch(`${API_URL}/auth/login`, { // envia requisição para backend
    method: "POST", // método HTTP POST para enviar dados
    headers: {
      "Content-Type": "application/json" // informa que o corpo da requisição é JSON
    },
    body: JSON.stringify({ email, password }) // transforma objeto JS em string JSON
  })

  const data = await response.json() // converte resposta HTTP para objeto JavaScript

  return data // retorna os dados recebidos do backend (ex: token JWT)
}


// ============================
// BUSCAR FOTOS (Dashboard)
// ============================

export async function getPhotos(page = 1, limit = 10, startDate = "", endDate = "") {

  const token = localStorage.getItem("token") // recupera token salvo no navegador

  const query = new URLSearchParams({ // cria automaticamente query string da URL
    page,       // página atual
    limit,      // quantidade de fotos por página
    startDate,  // filtro de data inicial
    endDate     // filtro de data final
  })

  const response = await fetch(`${API_URL}/photos?${query}`, { // chama endpoint de fotos no backend
    method: "GET", // método HTTP GET para buscar dados
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}` // envia token JWT para autenticação no backend
    }
  })

  const data = await response.json() // converte resposta para objeto JavaScript

  return data // retorna lista de fotos e dados de paginação
}
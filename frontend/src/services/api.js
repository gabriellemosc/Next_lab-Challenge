const API_URL = "http://localhost:3000" // endereço do backend

export async function login(email, password) {

  const response = await fetch(`${API_URL}/auth/login`, { // envia request para backend
    method: "POST", // método HTTP
    headers: {
      "Content-Type": "application/json" // informa que estamos enviando JSON
    },
    body: JSON.stringify({ email, password }) // transforma objeto em JSON
  })

  const data = await response.json() // converte resposta em JSON

  return data // retorna dados recebidos (token)
}


// BUSCAR FOTOS (Dashboard)
// ============================

export async function getPhotos(page = 1, limit = 10, startDate = "", endDate = "") {

  const token = localStorage.getItem("token") // pega token salvo no navegador

  const query = new URLSearchParams({ // cria query string automaticamente
    page, // página atual
    limit, // quantidade por página
    startDate, // filtro data inicial
    endDate // filtro data final
  })

  const response = await fetch(`${API_URL}/photos?${query}`, { // chama endpoint de fotos
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` // envia JWT para backend validar usuário
    }
  })

  const data = await response.json() // converte resposta para JSON

  return data // retorna dados das fotos
}
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
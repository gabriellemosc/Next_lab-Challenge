const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '') // remove barra final

// 
// LOGIN
// 

export async function login(email, password) {

  const response = await fetch(`${API_URL}/auth/login`, { // send request  backend
    method: "POST", 
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({ email, password }) 
  })

  const data = await response.json() 

  return data
}


// 
// SEARH PHOTO
// 

export async function getPhotos(page = 1, limit = 10, startDate = "", endDate = "") {

  const token = localStorage.getItem("token") // recupera token 

  const query = new URLSearchParams({ //  query string da URL
    page,       
    limit,      
    startDate,  
    endDate     
  })

  const response = await fetch(`${API_URL}/photos?${query}`, { 
    method: "GET", 
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}` 
    }
  })

  const data = await response.json() 

  return data 
}
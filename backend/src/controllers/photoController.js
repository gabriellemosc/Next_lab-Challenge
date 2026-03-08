const pool = require('../database/connection') 
const uploadToS3 = require('../services/s3') 
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3") 

// s3 instance
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
})

// endpoint
const createPhoto = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: 'Image is Mandatory' }) 
    }

    const promoterId = req.user.id // take ID from the user

    // send to S3
    const s3Url = await uploadToS3(req.file)

    // save no banco
    const query = `
      INSERT INTO photos (s3_url, promoter_id)
      VALUES ($1, $2)
      RETURNING *;
    `

    const values = [s3Url, promoterId]

    const result = await pool.query(query, values) 

    return res.status(201).json(result.rows[0]) 

  } catch (error) {
    return res.status(500).json({ error: 'Could not Save Photo' })
  }
}

const deletePhoto = async (req, res) => {
  try {

    const photoId = req.params.id 
    const userId = req.user.id 
    const userRole = req.user.role 

    const photoResult = await pool.query(
      'SELECT * FROM photos WHERE id = $1',
      [photoId]
    )

    if (photoResult.rows.length === 0) {
      return res.status(404).json({ error: 'Foto não encontrada' })
    }

    const photo = photoResult.rows[0]

    if (userRole !== 'ADMIN' && photo.promoter_id !== userId) {
      return res.status(403).json({ error: 'Acesso negado' })
    }

    await pool.query(
      'DELETE FROM photos WHERE id = $1',
      [photoId]
    )

    return res.status(200).json({ message: 'Photo Deleted' })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Could Not Delete Photo' })
  }
}

const getPhotos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    const { startDate, endDate } = req.query

    let query = `SELECT * FROM photos WHERE 1=1`
    const values = []

    if (startDate) {
      values.push(startDate)
      query += ` AND created_at >= $${values.length}`
    }

    if (endDate) {
      values.push(endDate)
      query += ` AND created_at <= $${values.length}`
    }

    const totalResult = await pool.query('SELECT COUNT(*) FROM photos')
    const total = parseInt(totalResult.rows[0].count)

    const filteredResult = await pool.query(query, values)
    const filteredTotal = filteredResult.rows.length

    query += ` ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`
    values.push(limit, offset)
    const pagedResult = await pool.query(query, values)

    const photos = pagedResult.rows.map(photo => ({
      id: photo.id,
      s3_url: photo.s3_url,
      created_at: photo.created_at
    }))

    res.json({ total, filteredTotal, page, limit, photos })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could Not Show Photos' })
  }
}





module.exports = { createPhoto, deletePhoto, getPhotos }
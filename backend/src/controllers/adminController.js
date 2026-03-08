const db = require('../database/connection') 

//ADMIN PAINEL TO SHOW THE PHOTOS

exports.getAdminPhotos = async (req, res) => {

  try {
    //CURRENT PAGE
    const page = parseInt(req.query.page) || 1 

    const limit = parseInt(req.query.limit) || 10 

    const offset = (page - 1) * limit 

    const photos = await db.query(
      `
      SELECT id, s3_url, promoter_id, created_at
      FROM photos
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset] 
    )

    const total = await db.query(
      `SELECT COUNT(*) FROM photos`
    )

    res.json({
      photos: photos.rows,
      total: parseInt(total.rows[0].count),
      page,
      limit
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: "ERROR TO SEARCH FOR PHOTOS"
    })

  }

}




exports.getAdminStats = async (req, res) => {

  try {

    const totalPhotos = await db.query(
      `SELECT COUNT(*) FROM photos`
    )

    const todayPhotos = await db.query(
      `
      SELECT COUNT(*)
      FROM photos
      WHERE DATE(created_at) = CURRENT_DATE
      `
    )

    res.json({

      totalPhotos: parseInt(totalPhotos.rows[0].count),

      todayPhotos: parseInt(todayPhotos.rows[0].count)

    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: "Statics could not be found"
    })

  }

}
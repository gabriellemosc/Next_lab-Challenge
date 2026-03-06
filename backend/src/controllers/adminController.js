const db = require('../database/connection') 
// importa a conexão com o banco de dados


// =============================
// LISTAR FOTOS COM PAGINAÇÃO
// =============================
exports.getAdminPhotos = async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1 
    // página atual recebida da query (?page=1)

    const limit = parseInt(req.query.limit) || 10 
    // quantidade de fotos por página

    const offset = (page - 1) * limit 
    // calcula quantos registros devem ser pulados no banco

    const photos = await db.query(
      `
      SELECT id, s3_url, promoter_id, created_at
      FROM photos
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset] 
      // parâmetros usados na query SQL
    )

    const total = await db.query(
      `SELECT COUNT(*) FROM photos`
      // retorna total de fotos no banco
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
      error: "Erro ao buscar fotos"
    })

  }

}



// =============================
// NÚMEROS MACROS DO DASHBOARD
// =============================
exports.getAdminStats = async (req, res) => {

  try {

    const totalPhotos = await db.query(
      `SELECT COUNT(*) FROM photos`
      // conta todas as fotos do banco
    )

    const todayPhotos = await db.query(
      `
      SELECT COUNT(*)
      FROM photos
      WHERE DATE(created_at) = CURRENT_DATE
      `
      // conta apenas fotos tiradas hoje
    )

    res.json({

      totalPhotos: parseInt(totalPhotos.rows[0].count),
      // total geral de fotos

      todayPhotos: parseInt(todayPhotos.rows[0].count)
      // total de fotos capturadas hoje

    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: "Erro ao buscar estatísticas"
    })

  }

}
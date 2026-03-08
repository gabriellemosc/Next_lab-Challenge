const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3") // client S3
const { v4: uuidv4 } = require('uuid') 


// Log para debug (apenas para confirmar se carregou as variáveis)
console.log("DEBUG S3: Region:", process.env.ACTIVACAO_AWS_REGION);
console.log("DEBUG S3: Bucket:", process.env.ACTIVACAO_AWS_BUCKET);


// s3 credentials
const s3 = new S3Client({
  region: process.env.ACTIVACAO_AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACTIVACAO_AWS_ACCESS_KEY,
    secretAccessKey: process.env.ACTIVACAO_AWS_SECRET_KEY
  }
})

const uploadToS3 = async (file) => {
  const fileKey = `photos/${uuidv4()}.jpg`;

  const command = new PutObjectCommand({
    Bucket: process.env.ACTIVACAO_AWS_BUCKET, 
    Key: fileKey, 
    Body: file.buffer, 
    ContentType: file.mimetype 
  });

  try {
    await s3.send(command);
    // URL correta para us-east-1
    return `https://${process.env.ACTIVACAO_AWS_BUCKET}.s3.amazonaws.com/${fileKey}`;
  } catch (err) {
    console.error("ERRO NO SDK S3:", err);
    throw err;
  }
};

module.exports = uploadToS3;
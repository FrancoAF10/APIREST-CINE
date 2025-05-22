import {pool} from "../db.js"


//Lógica (backend) de cada enpoint
export const getPeliculas=async(req,res)=>{
  try{
    const [rows]=await pool.query("SELECT * FROM PELICULAS")
  res.json(rows)
  }catch(error){
    return res.status(500).json({
  message: 'No se concretó la consulta'
})
}
}

export const getPeliculaById=async(req,res)=>{
  try{
    const [rows]=await pool.query("SELECT * FROM PELICULAS WHERE id=?",[req.params.id])
  if(rows.length<=0){
    return res.status(404).json({
      message:'No existe pelicula con ese ID'
    })
  }
  res.json(rows)
}catch(error){
return res.status(500).json({
  message: 'No se concretó la consulta'
})
}
  
}

export const createPeliculas= async(req,res)=>{
try{  //1. Obtener datos del Json (input)
  const {titulo,duracion,clasificacion,alanzamiento}=req.body
// 2. Ejecutar la consulta, pasa valores obtenidos
  const [rows]=await pool.query("INSERT INTO PELICULAS (titulo,duracion,clasificacion,alanzamiento)VALUES(?,?,?,?)",
  [titulo,duracion,clasificacion,alanzamiento])
  //3. enviar un objeto con el resultado del query
  res.send({
    id:rows.insertId,
    titulo,
    duracion,
    clasificacion,
    alanzamiento
  })
}catch(error){
  return res.status(500).json({
  message: 'No se concretó la consulta'
})
}
}
export const updatePeliculas=async(req,res)=>{
  try{
    const id=req.params.id
  const {titulo,duracion,clasificacion,alanzamiento}=req.body

  const querySQL= `
  UPDATE peliculas SET
   titulo= ?,
   duracion= ?,
   clasificacion= ?,
   alanzamiento= ?
  WHERE id= ?
  `
   
  const [result]=await pool.query(querySQL, [titulo, duracion, clasificacion, alanzamiento, id])

  if(result.affectedRows==0){
    return res.status(404).json({
      message: "EL ID NO EXISTE"
    })
  }
  res.json({
    message:"Actualización Correcta"
  })
}catch(error){
  return res.status(500).json({
  message: 'No se concretó la consulta'
})
}
}

export const deletePeliculas=async(req,res)=> {
 try{
   const [result]=await pool.query("DELETE FROM PELICULAS WHERE id=?",[req.params.id])
 if(result.affectedRows<=0){
  return res.status(404).json({
    message:"No existe registro con este ID"
  })
 }
 //¿Y si borra correctamente?
 res.sendStatus(204)
}catch(error){
  return res.status(500).json({
  message: 'No se concretó la consulta'
})
}
}
import app from './app.js'
import DbConnection from './config/db.js';



const PORT = process.env.PORT;

async function startServer(){ 
    await DbConnection();
    app.listen(PORT,()=>{
        console.log(`server is running on the port ${PORT}`);
    })
        
    
}
startServer();


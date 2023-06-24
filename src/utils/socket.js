import socket from 'socket.io'
import { server } from '../server'
import verifyToken from '../helpers/verifyToken'

const io = socket(server, {
    cors: {}
})

io.use(async (socket, next)=>{
    const { access_token } = socket.handshake.auth
    try {
        if(access_token){
            const decodedToken = await verifyToken(access_token)
            console.log('VVVEEEERRRRRRRRFFFFI', decodedToken.user.id)
            socket.userId = decodedToken.user.id
    
            return next()
        }
    
        throw new Error("Provide Access Token");
    
      } catch (error) {
        return next(error);
      }
})

export const ipsconnected = {}

io.on('connection', (socket)=>{
    console.log('User Socket connected!')

    const connectedSocketId = socket.id;
    const userId = socket.userId

    if (!ipsconnected.hasOwnProperty(connectedSocketId)) {
        ipsconnected[connectedSocketId] = {
          socket,
          user: { id: userId },
        };
    }
    console.log('ips', ipsconnected);
})

export default io
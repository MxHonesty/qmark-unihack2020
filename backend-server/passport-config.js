const { authenticate } = require('passport')

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport,getUserByEmail,getUserById){

    const authenticateUser = async (email,password,done)=>{
         var user = await getUserByEmail(email)
        // user = JSON.stringify(user)
         console.log(user)
        if(user==null){
            return done(null,false,{message:"no user with that email"})
        }
        try{
            if(await bcrypt.compare(password,user.PAROLA)){
                return done(null,user)
            }else{
                return done(null,false,{message:"password incorrect"})
            }
        }catch(e){
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField:'email'}, authenticateUser))
    passport.serializeUser((user,done)=>done(null,user.ID))
    passport.deserializeUser(async (id,done)=>{
        return done(null,await getUserById(id))
    })
}
module.exports = initialize
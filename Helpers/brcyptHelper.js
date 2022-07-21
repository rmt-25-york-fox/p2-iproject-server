const bcrypt= require('bcryptjs')

const hashPassword = (plainPass) =>{
    return bcrypt.hashSync(plainPass, 8)
}


const comparePassword = (passInput, passInDB)=>{
    return bcrypt.compareSync(passInput, passInDB)
}

module.exports = { hashPassword, comparePassword }

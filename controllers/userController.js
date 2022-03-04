const User=require('../models/User');

exports.addUser=async (user)=>{
    try {
        console.log('add user', user)

        const newUser={};
        newUser.userName=user;
        
        //crea el nuevo usuario
        user=new User(newUser);

        //guarda usuario
        await user.save();

    } catch (error) {
        console.log(error)
    }
    
}

exports.getUsers = async () => {
    try {
        // Obtener los usuarios
        const users = await User.find();
        const list = users.map(user => {return  userName=`<@${user.userName}>`}).join("\n ")
        return list

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
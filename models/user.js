module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        luckyNumber: DataTypes.INTEGER
    });

    User.associate = function(models) {
        models.User.hasMany(models.Task);
    }
    
    return User;
}
module.exports = function(sequelize, DataTypes) {
    
    var Task = sequelize.define("Task", {
        task: DataTypes.STRING,
        complete: DataTypes.BOOLEAN
    });

    Task.associate = function(models) {
        models.Task.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Task;
}
import classModel from "../../model/section/index.js";

const classController = {
  getAll: async (req, res) => {
    try {
      const classes = await classModel.findAll();
      console.log(classes);
      res.json(classes);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  getClassByName: async (req, res) => {
    try {
      const name = req.params.name;
      const classes = await classModel.findAll({
        where: {
          name: name,
        },
      });
      if (classes.length == 0) {
        res.status(404).json({
          message: "Class with this name doesnot exist",
        });
      } else {
        res.json(classes);
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  create: async (req, res) => {
    try {
      const payload = req.body;
      const Class = await classModel.create({
        name: payload.name,
        duration: payload.duration,
      });
      res.json({
        message: "Class created",
        Class,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  update: async (req, res) => {
    try {
      const { name, duration } = req.body;
      const nametoUpdate = req.params.name;
      const classToUpdate = await classModel.findOne({
        where: {
          name: nametoUpdate,
        },
      });
      if (!classToUpdate) {
        res.status(404).json({
          message: "Student to be updated not found",
        });
      } else {
        if (name) {
          classToUpdate.name = name;
        }
        if (duration) {
          classToUpdate.duration = duration;
        }
        await classToUpdate.save();
        res.json({
          message: "Class updated",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const classToDelete = await classModel.findByPk(id);
      if (!classToDelete) {
        res.status(404).json({
          message: "Class to be deleted does not exist",
        });
      } else {
        await classModel.destroy({
          where: {
            id: id,
          },
        });
        res.json({
          message: "Class deleted successfully",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};

export default classController;

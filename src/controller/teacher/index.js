import teacherModel from "../../model/teacher/index.js";

const teacherController = {
  getAll: async (req, res) => {
    try {
      const teachers = await teacherModel.findAll();
      if (teachers.length == 0) {
        res.status(404).json({
          message: "Teachers not found",
        });
      } else {
        res.json(teachers);
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  getTeacher: async (req, res) => {
    try {
      const id = req.params.id;
      const teacher = await teacherModel.findOne({
        where: {
          id: id,
        },
      });
      if (!teacher) {
        res.status(404).json({
          message: "Teacher not found",
        });
      } else {
        res.json({
          data: teacher,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  create: async (req, res) => {
    try {
      const payload = req.body;
      const teacher = await teacherModel.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        subject: payload.subject,
      });
      res.json({
        message: "Teacher added",
        teacher,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { firstName, lastName, subject } = req.body;
      const teacherToUpdate = await teacherModel.findOne({
        where: {
          id: id,
        },
      });
      if (!teacherToUpdate) {
        res.status(404).json({
          message: "Teacher not found",
        });
      } else {
        if (firstName) {
          teacherToUpdate.firstName = firstName;
        }
        if (lastName) {
          teacherToUpdate.lastName = lastName;
        }
        if (subject) {
          teacherToUpdate.subject = subject;
        }
        await teacherToUpdate.save();
        res.json({
          message: "Teacher updated",
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
      const teacherToDelete = await teacherModel.findByPk(id);
      if (!teacherToDelete) {
        res.status(404).json({
          message: "Teacher with this id doesnot exist",
        });
      } else {
        await teacherModel.destroy({
          where: {
            id: id,
          },
        });
        res.json({
          message: "Teacher deleted successfully",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};

export default teacherController;

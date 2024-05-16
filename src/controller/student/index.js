import studentModel from "../../model/student/index.js";

const studentController = {
  getAll: async (req, res) => {
    try {
      const students = await studentModel.findAll();
      if (students.length == 0) {
        res.status(404).json({
          message: "Students not found",
        });
      } else {
        res.json(students);
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  getStudentsByName: async (req, res) => {
    try {
      const name = req.params.name;
      const students = await studentModel.findAll({
        where: {
          firstName: name,
        },
        order: [["createdAt", "DESC"]],
        limit: 5,
      });
      if (students.length == 0) {
        res.status(404).json({
          message: "Students not found",
        });
      } else {
        res.json({
          data: students,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  getStudentById: async (req, res) => {
    try {
      const id = req.params.id;
      const student = await studentModel.findOne({
        where: {
          id: id,
        },
      });
      if (!student) {
        res.status(404).json({
          message: "Student not found",
        });
      } else {
        res.json(student);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  create: async (req, res) => {
    try {
      // const payload = req.body;
      // const newStudent = await studentModel.create({
      //   firstName: payload.firstName,
      //   lastName: payload.lastName,
      // });
      const { firstName, lastName } = req.body;
      const newStudent = new studentModel();
      console.log(newStudent);
      newStudent.firstName = firstName;
      newStudent.lastName = lastName;
      await newStudent.save();
      res.json({
        message: "Student Created",
        newStudent,
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
      const { firstName, lastName } = req.body;
      const studentToUpdate = await studentModel.findOne({
        where: {
          id: id,
        },
      });
      if (!studentToUpdate) {
        res.status(404).json({
          message: "Student to be updated not found",
        });
      } else {
        if (firstName) {
          studentToUpdate.firstName = firstName;
        }
        if (lastName) {
          studentToUpdate.lastName = lastName;
        }
        console.log(studentToUpdate);
        await studentToUpdate.save();
        res.json({
          message: "Student Updated",
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
      const studentToDelete = await studentModel.findByPk(id);
      if (!studentToDelete) {
        res.status(404).json({
          message: "Student to be deleted does not exist",
        });
      } else {
        await studentModel.destroy({
          where: {
            id: id,
          },
        });
        res.json({
          message: "Student deleted successfully",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};

export default studentController;

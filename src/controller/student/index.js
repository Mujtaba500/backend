const students = [
  {
    id: 1,
    name: "Mahad",
  },
  {
    id: 2,
    name: "Fahad",
  },
  {
    id: 3,
    name: "Ahad",
  },
];

const studentController = {
  getAll: (req, res) => {
    try {
      res.json(students);
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  getStudent: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const student = students.find((std) => std.id === id);
      res.json(student);
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  create: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const payload = req.body;
      students.push(payload);
      res.json({
        message: "Student Created",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  update: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name } = req.body;
      const studentIndex = students.findIndex((std) => std.id === id);
      if (studentIndex === -1) {
        res.status(404).json({
          message: "student not found",
        });
      } else {
        if (name) {
          students[studentIndex].name = name;
        }
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
  delete: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const studentIndex = students.findIndex((std) => std.id === id);
      if (studentIndex === -1) {
        res.status(404).json({
          message: "student not found",
        });
      } else {
        students.splice(studentIndex, 1);
        res.json({
          message: "Student Deleted",
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

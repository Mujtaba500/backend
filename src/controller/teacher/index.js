const teachers = [
  {
    name: "Ali",
    id: 1,
    subject: "MERN",
  },
  {
    name: "Mohsin",
    id: 2,
    subject: "SOFT skills",
  },
  {
    name: "Mujtaba",
    id: 3,
    subject: "fundamentals",
  },
];

const teacherController = {
  getAll: (req, res) => {
    try {
      res.status(200).json(teachers);
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  getTeacher: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const teacher = teachers.find((teacher) => teacher.id === id);
      res.json(teacher);
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  create: (req, res) => {
    try {
      const payload = req.body;
      teachers.push(payload);
      res.json({
        message: "Teacher added",
        payload,
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
      const { name, subject } = req.body;
      const teacherIndex = teachers.findIndex((teacher) => teacher.id === id);
      if (teacherIndex === -1) {
        res.status(404).json({
          message: "No teacher exists with this id",
        });
      } else {
        if (name) {
          teachers[teacherIndex].name = name;
        }
        if (subject) {
          teachers[teacherIndex].subject = subject;
        }

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
  delete: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const index = teachers.findIndex((teacher) => teacher.id === id);
      console.log(index);
      if (index === -1) {
        res.status(404).json({
          message: "No teacher exists with this id",
        });
      } else {
        teachers.splice(index, 1);
        res.status(200).json({
          message: "Teacher deleted",
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

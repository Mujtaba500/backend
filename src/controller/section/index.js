const classes = [
  {
    name: "MERN",
    duration: "3 hours",
  },
  {
    name: "Fundamentals",
    duration: "2 hours",
  },
  {
    name: "Soft skills",
    duration: "2 hours",
  },
];

const classController = {
  getAll: (req, res) => {
    try {
      res.json(classes);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  getClass: (req, res) => {
    try {
      const name = req.params.name;
      console.log(name);
      const indexOfClass = classes.findIndex((Class) => Class.name == name);
      if (indexOfClass == -1) {
        res.status(404).json({
          message: "No class exists with this name",
        });
      } else {
        const classRequested = classes[indexOfClass];
        res.json(classRequested);
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  create: (req, res) => {
    try {
      const payload = req.body;
      classes.push(payload);
      res.json({
        message: "class created",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  update: (req, res) => {
    try {
      const payload = req.body;
      const nameOfClassToUpdate = req.params.name;
      console.log(payload);
      const { name, duration } = payload;
      const indexOfClass = classes.findIndex(
        (Class) => Class.name == nameOfClassToUpdate
      );
      console.log(indexOfClass);
      if (indexOfClass == -1) {
        res.status(404).json({
          message: "No class exists with this name",
        });
      }
      if (name) {
        classes[indexOfClass].name = name;
      }
      if (duration) {
        classes[indexOfClass].duration = duration;
      }
      res.json({
        message: "Class Updated",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  delete: (req, res) => {
    try {
      const name = req.params.name;
      const indexOfClass = classes.findIndex((Class) => Class.name == name);
      if (indexOfClass == -1) {
        res.status(404).json({
          message: "No class exists with this name",
        });
      } else {
        classes.splice(indexOfClass, 1);
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

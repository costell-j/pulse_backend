const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ".//images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const guideSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  category: Joi.string().min(3).required(),
  read_time: Joi.string().required(),
  img_name: Joi.string().required(),
  color: Joi.string()
    .valid("lightteal", "lightgold", "lightblue", "lightlavender")
    .required(),
  text: Joi.string().min(20).required(),
});

let guides = [
  {
    _id: 1,
    img_name: "/images/icon-medications.png",
    title: "How to read a prescription label",
    category: "Medication safety",
    read_time: "5 minute read",
    description: "Explore the different sections of a prescription label.",
    color: "lightteal",
    text: "Consectetur nostrud reprehenderit quis amet do Lorem consectetur. Consequat amet cupidatat sunt amet officia reprehenderit nulla mollit ipsum dolore aliquip consequat ea. Labore amet ex Lorem sit eiusmod nisi esse magna dolore anim est. Velit ad culpa nisi consectetur deserunt laborum ullamco. Ex elit incididunt nisi labore occaecat duis ea tempor magna ad.",
  },
  {
    _id: 2,
    img_name: "/images/icon-appointments.png",
    title: "What to bring to a doctor's appointment",
    category: "Preparing for care",
    read_time: "4 minute read",
    description:
      "Make a checklist of information and questions to bring to your visit.",
    color: "lightgold",
    text: "Consectetur nostrud reprehenderit quis amet do Lorem consectetur. Consequat amet cupidatat sunt amet officia reprehenderit nulla mollit ipsum dolore aliquip consequat ea. Labore amet ex Lorem sit eiusmod nisi esse magna dolore anim est. Velit ad culpa nisi consectetur deserunt laborum ullamco. Ex elit incididunt nisi labore occaecat duis ea tempor magna ad.",
  },
  {
    _id: 3,
    img_name: "/images/icon-guides.png",
    title: "Preventative care basics for every age",
    category: "Healthy habits",
    read_time: "6 minute read",
    description:
      "An introduction to preventive care and questions to discuss with your provider.",
    color: "lightblue",
    text: "Consectetur nostrud reprehenderit quis amet do Lorem consectetur. Consequat amet cupidatat sunt amet officia reprehenderit nulla mollit ipsum dolore aliquip consequat ea. Labore amet ex Lorem sit eiusmod nisi esse magna dolore anim est. Velit ad culpa nisi consectetur deserunt laborum ullamco. Ex elit incididunt nisi labore occaecat duis ea tempor magna ad.",
  },
  {
    _id: 4,
    img_name: "/images/icon-conditions.png",
    title: "Understanding blood pressure: the numbers explained",
    category: "Preventative care",
    read_time: "5 minute read",
    description: "Explore common blood pressure terminology.",
    color: "lightlavender",
    text: "Consectetur nostrud reprehenderit quis amet do Lorem consectetur. Consequat amet cupidatat sunt amet officia reprehenderit nulla mollit ipsum dolore aliquip consequat ea. Labore amet ex Lorem sit eiusmod nisi esse magna dolore anim est. Velit ad culpa nisi consectetur deserunt laborum ullamco. Ex elit incididunt nisi labore occaecat duis ea tempor magna ad.",
  },
  {
    _id: 5,
    img_name: "/images/icon-medications.png",
    title: "Questions to ask your pharmacist",
    category: "Medication safety",
    read_time: "4 minute read",
    description:
      "Prepare questions for your next conversation with a pharmacist.",
    color: "lightteal",
    text: "Consectetur nostrud reprehenderit quis amet do Lorem consectetur. Consequat amet cupidatat sunt amet officia reprehenderit nulla mollit ipsum dolore aliquip consequat ea. Labore amet ex Lorem sit eiusmod nisi esse magna dolore anim est. Velit ad culpa nisi consectetur deserunt laborum ullamco. Ex elit incididunt nisi labore occaecat duis ea tempor magna ad.",
  },
  {
    _id: 6,
    img_name: "/images/icon-guides.png",
    title: "Keeping your health records organized",
    category: "Preparing for care",
    read_time: "5 minute read",
    description:
      "Explore ways to organize appointment notes and health documents.",
    color: "lightgold",
    text: "Consectetur nostrud reprehenderit quis amet do Lorem consectetur. Consequat amet cupidatat sunt amet officia reprehenderit nulla mollit ipsum dolore aliquip consequat ea. Labore amet ex Lorem sit eiusmod nisi esse magna dolore anim est. Velit ad culpa nisi consectetur deserunt laborum ullamco. Ex elit incididunt nisi labore occaecat duis ea tempor magna ad.",
  },
  {
    _id: 7,
    img_name: "/images/icon-providers.png",
    title: "Understanding healthcare specialties",
    category: "Finding care",
    read_time: "6 minute read",
    description: "Get familiar with different types of healthcare providers.",
    color: "lightblue",
    text: "Consectetur nostrud reprehenderit quis amet do Lorem consectetur. Consequat amet cupidatat sunt amet officia reprehenderit nulla mollit ipsum dolore aliquip consequat ea. Labore amet ex Lorem sit eiusmod nisi esse magna dolore anim est. Velit ad culpa nisi consectetur deserunt laborum ullamco. Ex elit incididunt nisi labore occaecat duis ea tempor magna ad.",
  },
  {
    _id: 8,
    img_name: "/images/icon-appointments.png",
    title: "Preparing for a telehealth appointment",
    category: "Preparing for care",
    read_time: "4 minute read",
    description: "Create a checklist for your next virtual appointment.",
    color: "lightlavender",
    text: "Consectetur nostrud reprehenderit quis amet do Lorem consectetur. Consequat amet cupidatat sunt amet officia reprehenderit nulla mollit ipsum dolore aliquip consequat ea. Labore amet ex Lorem sit eiusmod nisi esse magna dolore anim est. Velit ad culpa nisi consectetur deserunt laborum ullamco. Ex elit incididunt nisi labore occaecat duis ea tempor magna ad.",
  },
];

app.get("/api/guides", (req, res) => {
  res.json(guides);
});

app.post("/api/guides", (req, res) => {
  const { error, value } = guideSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const newId = guides.length
    ? Math.max(...guides.map((guide) => guide._id)) + 1
    : 1;

  const newGuide = {
    _id: newId,
    ...value,
  };

  guides.push(newGuide);

  return res.status(201).json({
    success: true,
    guide: newGuide,
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

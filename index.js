const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage: storage });

let guides = [
    {
        "_id": 1,
        "img_name": "public/images/icon-medications.png",
        "title": "How to read a prescription label",
        "category": "Medication safety",
        "read_time": "5 minute read",
        "description": "Explore the different sections of a prescription label.",
        "color": "lightteal"
    },
    {
        "_id": 2,
        "img_name": "public/images/icon-appointments.png",
        "title": "What to bring to a doctor's appointment",
        "category": "Preparing for care",
        "read_time": "4 minute read",
        "description": "Make a checklist of information and questions to bring to your visit.",
        "color": "lightgold"
    },
    {
        "_id": 3,
        "img_name": "public/images/icon-guides.png",
        "title": "Preventative care basics for every age",
        "category": "Healthy habits",
        "read_time": "6 minute read",
        "description": "An introduction to preventive care and questions to discuss with your provider.",
        "color": "lightblue"
    },
    {
        "_id": 4,
        "img_name": "public/images/icon-conditions.png",
        "title": "Understanding blood pressure: the numbers explained",
        "category": "Preventative care",
        "read_time": "5 minute read",
        "description": "Explore common blood pressure terminology.",
        "color": "lightlavender"
    },
    {
        "_id": 5,
        "img_name": "public/images/icon-medications.png",
        "title": "Questions to ask your pharmacist",
        "category": "Medication safety",
        "read_time": "4 minute read",
        "description": "Prepare questions for your next conversation with a pharmacist.",
        "color": "lightteal"
    },
    {
        "_id": 6,
        "img_name": "public/images/icon-guides.png",
        "title": "Keeping your health records organized",
        "category": "Preparing for care",
        "read_time": "5 minute read",
        "description": "Explore ways to organize appointment notes and health documents.",
        "color": "lightgold"
    },
    {
        "_id": 7,
        "img_name": "public/images/icon-providers.png",
        "title": "Understanding healthcare specialties",
        "category": "Finding care",
        "read_time": "6 minute read",
        "description": "Get familiar with different types of healthcare providers.",
        "color": "lightblue"
    },
    {
        "_id": 8,
        "img_name": "public/images/icon-appointments.png",
        "title": "Preparing for a telehealth appointment",
        "category": "Preparing for care",
        "read_time": "4 minute read",
        "description": "Create a checklist for your next virtual appointment.",
        "color": "lightlavender"
    }
]

app.get("/api/guides", (req, res) => {
    res.send("I'll be under your bed...");
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
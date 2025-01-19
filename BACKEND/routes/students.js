const router = require("express").Router();
let Student = require("../models/Student");

//insert data into database
http://localhost:8070/student/add
router.route("/add").post((req,res)=> {
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
        name ,
        age,
        gender,
    });

    newStudent.save().then(() => {
        res.json("Student Added")
    }).catch((err) => {
        console.log(err);
    })


});

//get data form database
http://localhost:8070/student
router.route("/").get((req, res) => {
    Student.find()
        .then((students) => {
            res.json(students); // Use res here to send the response
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: "An error occurred", error: err });
        });
});


router.route("/get/:id").get(async(req,res) => {
    let userId = req.params.id;
    const user = await Student.findById(userId).
    then((student) =>{
        res.status(200).send({status :"user fetched", student})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user" ,error: err.message})

    })
})

http://localhost:8070/student/update/
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;

    // Destructure variables from req.body
    const { name, age, gender } = req.body;

    // Create an object to update
    const updateStudent = {
        name,
        age,
        gender,
    };

    try {
        // Find the user by ID and update
        await Student.findByIdAndUpdate(userId, updateStudent);
        res.status(200).send({
            status: "User updated successfully!",
        });
    } catch (err) {
        res.status(500).send({
            status: "Error with updating data",
            error: err.message,
        });
    }
});

http://localhost:8070/student/delete/

router.route("/delete/:id").delete(async(req,res) => {
    let userId = req.params.id;
    await Student.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status : "User deleted"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status :"Error with delete user" , error: err.message})
    })
})





module.exports = router;
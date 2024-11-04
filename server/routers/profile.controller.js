const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Profile = require('../models/Profile');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyUser');

//Route to get user data dashboard: GET "/api/userdata"
router.get('/userdata', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.users.id });
        res.status(200).json({ profile });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/profile/:id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.id })
            .populate({
                path: 'user',
                populate: {
                    path: 'post',
                    model: 'BookPost'
                }
            });

        if (!profile) {
            return res.status(404).json('Profile not found');
        }
        console.log(profile)
        res.status(200).json({ profile });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// Route to add user profile to database: POST "/api/userdata/add"
router.post('/add', verifyToken, async (req, res) => {

    try {
        const { username, phone, dob, address, prefrences, thought } = req.body;
        console.log(req.body)
        const profile = await Profile.create({
            username, phone, dob, address, prefrences, thought, user: req.user.userId
        });

        const id = profile._id

        await User.findByIdAndUpdate(req.user.userId, { $set: { profile: id } })
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to update an existing Profile: PUT "/api/updateprofile/:id". Login required
router.patch('/update-profile/:id', async (req, res) => {
    const { username, phone, dob, address, prefrences, thought } = req.body;

    try {
        const newProfile = {};
        if (username) newProfile.username = username;
        if (phone) newProfile.phone = phone;
        if (dob) newProfile.dob = dob;
        if (address) newProfile.address = address;
        if (prefrences) newProfile.prefrences = prefrences;
        if (thought) newProfile.thought = thought;

        const profile = await Profile.findOneAndUpdate({ user: req.params.id }, newProfile, { new: true });
        if (!profile) return res.status(404).send("Not Found");

        res.json({ profile });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to delete a profile: DELETE "/api/delete/:id". Login required
router.delete('/delete/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).send("Not Found");

        if (profile.user.toString() !== req.users.id) return res.status(401).send("Not Allowed");

        await profile.remove();
        res.json({ success: true, message: "Profile has been deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Multer Configuration
const DIR = 'public';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// Route to save user profile: POST "/api/user-profile". Login required
router.post('/user-profile', upload.single('profileImg'), async (req, res, next) => {
    try {
        const url = req.protocol + '://' + req.get('host');
        const user = new Profile({
            profileImg: url + '/public/' + req.file.filename,
            username: req.body.username,
            thought: req.body.thought,
            prefrences: req.body.prefrences,
            phone: req.body.phone,
            address: req.body.address,
            dob: req.body.dob,
            user: req.users.id
        });
        await user.save();
        res.status(201).json({
            message: "User profile saved successfully!",
            userCreated: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

// Route to get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: "User list retrieved successfully!",
            users: users
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;

// importing models
const cloudinary = require("cloudinary").v2
const Video = require("../models/video")

// check file exists or not
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

// video upload helper functions
async function videoUploadFileToCloudinary(file, folder) {
    const options = { folder, resource_type: 'video' };
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log(result);
        return result;
    } catch (error) {
        console.log("ERROR IN FILE UPLOAD TO Cloudinary");
        console.error(error);
        throw error;
    }
}

// image upload helper functions
async function imageUploadFileToCloudinary(file, folder) {
    const options = { folder };
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log(result);
        return result;
    } catch (error) {
        console.log("ERROR IN FILE UPLOAD TO Cloudinary");
        console.error(error);
        throw error;
    }
}


// image upload
const videoFileUpload = async (req, res) => {
    try {
        // fetch the data from req
        const { title, prompt, user } = req.body;
        //console.log("GET THE DATA : ", title, prompt, user);

        // get file
        const file = req.files.imageFile;
        //console.log("GET IMAGE FILE : ", file);

        // video file data
        const videoFile = req.files.video;
        //console.log("VIDEO FILE => ", videoFile)


        // if file type is supported
        // upload file to cloudinary
        console.log("UPLOADING TO CLOUDINARY")
        const responseImage = await imageUploadFileToCloudinary(file, "aora");
        console.log("IMAGE RESPONSE => ", responseImage);

        const responseVideo = await videoUploadFileToCloudinary(videoFile, "aora");
        console.log("VIDEO RESPONSE => ", responseVideo);



        // database entry
        console.log("DATABASE ENTRY CREATING");
        const fileData = await Video.create({
            title,
            prompt,
            user,
            thumbnail: responseImage.secure_url,
            videoUrl: responseVideo.secure_url
        })
        console.log("DATABASE ENTRY DONE");

        res.json({
            success: true,
            message: "File created successfully created successfully"
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "something went wrong while uploading image"
        })
    }
}


module.exports = videoFileUpload
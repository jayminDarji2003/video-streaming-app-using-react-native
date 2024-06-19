const Video = require("../models/video")

// get all videos controller
exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        //console.log(videos)

        return res.status(200).json({
            success: true,
            message: "videos get successfully",
            videos
        })
    } catch (error) {
        console.log("something went wrong while getting all videos")
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "can not get all videos"
        })
    }
}

// get latest video controller
exports.getLatestVideos = async (req, res) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 }).limit(8);

        return res.status(200).json({
            success: true,
            message: "videos get successfully",
            videos
        })
    } catch (error) {
        console.log("something went wrong while getting latest videos")
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "can not get latest videos"
        })
    }
}


// get single user videos controller
exports.getSingleUserVideos = async (req, res) => {
    try {
        // get id from params
        const { id } = req.params;
        const videos = await Video.find({ user: id });

        return res.status(200).json({
            success: true,
            message: "videos get successfully",
            videos
        })
    } catch (error) {
        console.log("something went wrong while single user videos")
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "can not get single user videos"
        })
    }
}



// search for videos
// search for videos
exports.searchVideo = async (req, res) => {
    try {
        // get query from params
        const { q } = req.query;

        // Search for videos by title and user ID
        const videos = await Video.find({
            title: { $regex: q, $options: 'i' } // 'i' for case-insensitive search
        });

        return res.status(200).json({
            success: true,
            message: "Videos retrieved successfully",
            videos
        });
    } catch (error) {
        console.log("Something went wrong while searching for videos");
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot retrieve videos"
        });
    }
};

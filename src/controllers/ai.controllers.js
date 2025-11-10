import aiService from "../services/ai.services.js";

const getResponse = async (req, res) => {
    const code = req.body.code;
    console.log("got resp");

    try {
        if (!code) {
            return res.status(400).json({
                success: 0,
                message: "code is required!"
            })
        }

        const aiResponse = await aiService(code);

        return res.status(201).json({
            success: 1,
            message: "Response received successfuly!",
            Feedback: aiResponse.text
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: 0,
            message: `An unexpected error occurred while generating the response. \n ${error.error?.message || "We're working to fix this issue soon."}`
        })
    }
}

export { getResponse };
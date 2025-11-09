const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if ([fullName, email, password].some((field) =>
            field?.trim() === ""
        )) {
            return res.status(400).json({
                success: 0,
                message: "All fields are required",
            })
        }

        const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!emailRegex.test(email)) {
            return res.status(403).json({
                success: 0,
                message: "Email address not valid"
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({
                success: 0,
                message: "User already Exists!",
            })
        }

        const user = await User.create(
            {
                fullName,
                email,
                avatar,
                gender,
                password
            }
        )


        const createdUser = await User.findById(user._id).select(
            "-password"
        )

        if (!createdUser) {
            // throw new ApiError(500,
            //     "Something went wrong while registering the user")
            return res.status(500).json({
                success: 0,
                message: "Something went wrong while registering the user",
            })
        }

        return res.status(201).json({
            success: 1,
            message: "User created Successfuly!",
            user: createdUser
        })

    } catch (error) {
        console.error("ERROR IN REGISTER ROUTE: ", error);
        // res.status(500).json({ message: "Server error" });
        console.log(error);

        // next(error);
    }
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);


        if ([email, password].some((field) =>
            field?.trim() === ""
            // returns true false if any of the fields is empty
        )) {
            // throw new ApiErrorHandler(
            //     400,
            //     "email and password can't be empty"
            // )

            return res.status(400).json(
                {
                    success: 0,
                    message: "email and password can't be empty"
                }
            )
        }

        const userExists = await User.findOne({ email });

        console.log("User Login");


        if (!userExists) {
            return res.status(404).json({
                success: 0,
                message: "Email not registered, Sign up!",
            })
        }

        const isPasswordValid = await bcrypt.compare(password, userExists.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                success: 0,
                message: "Wrong password,Check Your Password again."
            })
        }

        const token = userExists.generateAccessToken();

        return res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", //as not https yet
            sameSite: "lax"
        }).status(201).json({
            token,
            success: 1,
            message: `Welcome ${userExists.fullName}`,
            user: userExists
        })

    } catch (error) {
        console.error("ERROR IN REGISTER ROUTE: ", error);
        res.status(500).json(
            {
                success: 0,
                message: "Server error"
            });
        // next(error);
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        return res.status(200).json({
            success: 1,
            message: "Logged out successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: 0,
            message: `Error while logging Out :: ${error.message}`
        });
    }
}
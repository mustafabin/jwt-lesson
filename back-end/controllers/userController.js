import UserModel from "../models/user.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

let secret = process.env.JWT_SECRET || "123";

let generateToken = async (id) => {
  return await Jwt.sign({ id: id }, secret, {
    expiresIn: "14d",
  });
};

export const userController = {
  async create(req, res) {
    //grab required parameters to make a user
    const { email, password } = req.body;

    //if the api POST request is missing some fields throw an err
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields (¬､¬)" });
    }

    //Check if a user with the same email exists
    const doesExist = await UserModel.findOne({ email });
    if (doesExist) {
      return res.status(400).json({ message: "User already exists ¯_(ツ)_/¯" });
    }

    //We must hash user's password for security reasons
    //NEVER store unencrypted password (ˇ⏠ˇ)
    //Hashing is asynchronous so a await is necessary
    const salt = await bcrypt.genSalt(1);
    const hashedPassword = await bcrypt.hash(password, salt);

    //after checks passed and password hashed create user
    try {
      let newUser = await UserModel.create({
        ...req.body,
        password: hashedPassword,
      });
      // we never send back the passwordeven even if it has been hashed
      res.status(201).json({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: await generateToken(newUser.id),
      });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  },
  async login(req, res) {
    const { email, password } = req.body;
    try {
      let user = await UserModel.findOne({ email: email });
      //Check if user existes and if the password is correct
      //Since the password was hashed with bcrypt it can only be checked using the .compare()
      //Note this does not return the original password just a Boolean
      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: await generateToken(user.id),
        });
      } else {
        res.status(403).json({
          message: "Invaild Credentials",
        });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  async profile(req, res) {
    let requestHeaders = req.headers.authorization;
    //check if there is any headers present and check if authorization header is included
    if (requestHeaders && requestHeaders.startsWith("Bearer ")) {
      try {
        //grab the token from the headers exluding the Bearer part
        let token = requestHeaders.split(" ")[1];
        //check if the token provided is valid
        const decoded = Jwt.verify(token, secret);

        //get id info from payload but remove password for security reasons
        let userProfile = await UserModel.findById(decoded.id).select(
          "-password"
        );
        res.json(userProfile);
      } catch {
        res.status(401).json({ message: "Not Authorized / Incorrect Token" });
      }
    } else {
      res.status(400).json({ message: "Missing Token (ToT)" });
    }
  },
};

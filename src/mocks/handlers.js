import { rest } from "msw";

import { uuid } from "uuidv4";

import bcrypt from "bcryptjs"

export default [
  //Signup

  rest.post("/api/signup", (req, res, ctx) => {
    const { username, email, password, image } = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt)

    const users = {
      id: uuid(),
      username: username,
      email: email,
      password: hash,
      image: image,
    };

    sessionStorage.setItem(`users-${email}`, JSON.stringify(users));
    let sessionId = uuid();
    sessionStorage.setItem("sessions-" + sessionId, email);
    
    return res(
      ctx.status(201),
      ctx.cookie("sessionId", sessionId),
    );
  }),

  //Login
  rest.post("/api/login", (req, res, ctx) => {
    const { email, password } = req.body;

    let loginUser = JSON.parse(sessionStorage.getItem(`users-${email}`));

    if (loginUser != null ) {
      bcrypt.compare(password, loginUser.password, (err, response) => {
        if(err){
          console.log(err)
        }
        if(response){
          let sessionId = uuid();
          sessionStorage.setItem("sessions-" + sessionId, email);
          return res(ctx.status(200), ctx.cookie("sessionId", sessionId));
        }
        return res(ctx.status(401))
      })
    }
    return res(ctx.status(404));
  }),

  //Logout
  rest.post("/api/logout", (req, res, ctx) => {
    const { sessionId } = req.cookies;

    let session = sessionStorage.getItem("sessions-" + sessionId);

    if (session) {
      sessionStorage.setItem("sessions-" + sessionId, "");
      return res(ctx.status(200));
    }

    return res(ctx.status(401));
  }),

  //Profile
  rest.get("/api/user/:email", (req, res, ctx) => {
    const { email } = req.params;
    const { sessionId } = req.cookies;

    let session = sessionStorage.getItem("sessions-" + sessionId);

    if (session) {
      let loggedUser = JSON.parse(sessionStorage.getItem(`users-${email}`));
      return res(
        ctx.status(200),
        ctx.json({
          loggedUser,
        })
      );
    }
    
    return res(ctx.status(401))
  }),

  //Update
  rest.put("/api/user/:email", (req, res, ctx) => {
    const { username, newEmail, oldEmail, password, image } = req.body;

    const newUser = {
      id: uuid(),
      username: username,
      email: newEmail,
      password: password,
      image: image,
    };

    sessionStorage.removeItem(`users-${oldEmail}`);
    sessionStorage.setItem(`users-${newEmail}`, JSON.stringify(newUser));
    return res(ctx.status(201));
  }),
];

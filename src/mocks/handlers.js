import { rest } from "msw";

import { uuid } from "uuidv4";

export default [
  //Signup

  rest.post("/api/signup", (req, res, ctx) => {
    const { username, email, password, image } = req.body;

    const users = {
      id: uuid(),
      username: username,
      email: email,
      password: password,
      image: image,
    };
    sessionStorage.setItem(`${email}`, JSON.stringify(users));
    let sessionId = uuid();
    sessionStorage.setItem("sessions-" + sessionId, email);
    
    return res(
      ctx.status(201),
      ctx.cookie("sessionId", sessionId),
      ctx.json({
        email,
      })
    );
  }),

  //Login
  rest.post("/api/login", (req, res, ctx) => {
    const { email, password } = req.body;

    let loginUser = JSON.parse(sessionStorage.getItem(email));
    if (loginUser != null && loginUser.password === password) {
      let sessionId = uuid();
      sessionStorage.setItem("sessions-" + sessionId, email);
      return res(ctx.status(200), ctx.cookie("sessionId", sessionId));
    }
    return res(ctx.status(401));
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
      let loggedUser = JSON.parse(sessionStorage.getItem(email));
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
    const { username, newEmail, password, image } = req.body;

    const newUser = {
      id: uuid(),
      username: username,
      email: newEmail,
      password: password,
      image: image,
    };

    const { email } = req.params;
    let registeredEmail = sessionStorage.key(email);

    sessionStorage.removeItem(registeredEmail);
    sessionStorage.setItem(newEmail, JSON.stringify(newUser));
    return res(ctx.status(201));
  }),
];

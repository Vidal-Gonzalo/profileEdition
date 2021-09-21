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
    return res(ctx.status(201), ctx.json({
      email
    }));
  }),

  //Login

  rest.post("/api/login", (req, res, ctx) => {
    const { email, password} = req.body;

      let loginUser = JSON.parse(sessionStorage.getItem(email));
      if(loginUser != null){
        if(loginUser.password === password){
          return res(
            ctx.status(200)
          )
        }
      }

      return res(ctx.json({
        errMsg: "E-mail y/o contraseña incorrectos"
      }))
  }),

  //Profile
  rest.get("/api/user/:email", (req, res, ctx) => {

    const { email } = req.params;

    let loggedUser = JSON.parse(sessionStorage.getItem(email));
    return res(
      ctx.status(200),
      ctx.json({
        loggedUser
      })
    )


  }),

  //Update 
  rest.put("/api/user/:email", (req, res, ctx) => {
    const { username, newEmail, password, image } = req.body;

    const newUser = {
      id: uuid(),
      username: username,
      email: newEmail,
      password: password,
      image: image
    }

    const { email } = req.params;
    sessionStorage.removeItem(email);
    sessionStorage.setItem(newEmail, JSON.stringify(newUser));
    return res(ctx.status(201))


  }),
];

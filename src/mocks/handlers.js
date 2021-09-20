import { rest } from "msw";

import { uuid } from "uuidv4";

export default [
  //Signup

  rest.post("/api/signup", (req, res, ctx) => {
    const { firstName, lastName, email, password, image } = req.body;

    const users = {
      id: uuid(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      image: image,
    };
    sessionStorage.setItem(`${email}`, JSON.stringify(users));
    sessionStorage.setItem("is-authenticated", "true");
    return res(ctx.status(201));
  }),

  //Login

  rest.post("/api/login", (req, res, ctx) => {
    const { email, password } = req.body;

    for (let i = 0; i < sessionStorage.length; i++) {
      //Replace by a helper
      let registeredEmail = sessionStorage.key(i);
      if (registeredEmail === email) {
        let registeredUser = JSON.parse(
          sessionStorage.getItem(registeredEmail)
        );
        if (registeredUser.password === password) {
          sessionStorage.setItem("is-authenticated", "true");
          return res(
            ctx.status(200),
            ctx.json({
              registeredEmail,
            })
          );
        } else {
          return res(ctx.status(401));
        }
      }
    }

    return res(ctx.status(401));
  }),

  //Profile
  rest.get("/api/user/:email", (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem("is-authenticated");
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    const { email } = req.params;
    for (let i = 0; i < sessionStorage.length; i++) {
      let registeredEmail = sessionStorage.key(i); //Replace by a helper
      if (registeredEmail === email) {
        let registeredUser = JSON.parse(
          sessionStorage.getItem(registeredEmail)
        );
        return res(
          ctx.status(200),
          ctx.json({
            registeredUser,
          })
        );
      }
    }
  }),

  //Update 
  rest.put("/api/user/:email", (req, res, ctx) => {
    const { firstName, lastName, newEmail, password } = req.body;

    const newUser = {
      id: uuid(),
      firstName: firstName,
      lastName: lastName,
      email: newEmail,
      password: password
    }

    const { email } = req.params;
    for (let i = 0; i < sessionStorage.length; i++) {
      let registeredEmail = sessionStorage.key(i);
      
      if(registeredEmail === email){
        sessionStorage.setItem(registeredEmail, JSON.stringify(newUser));
        return res(ctx.status(200));
      }
    }

    return res(ctx.status(401));
  }),
];

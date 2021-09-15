import { rest } from "msw";

const { uuid } = require('uuidv4')

export default [
  //Profile
  rest.get("/api/user", (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),

  //Signup

  rest.post("/api/signup", (req, res, ctx) => {
    const { newFirstName, newLastName, newEmail, newPassword, newImage } = req.body;

    const users = {
      userId: uuid(),
      userName: newFirstName,
      userEmail: newEmail,
      userLastName: newLastName,
      userPassword: newPassword,
      userImage: newImage
    };

    sessionStorage.setItem("users", JSON.stringify(users));

    return res(ctx.status(200));
  }),

  //Login

  rest.post("/api/login", (req, res, ctx) => {
    const { email, password } = req.body;

    if (sessionStorage.length > 0) {
      const obj = JSON.parse(sessionStorage.users);
      if (email == obj.userEmail && password == obj.userPassword) {
        sessionStorage.setItem("is-authenticated", "true");
        return res(ctx.status(200));
      } else {
        return res(
          ctx.status(401, alert("E-mail o contraseña incorrectos"))
        )
      }
    }

    return res(
      ctx.status(401, alert("E-mail o contraseña incorrectos"))
    );
  }),
];

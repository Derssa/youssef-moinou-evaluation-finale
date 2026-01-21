import request from "supertest"; // pour simuler des requêtes HTTP
import { db } from "../db.js"; // pour interagir avec ta base MySQL
import { app } from "../server.js";

// ? TESTS AVEC SUPERTEST
describe("Tests de l’API Express + MySQL", () => {
  it("POST /api/auth/login doit connecter l'utilisateur", async () => {
    const user = { email: "test@example.com", password: "1234" };
    const res = await request(app).post("/api/auth/login/").send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Connexion réussie");
  });

  it("GET /api/tasks doit récupérer les tâches de l'utilisateur", async () => {
    const res = await request(app).get("/api/tasks").query({ user_id: 1 });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/tasks doit ajouter une tâche pour l'utilisateur", async () => {
    const task = { title: "test task", user_id: 1 };
    const res = await request(app).post("/api/tasks").send(task);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("test task");
  });

  afterAll(() => {
    // ? Ferme la connexion MySQL après les tests
    db.end();
  });
});

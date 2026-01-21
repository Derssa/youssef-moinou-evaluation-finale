describe("Application React + Express + MySQL", () => {
  beforeEach(() => {
    // On visite la page de login avant chaque test
    cy.visit("http://localhost:5174/login");
  });

  it("connexion d'un utilisateur et affichage de la liste des tâches", () => {
    // Remplir le formulaire de login
    cy.get('input[placeholder="Email"]').type("test@example.com");
    cy.get('input[placeholder="Mot de passe"]').type("1234");

    // Soumettre le formulaire
    cy.get("button[type=submit]").click();

    // Vérifier la redirection vers /tasks
    cy.url().should("include", "/tasks");

    // Vérifier que le nom de l'utilisateur est affiché
    cy.contains("test");

    // Vérifier qu'une tâche spécifique est affichée
    cy.contains("Faire les courses");
  });
});

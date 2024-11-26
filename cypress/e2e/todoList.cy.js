describe("Todo List App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("check localhost", () => {
    cy.visit("http://localhost:5173");
  });

  it("check display app", () => {
    //check input
    cy.get("input[cy-data='input-form']").should("be.visible");
    //check button
    cy.get("button[cy-data='input-button']").should("be.visible");
    //check title
    cy.get("h1[cy-data='app-title']").should("be.visible");
  });

  it("check add new task ", () => {
    const task = "testing task";
    //add task in input
    cy.get("input[cy-data='input-form']").type(task);
    //click button add
    cy.get("button[cy-data='input-button']").click();
    //check task in list
    cy.get("ul.list-group").should("contain.text", task);
    //delete task after test
    cy.get("button[cy-data='delete-button']").click();
  });

  it("check mark a task as completed", () => {
    const task = "testing task 2";
    //add task in input
    cy.get("input[cy-data='input-form']").type(task);
    //click button add
    cy.get("button[cy-data='input-button']").click();
    //click contain
    cy.contains(task).click();
    //check task in list
    cy.contains(task).should(
      "have.css",
      "text-decoration",
      "line-through solid rgb(43, 47, 50)"
    );
    //delete task after test
    cy.get("button[cy-data='delete-button']").click();
  });

  it("check update a task", () => {
    const task = "testing update";
    const taskNew = "testing update success";
    //add data in input
    cy.get("input[cy-data='input-form']").type(task);
    //click button add
    cy.get("button[cy-data='input-button']").click();
    //check task in list
    cy.get("ul.list-group").should("contain.text", task);
    //click button edit
    cy.get("button[cy-data='edit-button']").click();
    //update value input
    cy.get("input[cy-data='input-form']").clear().type(taskNew);
    //clicl update button
    cy.get("button[cy-data='input-button']").click();
    //check task in list
    cy.get("ul.list-group").should("contain.text", taskNew);
    //delete task after test
    cy.get("button[cy-data='delete-button']").click();
  });

  it("check delete a task", () => {
    const task = "testing delete";
    //add data in input
    cy.get("input[cy-data='input-form']").type(task);
    //click button add
    cy.get("button[cy-data='input-button']").click();
    //check task in list
    cy.get("ul.list-group").should("contain.text", task);
    //click button delete
    cy.get("button[cy-data='delete-button']").click();
    //check task in list
    cy.get("p[cy-data='notif-empty']").should(
      "contain.text",
      "Tidak ada tugas yang ditemukan"
    );
  });

  it("check change language txt button", () => {
    //click change language to en
    cy.get("button[cy-data='button-changeLang']").click();
    //check text button lang
    cy.get("button[cy-data='button-changeLang']").should(
      "contain.text",
      "English"
    );
    //click change language to id
    cy.get("button[cy-data='button-changeLang']").click();
    //check text button lang
    cy.get("button[cy-data='button-changeLang']").should(
      "contain.text",
      "Indonesia"
    );
  });

  it("check change language in app", () => {
    const task = "testing change language";

    //add data in input first
    cy.get("input[cy-data='input-form']").type(task);
    //click button add
    cy.get("button[cy-data='input-button']").click();

    //click change language to en
    cy.get("button[cy-data='button-changeLang']").click();
    //check text language en
    cy.get("h1[cy-data='app-title']").should("contain.text", "Todo List");
    cy.get("button[cy-data='edit-button']").should("contain.text", "Update");
    cy.get("button[cy-data='delete-button']").should("contain.text", "Delete");
    cy.get("button[cy-data='input-button']").should("contain.text", "Add");

    //click change language to id
    cy.get("button[cy-data='button-changeLang']").click();
    //check text language id
    cy.get("h1[cy-data='app-title']").should("contain.text", "Daftar Tugas");
    cy.get("button[cy-data='edit-button']").should("contain.text", "Edit");
    cy.get("button[cy-data='delete-button']").should("contain.text", "Hapus");
    cy.get("button[cy-data='input-button']").should("contain.text", "Tambah");

    //delete task after test
    cy.get("button[cy-data='delete-button']").click();
  });
});

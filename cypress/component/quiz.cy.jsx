import Quiz from "../../client/src/components/Quiz.tsx";

describe("Quiz Component", () => {
  it("renders the quiz component", () => {
    cy.mount(<Quiz />);
    cy.get("button").contains("Start Quiz");
  });

  it("displays the first question", () => {

    cy.intercept("/api/questions/random", {
      statusCode: 200,
      fixture: "questions.json",
    }).as("getQuestions");


    cy.mount(<Quiz />);
    cy.get("button").contains("Start Quiz").click();


    cy.get("h2").should("have.text", "Which of the following statements is used to handle exceptions in Python?")
  });

   it("displays the end page after answering the questions", () => {

    cy.intercept("/api/questions/random", {
      statusCode: 200,
      fixture: "questions.json",
    })


    cy.mount(<Quiz />);
    cy.get("button").contains("Start Quiz").click();

    // console.log(get)
    cy.get("button").eq(0).click()
    cy.get("button").contains("1").click()

    cy.get("h2").should("have.text", "Quiz Completed");
  });
});
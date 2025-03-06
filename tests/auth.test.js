import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index'; // Assuming index.js is an ES module.
const { expect } = chai;

chai.use(chaiHttp);

describe("Authentication API", () => {
  it("Should a user register successfully", (done) => {
    chai.request(app)
      .post("/api/auth/register")
      .send({
        email: "isaprecieux112@gmail.com",
        password: "121402pr0732021"
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("token");
        done();
      });
  });
});

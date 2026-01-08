export default class TestData {
  static makeAppointmentTestdata() {
    return [
        { testId: "TC001", facility: "Tokyo CURA Healthcare Center", hcp: "Medicare", visitDt: "5/10/2025" },
        { testId: "TC002", facility: "Hongkong CURA Healthcare Center", hcp: "Medicaid", visitDt: "5/11/2025" },
        { testId: "TC003", facility: "Seoul CURA Healthcare Center", hcp: "None", visitDt: "5/12/2025" }
    ]
  }
}

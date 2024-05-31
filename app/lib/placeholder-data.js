const users = [
  {
    id: "8c2ae69d-9dd8-415b-bdce-008ebea26888",
    email: "mlaudiaz69@gmail.com",
    password: "Pi=3.1416",
    is_active: true
  }
];

const persons = [
    {
      id: "3ebb3fda-72b6-431a-a1e6-f66d0e86cf15",
      id_user: "8c2ae69d-9dd8-415b-bdce-008ebea26888",
      firtsname: "Miguel Angel",
      lastname: "Lau Díaz",
      email: "mlaudiaz69@gmail.com",
      phone: "+5352887847"
    },
    {
      id: "120f3f12-d7cf-4f63-895b-dde48a5519e7",
      id_user: null,
      firtsname: "Miguel David",
      lastname: "Lau Medina",
      email: "md10crazy@gmail.com",
      phone: ""
    }
];


const beneficiary = [
    {
        id_person: "3ebb3fda-72b6-431a-a1e6-f66d0e86cf15",
        id_beneficiary: "120f3f12-d7cf-4f63-895b-dde48a5519e7",
        relation_type: "HIJO"
    } 
];

module.exports = {
  users,
  persons,
  beneficiary
};

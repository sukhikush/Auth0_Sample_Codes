// c5db7e83-1de4-4160-9883-4ed22fb60c80

const axios = require("axios");
// let data = JSON.stringify({
//   email: "string",
//   phone_number: "string",
//   user_metadata: {},
//   blocked: false,
//   email_verified: false,
//   phone_verified: false,
//   app_metadata: {},
//   given_name: "string",
//   family_name: "string",
//   name: "string",
//   nickname: "string",
//   picture: "string",
//   user_id: "string",
//   connection: "string",
//   password: "string",
//   verify_email: false,
//   username: "string",
// });

let data = JSON.stringify({
  email: "ritesh.lodaya@nexsales.com",
  user_metadata: {},
  blocked: false,
  email_verified: true,
  app_metadata: {},
  name: "ritesh lodaya",
  user_id: "c5db7e83-1de4-4160-9883-4ed22fb60c80",
  connection: "market-place-tam-sam-beta",
  password: "Nexsales@1234",
  verify_email: true,
  // username: "Ritesh Lodaya ",
});

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "https://innovation.auth0.com/api/v2/users",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJEWXlNRVZHTTBKQ1FrRXdNakUxTWtZMlJUWTFPREZCT0ROR09VVXlPRVZHUkRBMFJqUXdRUSJ9.eyJpc3MiOiJodHRwczovL2lubm92YXRpb24uYXV0aDAuY29tLyIsInN1YiI6InZtdldUVzBKbURYdFBQY042cTVpc2V4czNSRGtWZnZRQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2lubm92YXRpb24uYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE3MDAwMzUwMDEsImV4cCI6MTc4NjQzNTAwMSwiYXpwIjoidm12V1RXMEptRFh0UFBjTjZxNWlzZXhzM1JEa1ZmdlEiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.O8G3slNp6m1jc_ocd9BHpwBCh8hd-f8K4_YR8mZB6ungIwnmI2kcl2CcGU6q9AtUkgZs1iZK_QQ-TJiYRxk_KEtUzpeVA4xQb03DWNQraVQNrDhNzCNVLVU03-lRTK3xdQloBhODESoHlDVP5dM1LVbjLZIA0S_B_W9X59U-sGtBTufN4CL-VlcDTRdj3YNA2p_eS69wzuqvktOloKQO5LtH7CC8z1hJcND9OWPjHEYLmQw654LpGrglEKUTuF_7iL9JK-wB2VkncqpILX4OTbCFcdjyjvftJ2cc5iNL9hwVgHuCLP4qpDhxBj1_kRPl3ujgywFbL83FHvHQXuyi4w",
  },
  data: data,
};

// var options = {
//   method: "POST",
//   url: "https://innovation.auth0.com/oauth/token",
//   headers: { "content-type": "application/json" },
//   body: '{"client_id":"q59pedoTba50NohrfQNNgLvhYmUoCZIs","client_secret":"VMKgAZufuBpMArOMs2nJSuxHQSGiMyjXNV8IRDq14SgMJRoKTkvIfag4jwg0eWI2","audience":"https://innovation.auth0.com/api/v2/","grant_type":"client_credentials"}',
// };

axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error.response.data);
  });

import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().min(6).required(),
});

/*


      Client 
        QR 
        /payment
          paymentInformation
          {
            name:"thecoffeehouse",
            price: 200
            paymentMethod: "abcd",
            userId:""
          }

          => https://momo.api.vn/v1/payment?api_key=123esdasdasdas
            => SUCCESS
            => FAILURE

          MomoService  <==== API ====> MyServive
          Application Programming Interface

          SASS = Software as A Service

          Error handling in Express
          API get all posts
             - Pagination
             - Query params
          
          Rate limit (security)
*/

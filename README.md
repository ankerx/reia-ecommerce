# 💵 Modern E-commerce Website !

E-commerce store for massage and handmade products. Using NextJS and Static Site Generation provides a very good user experience. All products are fetched from headless CMS, which allows adding every new product very easily. Payments are handled by Stripe. After successful checkout client receives a confirmation email. E2E tests written in Cypress.

See live version here: https://reia-ecommerce.vercel.app/

## 📦 Technologies

| Name          |
| ------------- |
| React         |
| Nextjs        |
| Typescript    |
| TailwindCSS   |
| React Query   |
| Headless CMS  |
| Cypress       |


## 💻 Features

Products can be filtered by category or searched by name. Adding product to shopping cart will calculate total price and keep the data in local storage, to client not lose data when close the website. Stripe is handling payments, CommerceJS is handling sending emails after checkout. Tests written in Cypress are making sure everything is working as it should.

## ⭐️ What did I learn

I learned how to implement very important feature which are payments. Using typescript and react query working with APIs. Cypress is very good tool in apps like that to test all the flow that user is experiencing.


### Setup

```sh
$ git clone https://github.com/ankerx/reia-ecommerce.git
$ npm install
$ npm run dev
```

Happy hacking!

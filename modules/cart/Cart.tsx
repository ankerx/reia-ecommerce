import { loadStripe } from "@stripe/stripe-js";
import { commerce } from "../../lib/commerce";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { CartItems } from "./CartItems";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { Button } from "@material-tailwind/react";

import { useCart } from "../../core/hooks/useCart";
import { useCartContext } from "../../context/useCartContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");
export const Cart = () => {
  const { toggleCart, isOpen } = useCartContext();
  const { data: products, isLoading, error } = useCart();
  console.log(products);

  if (error) return <p>'An error has occurred:{error.message}'</p>;

  if (isLoading) return <LoadingSpinner />;

  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(products.id, { type: "cart" });
      console.log(token);
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/order", { method: "POST" });
      const data = await res.json();
      console.log(data);
      const stripe = await stripePromise;
      const token = await generateToken();
      console.log(token);

      // const { error } = await stripe!.redirectToCheckout({
      //   // Make the id field from the Checkout Session creation API response
      //   // available to this file, so you can provide it as parameter here
      //   // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      //   sessionId: data.id,
      // });
      const obj = await commerce.checkout.capture(token?.id!, {
        payment: {
          gateway: "test_gateway",
          card: {
            number: "4242 4242 4242 4242",
            expiry_month: "11",
            expiry_year: "2024",
            cvc: "616",
            postal_zip_code: "03-160",
          },
        },
        customer: {
          email: "oldak.s@o2.pl",
        },
        shipping: {
          name: "Jan Kowalski",
          street: "Fajna",
          town_city: "Warsaw",
          postal_zip_code: "03-160",
          country: "PL",
        },
        line_items: products.line_items,
      });
      console.log(obj);
      localStorage.setItem("order-details", JSON.stringify(obj));
      await commerce.cart.refresh();
      console.log(error);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Transition.Root as={Fragment} appear show={isOpen}>
      <Dialog
        open={isOpen}
        onClose={toggleCart}
        as="div"
        className="fixed inset-0 overflow-hidden z-50"
      >
        <div className="absolute inset-0 overflow-hidden z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-main shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Cart
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          onClick={toggleCart}
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Close</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-8 flow-root">
                      <CartItems products={products} />
                    </div>
                  </div>
                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{products.subtotal.formatted_with_symbol}</p>
                    </div>

                    <div className="mt-6">
                      {products.total_items > 0 ? (
                        <Button
                          variant="outlined"
                          fullWidth
                          color="brown"
                          onClick={handleCheckout}
                          // className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Checkout
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

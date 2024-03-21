import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";

import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { createStripeCheckoutSession } from "@/lib/actions";

// import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
// );
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const tiers = [
  {
    name: "Consultoria",
    id: "tier-freelancer",
    href: "#",
    price: { monthly: "S/. 100", annually: "$60" },
    description: "Asesoramiento en la eleccion de la investigacion",
    features: ["Asesoramiento en el plan de Tesis"],
    mostPopular: false,
  },
];
const tiers2 = [
  {
    name: "Servicio VIP",
    id: "tier-freelancer",
    href: "#",
    price: { monthly: "S/. 3500", annually: "$60" },
    description: "Asesoramiento Completo Trabajo Investigacion",
    features: [
      "Asesoramiento en la Eleccion del Tema",
      "Redaccion Tesis",
      "Correccion de Tesis",
      "Presentacion de la Tesis",
      "Aprobacion de la Tesis",
    ],
    mostPopular: false,
  },
];
const tiers3 = [
  {
    name: "Servicio Premium",
    id: "tier-freelancer",
    href: "#",
    price: { monthly: "S/. 8500", annually: "$60" },
    description: "Graduacion Garantizada",
    features: [
      "Asesoramiento en la Eleccion del Tema",
      "Redaccion Tesis",
      "Correccion de Tesis",
      "Presentacion de la Tesis",
      "Aprobacion de la Tesis",
      "Representacion Legal",
      "Tramites Documentarios",
      "Graduacion",
    ],
    mostPopular: false,
  },
];
export default function SubscriptionDialog(
  props: React.ComponentProps<typeof DrawerPrimitive.Root>,
) {
  initMercadoPago("TEST-e9a5d158-e13f-46a5-860f-5a62d46f7bb7");

  async function handleCheckout() {
    try {
      const lineItems = [
        {
          price: "price_1OpZIpFohaWPLRtCx8kh4FN5",
          quantity: 1,
        },
      ];

      const { sessionId, checkoutError } =
        await createStripeCheckoutSession(lineItems);

      if (!sessionId || checkoutError) {
        throw new Error(checkoutError || "Failed to create checkout session!");
      }

      // const stripe = await stripePromise;
      // if (!stripe) throw new Error("Failed to load Stripe!");

      // const { error } = await stripe.redirectToCheckout({ sessionId });

      // if (error) {
      //   if (error instanceof Error) throw new Error(error.message);
      // }
      // else {
      //   throw error;
      // }
    } catch (error: any) {
      toast.error(error?.message || "Failed to create checkout session!");
    }
  }
  return (
    <Drawer {...props}>
      <DrawerContent>
        <div className="flex items-start justify-center">
          <DrawerHeader></DrawerHeader>
          <div className="isolate grid grid-cols-1 gap-8 px-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  tier.mostPopular
                    ? "ring-2 ring-emerald-600"
                    : "ring-1 ring-gray-200",
                  "rounded-3xl p-8 xl:p-10",
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={cn(
                      tier.mostPopular ? "text-emerald-600" : "text-gray-900",
                      "text-lg font-semibold leading-8",
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-emerald-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-emerald-600">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {tier.price.monthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /consulta
                  </span>
                </p>
                <button
                  // onClick={handleCheckout}
                  aria-describedby={tier.id}
                  className={cn(
                    tier.mostPopular
                      ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-500"
                      : "text-emerald-600 ring-1 ring-inset ring-emerald-200 hover:ring-emerald-300",
                    "mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                  )}
                >
                  Comenzar
                  {/* <div id="wallet_container1">
                    <Wallet
                      initialization={{ preferenceId: "wallet_container1" }}
                      customization={{ texts: { valueProp: "smart_option" } }}
                    />
                  </div> */}
                </button>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        className="h-6 w-5 flex-none text-emerald-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="isolate grid grid-cols-1 gap-8 px-3">
            {tiers2.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  tier.mostPopular
                    ? "ring-2 ring-emerald-600"
                    : "ring-1 ring-gray-200",
                  "rounded-3xl p-8 xl:p-10",
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={cn(
                      tier.mostPopular ? "text-emerald-600" : "text-gray-900",
                      "text-lg font-semibold leading-8",
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-emerald-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-emerald-600">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {tier.price.monthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    {/* /month */}
                  </span>
                </p>
                <button
                  // onClick={handleCheckout}
                  aria-describedby={tier.id}
                  className={cn(
                    tier.mostPopular
                      ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-500"
                      : "text-emerald-600 ring-1 ring-inset ring-emerald-200 hover:ring-emerald-300",
                    "mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                  )}
                >
                  Comenzar
                  {/* <div id="wallet_container">
                    <Wallet
                      initialization={{ preferenceId: "2" }}
                      customization={{ texts: { valueProp: "smart_option" } }}
                    />
                  </div> */}
                </button>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        className="h-6 w-5 flex-none text-emerald-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="isolate grid grid-cols-1 gap-8 px-3">
            {tiers3.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  tier.mostPopular
                    ? "ring-2 ring-emerald-600"
                    : "ring-1 ring-gray-200",
                  "rounded-3xl p-8 xl:p-10",
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={cn(
                      tier.mostPopular ? "text-emerald-600" : "text-gray-900",
                      "text-lg font-semibold leading-8",
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-emerald-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-emerald-600">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {tier.price.monthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    {/* /month */}
                  </span>
                </p>
                <button
                  // onClick={handleCheckout}
                  aria-describedby={tier.id}
                  className={cn(
                    tier.mostPopular
                      ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-500"
                      : "text-emerald-600 ring-1 ring-inset ring-emerald-200 hover:ring-emerald-300",
                    "mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                  )}
                >
                  Comenzar
                  <div id="wallet_container">
                    <Wallet
                      initialization={{
                        preferenceId:
                          "255682966-0f8904ef-c009-40fc-97ae-c5b2fe726dad",
                      }}
                      customization={{
                        texts: { action: "pay", valueProp: "security_details" },
                      }}
                    />
                  </div>
                </button>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        className="h-6 w-5 flex-none text-emerald-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

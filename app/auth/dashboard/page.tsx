"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [cart, setCart] = useState<any[]>([]);

  if (!user) {
    router.push("/");
    return null;
  }

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      desc: "Bluetooth noise-cancelling headphones",
      offer: 20,
      actualPrice: 2999,
    },
    {
      id: 2,
      name: "Smart Watch",
      desc: "Fitness tracking watch",
      offer: 15,
      actualPrice: 4999,
    },
    {
      id: 3,
      name: "Gaming Mouse",
      desc: "RGB ergonomic gaming mouse",
      offer: 10,
      actualPrice: 1999,
    },
    {
      id: 4,
      name: "Laptop Stand",
      desc: "Aluminium adjustable stand",
      offer: 30,
      actualPrice: 1599,
    },
    {
      id: 5,
      name: "Portable Speaker",
      desc: "Waterproof HD speaker",
      offer: 25,
      actualPrice: 3499,
    },
    {
      id: 6,
      name: "HD Webcam",
      desc: "1080p webcam with mic",
      offer: 12,
      actualPrice: 2499,
    },
    {
      id: 7,
      name: "Mechanical Keyboard",
      desc: "RGB blue switch keyboard",
      offer: 35,
      actualPrice: 5999,
    },
    {
      id: 8,
      name: "USB-C Hub",
      desc: "8-in-1 docking hub",
      offer: 28,
      actualPrice: 2999,
    },
    {
      id: 9,
      name: "Power Bank",
      desc: "20000mAh fast charging",
      offer: 22,
      actualPrice: 2499,
    },
    {
      id: 10,
      name: "Earbuds",
      desc: "Wireless earbuds",
      offer: 18,
      actualPrice: 1999,
    },
    {
      id: 11,
      name: "Smart LED Bulb",
      desc: "RGB Wi-Fi bulb",
      offer: 40,
      actualPrice: 999,
    },
    {
      id: 12,
      name: "Phone Holder",
      desc: "Adjustable stand",
      offer: 50,
      actualPrice: 499,
    },
    {
      id: 13,
      name: "Action Camera",
      desc: "4K waterproof camera",
      offer: 27,
      actualPrice: 7999,
    },
    {
      id: 14,
      name: "Mini Tripod",
      desc: "Flexible tripod stand",
      offer: 35,
      actualPrice: 799,
    },
    {
      id: 15,
      name: "Bluetooth Keyboard",
      desc: "Slim wireless keyboard",
      offer: 22,
      actualPrice: 1499,
    },
  ];

  const getDiscountedPrice = (actualPrice: number, offer: number) =>
    actualPrice - Math.floor((actualPrice * offer) / 100);

  const addToCart = (product: any) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }

    alert(`${product.name} added to cart!`);
  };

  const increaseQty = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + getDiscountedPrice(item.actualPrice, item.offer) * item.qty,
    0
  );

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Welcome, {user.email}</h1>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded active:scale-95 active:bg-red-700 transition-all duration-150 cursor-pointer"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {products.map((product) => {
              const discounted = getDiscountedPrice(
                product.actualPrice,
                product.offer
              );

              return (
                <div
                  key={product.id}
                  className="border p-4 rounded shadow hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.desc}</p>

                  <p className="text-sm">
                    Offer: <b>{product.offer}% OFF</b>
                  </p>
                  <p className="text-sm line-through text-red-500">
                    ₹{product.actualPrice}
                  </p>

                  <p className="text-lg font-bold text-green-600 mb-3">
                    ₹{discounted}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 active:scale-95 active:bg-blue-700 transition-all duration-150 cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border p-4 rounded shadow-lg h-fit sticky top-4 mt-11">
          <h2 className="text-xl font-semibold mb-3">🛒 Your Cart</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center p-4">
              Your cart is empty. Add some products! 😊
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => {
                const discounted = getDiscountedPrice(
                  item.actualPrice,
                  item.offer
                );

                return (
                  <div
                    key={item.id}
                    className="border p-3 rounded flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        ₹{discounted} × {item.qty}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-2 py-1 bg-gray-300 rounded cursor-pointer"
                      >
                        -
                      </button>

                      <span className="font-bold">{item.qty}</span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-2 py-1 bg-gray-300 rounded cursor-pointer"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
                      >
                        X
                      </button>
                    </div>
                  </div>
                );
              })}

              <p className="text-lg font-bold text-right">
                Total: ₹{totalPrice}
              </p>

              <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700 active:scale-95 active:bg-green-600 transition-all duration-150 cursor-pointer">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

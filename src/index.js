import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

function App() {
    return (
        <div>
            <Header />
            <Menu />
            <Footer />
        </div>
    )

}

function Header() {
    return (
        <div className="header">
            <h1>Fast React Pizza Co.</h1>
        </div>
    )
}
function Menu() {
    const pizzas = pizzaData;
    // const pizzas = [];
    const numOfPizza = pizzas.length;
    console.log(numOfPizza)
    console.log(pizzas)
    return (
        <main className="menu">
            <h2>Our Menu</h2>
            {numOfPizza > 0 ? (
                //this is react fragment that mean to add <></> empty .we add this because in jsx we should not add more than one element and if we have more then one we have two chooses: 1- add div and it will render in dom . 2- add empty that called react fragment <></> that not render in dom .
                <>
                    <p>Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious.</p>
                    <ul className="pizzas">
                        {pizzas.map((pizza) => (
                            <Pizza pizza={pizza} key={pizza.name} />
                        ))}
                    </ul>
                </>
            ) : (
                <p>we're still working on our menu. please come back later :)</p>
            )
            }
        </main>)

}
function Pizza({ pizza }) {  // you can put name of key in object install of word props like this => {pizza}
    console.log(pizza)
    return (
        <li className={`pizza ${pizza.soldOut && "sold-out"} `}>
            <img src={pizza.photoName} alt={pizza.name} />
            <div>
                <h3>{pizza.name}</h3>
                <p>{pizza.ingredients}</p>
                {pizza.soldOut ? <span>SOLD OUT</span> : <span>{pizza.price}$</span>}

            </div>
        </li>
    )
}
function Footer() {
    const date = new Date();
    const openHours = 8;
    const closeHours = 20;
    const isOpen = date.getHours() >= openHours && date.getHours() <= closeHours;
    console.log(isOpen);
    return (
        <footer className="footer">
            {isOpen ? (
                <Order closeHours={closeHours} openHours={openHours} />
            ) : (
                <p>we're happy to welcome you between {openHours}:00 to {closeHours}:00</p>
            )}
        </footer>)
}
function Order({ closeHours, openHours }) {
    return (
        <div className="order">
            <p>we're open from {openHours}:00 to {closeHours}:00.Come to visit us or order online.</p>
            <button className="btn">Order</button>
        </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>)
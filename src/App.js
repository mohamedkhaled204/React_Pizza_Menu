import { useState } from "react";

export default function App() {
    const [items, setitems] = useState([]);

    function handleAdded(item) {
        setitems((items) => [...items, item]);
    }

    function deleteItem(id) {
        setitems((items) => items.filter((item) => item.id !== id));
    }

    function handleUpdate(id) {
        setitems((items) =>
            items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item))
        );
    }
    function clearItem() {
        setitems([]);
    }

    return (
        <div className="app">
            <Logo />
            <From onClickAdd={handleAdded} />
            <PackingList items={items} clearItem={clearItem} deleteItem={deleteItem} handleUpdate={handleUpdate} />
            <Footer items={items} />
        </div>
    );
}

function Logo() {
    return (
        <h1>🌴For Away👜</h1>
    );
}

function From({ onClickAdd }) {
    const [description, setdescription] = useState('');
    const [quantity, setquantity] = useState(1);

    function fromHandler(e) {
        e.preventDefault();
        if (!description) return;
        const newItem = { description, quantity, packed: false, id: Date.now() };
        onClickAdd(newItem);
        setdescription(''); // Clear input after adding
        setquantity(1); // Reset quantity after adding
    }

    return (
        <form className="add-form" onSubmit={fromHandler}>
            <h3>What Do You Need For 😍 Trip?</h3>
            <select value={quantity} onChange={(e) => setquantity(+e.target.value)}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>{num}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setdescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}

function PackingList({ items, deleteItem, handleUpdate ,clearItem}) {
    const [sortBy, setSortBy] = useState('input');
    let sortedItems = items;

    if (sortBy === 'desc') {
        sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    } else if (sortBy === 'packed') {
        sortedItems = items.slice().sort((a, b) => a.packed - b.packed);
    }

    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        key={item.id}
                        item={item}
                        onDeleteItem={deleteItem}
                        onHandleUpdate={handleUpdate}

                    />
                ))}
            </ul>
            <div className="actions">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">Sort by input order</option>
                    <option value="desc">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button onClick={clearItem}>Clear List</button>
            </div>
        </div>
    );
}

function Item({ item, onDeleteItem, onHandleUpdate }) {
    return (
        <li>
            <input
                type="checkbox"
                checked={item.packed}
                onChange={() => onHandleUpdate(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}

function Footer({ items }) {
    const totalItems = items.length;
    const packedItems = items.filter((item) => item.packed).length;
    const percentagePacked = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

    return (
        <footer className="stats">
            <em>
                💼 You have {totalItems} items on your list, and already packed {packedItems} ({percentagePacked}%)
            </em>
        </footer>
    );
}

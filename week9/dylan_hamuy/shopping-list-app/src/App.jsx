import { useState } from 'react';
import ShoppingList from './ShoppingList';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [budget] = useState(100);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const addItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    formDataObj.purchased = false;
    formDataObj.cost = parseFloat(formDataObj.cost || 0);
    formDataObj.category = formDataObj.category || 'uncategorized';
    formDataObj.deadline = formDataObj.deadline || '';

    setShoppingList([...shoppingList, formDataObj]);
    event.target.reset();
  };

  const removeItem = (event) => {
    const name = event.target.value;
    setShoppingList(shoppingList.filter(item => item.name !== name));
  };

  const filteredList = categoryFilter === 'all'
    ? shoppingList
    : shoppingList.filter(item => item.category === categoryFilter);

  return (
    <>
      <h1>Shopping List</h1>

      <form onSubmit={addItem}>
        <input name="name" placeholder="Item name" required />
        <input name="cost" type="number" placeholder="Cost" />
        <input name="category" placeholder="Category" />
        <input name="deadline" type="date" />
        <button type="submit">Add</button>
      </form>

      <label>Filter by category:</label>
      <select onChange={(e) => setCategoryFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="grocery">Grocery</option>
        <option value="school">School</option>
        <option value="household">Household</option>
      </select>

      <ShoppingList
        shoppingList={filteredList}
        removeItem={removeItem}
        budget={budget}
      />
    </>
  );
}

export default App;

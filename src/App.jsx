import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link, useLoaderData } from "react-router-dom";
import CoffeeCard from "./Components/CoffeeCard";

function App() {
  const loadedCoffees = useLoaderData();
  const [coffees, setCoffees] = useState(loadedCoffees)

  return (
    <>
      <h1 className="text-center text-white bg-amber-900 font-bold text-4xl p-2">Espresso Emporium</h1>
      <div className="max-w-11/12 mx-auto">
        <nav className="mx-auto w-fit">
          <div className="flex items-center space-x-2 mt-3">
            <Link to="/addCoffee">
              <button className="btn">Add Coffee</button>
            </Link>
            <Link className="btn" to="/signIn">Sign In</Link>
            <Link className="btn" to="/signUp">Sign Up</Link>
            <Link className="btn" to="/users">Users</Link>
          </div>
        </nav>
        <h1 className="text-center font-bold text-green-500 text-3xl">
          Number of coffee types available: {coffees.length}
        </h1>
        <div className="grid md:grid-cols-2 gap-3 mt-14">
          {coffees.map((coffee) => (
            <CoffeeCard key={coffee._id} coffee={coffee} setCoffees={setCoffees} coffees={coffees}></CoffeeCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

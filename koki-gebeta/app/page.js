"use client";

import MealSchedule from "./componet/MealSchedule";
import { useState, useEffect } from "react";

const days = [
  { day: "Monday", amharicDay: "ሰኞ" },
  { day: "Tuesday", amharicDay: "ማክሰኞ" },
  { day: "Wednesday", amharicDay: "ረቡዕ" },
  { day: "Thursday", amharicDay: "ሐሙስ" },
  { day: "Friday", amharicDay: "አርብ" },
];

const mealOptions = {
  Breakfast: [
    { name: "Oats & banana", emoji: "🥣", color: "yellow" },
    { name: "Eggs & bread", emoji: "🍳", color: "green" },
    { name: "Fruit pancakes", emoji: "🥞", color: "pink" },
    { name: "Cheese sandwich", emoji: "🥪", color: "blue" },
    { name: "Kinche", emoji: "🥣", color: "orange" },
  ],
  Lunch: [
    { name: "Firfir", emoji: "🫓", color: "orange" },
    { name: "Alecha firfir", emoji: "🫓", color: "yellow" },
    { name: "Pasta", emoji: "🍝", color: "blue" },
    { name: "Rice & vegetables", emoji: "🍚", color: "green" },
    { name: "Minced meat pasta", emoji: "🍝", color: "pink" },
  ],
  Snack: [
    { name: "Yogurt & bread", emoji: "🥛", color: "green" },
    { name: "Beef & cheese", emoji: "🥪", color: "pink" },
    { name: "Mini burger", emoji: "🍔", color: "yellow" },
    { name: "Fruit slices", emoji: "🍎", color: "orange" },
    { name: "Cheese sandwich", emoji: "🥪", color: "blue" },
  ],
  Juice: [
    { name: "Orange juice", emoji: "🍊", color: "pink" },
    { name: "Mango juice", emoji: "🥭", color: "orange" },
    { name: "Strawberry smoothie", emoji: "🍓", color: "blue" },
    { name: "Avocado smoothie", emoji: "🥑", color: "green" },
    { name: "Mixed fruit juice", emoji: "🍹", color: "yellow" },
  ],
};

const mealTypes = ["Breakfast", "Lunch", "Snack", "Juice"];

function createWeek(weekNumber) {
  return days.map((day, dayIndex) => ({
    ...day,
    meals: mealTypes.map((type, typeIndex) => {
      const options = mealOptions[type];

      const optionIndex =
        (dayIndex + typeIndex + weekNumber - 1) % options.length;

      return {
        id: `${weekNumber}-${dayIndex}-${type}`,
        type,
        ...options[optionIndex],
        family: "Family",
        feedback: "",
      };
    }),
  }));
}

const initialWeeks = [
  // Week 1 uses your original menu.
  [
    {
      day: "Monday",
      amharicDay: "ሰኞ",
      meals: [
        {
          type: "Breakfast",
          name: "Oats & banana",
          emoji: "🥣",
          color: "yellow",
        },
        { type: "Lunch", name: "Firfir", emoji: "🫓", color: "orange" },
        { type: "Snack", name: "Yogurt & bread", emoji: "🥛", color: "green" },
        { type: "Juice", name: "Orange juice", emoji: "🍊", color: "pink" },
      ],
    },
    {
      day: "Tuesday",
      amharicDay: "ማክሰኞ",
      meals: [
        {
          type: "Breakfast",
          name: "Eggs & bread",
          emoji: "🍳",
          color: "green",
        },
        { type: "Lunch", name: "Alecha firfir", emoji: "🫓", color: "yellow" },
        { type: "Snack", name: "Beef & cheese", emoji: "🥪", color: "pink" },
        { type: "Juice", name: "Mango juice", emoji: "🥭", color: "orange" },
      ],
    },
    {
      day: "Wednesday",
      amharicDay: "ረቡሕ",
      meals: [
        {
          type: "Breakfast",
          name: "Fruit pancakes",
          emoji: "🥞",
          color: "pink",
        },
        { type: "Lunch", name: "Pasta", emoji: "🍝", color: "orange" },
        { type: "Snack", name: "Mini burger", emoji: "🍔", color: "yellow" },
        {
          type: "Juice",
          name: "Strawberry smoothie",
          emoji: "🍓",
          color: "blue",
        },
      ],
    },
    {
      day: "Thursday",
      amharicDay: "ሐሙስ",
      meals: [
        {
          type: "Breakfast",
          name: "Cheese sandwich",
          emoji: "🥪",
          color: "blue",
        },
        { type: "Lunch", name: "Firfir", emoji: "🫓", color: "green" },
        { type: "Snack", name: "Yogurt & bread", emoji: "🥛", color: "pink" },
        { type: "Juice", name: "Orange juice", emoji: "🍊", color: "yellow" },
      ],
    },
    {
      day: "Friday",
      amharicDay: "አርብ",
      meals: [
        { type: "Breakfast", name: "Kinche", emoji: "🥣", color: "orange" },
        { type: "Lunch", name: "Pasta", emoji: "🍝", color: "blue" },
        { type: "Snack", name: "Mini burger", emoji: "🍔", color: "green" },
        { type: "Juice", name: "Mango juice", emoji: "🥭", color: "pink" },
      ],
    },
  ],
  createWeek(2),
  createWeek(3),
  createWeek(4),
].map((week, weekIndex) =>
  week.map((day, dayIndex) => ({
    ...day,
    meals: day.meals.map((meal, mealIndex) => ({
      ...meal,
      id: `${weekIndex + 1}-${dayIndex}-${mealIndex}`,
      family: meal.family || "Family",
      feedback: meal.feedback || "",
    })),
  }))
);

export default function Home() {
  const [weeks, setWeeks] = useState(initialWeeks);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const savedWeeks = localStorage.getItem("koki-meals");

    if (savedWeeks) {
      setWeeks(JSON.parse(savedWeeks));
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("koki-meals", JSON.stringify(weeks));
    }
  }, [weeks, isLoaded]);
  const [selectedWeek, setSelectedWeek] = useState(1);

  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [familyName, setFamilyName] = useState("Grandma");
  const [newWeekMode, setNewWeekMode] = useState("blank");
  const [sourceWeek, setSourceWeek] = useState(1);

  function createNewWeek() {
    const newWeekNumber = weeks.length + 1;
    let newWeek;

    if (newWeekMode === "blank") {
      // Create five days with four empty meal slots each.
      newWeek = days.map((day, dayIndex) => ({
        ...day,
        meals: mealTypes.map((type, mealIndex) => ({
          id: `${newWeekNumber}-${dayIndex}-${mealIndex}`,
          type,
          name: "",
          emoji: "🍽️",
          color: "purple",
          family: familyName || "Family",
          feedback: "",
        })),
      }));
    } else {
      // Copy the selected existing week.
      newWeek = JSON.parse(JSON.stringify(weeks[sourceWeek - 1]));

      // Give copied meals new IDs and reset ratings.
      newWeek = newWeek.map((day, dayIndex) => ({
        ...day,
        meals: day.meals.map((meal, mealIndex) => ({
          ...meal,
          id: `${newWeekNumber}-${dayIndex}-${mealIndex}`,
          family: familyName || "Family",
          feedback: "",
        })),
      }));
    }

    // Add the new week and open it.
    setWeeks((currentWeeks) => [...currentWeeks, newWeek]);
    setSelectedWeek(newWeekNumber);
  }

  function addMeal(event) {
    event.preventDefault();

    if (!mealName.trim() || !familyName.trim()) return;

    const options = mealOptions[mealType];
    const matchingMeal = options.find(
      (meal) => meal.name.toLowerCase() === mealName.trim().toLowerCase()
    );

    const newMeal = {
      id: Date.now(),
      type: mealType,
      name: mealName.trim(),
      emoji: matchingMeal?.emoji || "🍽️",
      color: matchingMeal?.color || "purple",
      family: familyName.trim(),
      feedback: "",
    };

    setWeeks((currentWeeks) =>
      currentWeeks.map((week, weekIndex) => {
        if (weekIndex !== selectedWeek - 1) return week;

        return week.map((day) => {
          if (day.day !== selectedDay) return day;

          // Replace the existing meal of this type on this day.
          return {
            ...day,
            meals: day.meals.map((meal) =>
              meal.type === mealType ? newMeal : meal
            ),
          };
        });
      })
    );

    setMealName("");
  }

  function rateMeal(dayName, mealType, rating) {
    setWeeks((currentWeeks) =>
      currentWeeks.map((week, weekIndex) => {
        if (weekIndex !== selectedWeek - 1) return week;

        return week.map((day) => {
          if (day.day !== dayName) return day;

          return {
            ...day,
            meals: day.meals.map((meal) =>
              meal.type === mealType ? { ...meal, feedback: rating } : meal
            ),
          };
        });
      })
    );
  }

  const selectedMeals = weeks[selectedWeek - 1];

  return (
    <main className="app">
      <header className="navbar">
        <a className="logo" href="#">
          🍱 Koki Gebeta
        </a>
        <span className="family-label">Made with 💜 for Koki</span>
      </header>

      <section className="hero">
        <p className="eyebrow">OUR LITTLE FAMILY MEAL PLANNER</p>
        <h1>Good food, made with love.</h1>
        <p>
          Welcome, {familyName}! Let's make Koki's school meals special this
          week.
        </p>

        <div className="date-card">
          <span>🇪🇹 Ethiopian calendar</span>
          <strong>Koki's meal adventure</strong>
          <small>Planning delicious meals for the family</small>
        </div>
      </section>

      <section className="new-week-section">
        <h2>Create a New Weekly Schedule 💜</h2>
        <p>Start fresh or reuse a previous week's meals.</p>

        <label htmlFor="weekMode">Choose an option:</label>

        <select
          id="weekMode"
          value={newWeekMode}
          onChange={(event) => setNewWeekMode(event.target.value)}
        >
          <option value="blank">Start with a blank week</option>
          <option value="copy">Copy an existing week</option>
        </select>

        {newWeekMode === "copy" && (
          <div>
            <label htmlFor="sourceWeek">Copy which week?</label>

            <select
              id="sourceWeek"
              value={sourceWeek}
              onChange={(event) => setSourceWeek(Number(event.target.value))}
            >
              {weeks.map((week, index) => (
                <option key={index} value={index + 1}>
                  Week {index + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="button" onClick={createNewWeek}>
          + Create New Week
        </button>
      </section>

      <MealSchedule
        weeklyMeals={selectedMeals}
        selectedWeek={selectedWeek}
        totalWeeks={weeks.length}
        onWeekChange={setSelectedWeek}
        onRateMeal={rateMeal}
      />

      <section className="add-section">
        <p className="eyebrow">FAMILY CONTRIBUTION</p>
        <h2>Plan a meal for Koki</h2>
        <p>Choose a day and add a favorite dish to the schedule.</p>

        <form onSubmit={addMeal} className="meal-form">
          <label>
            Your name
            <input
              value={familyName}
              onChange={(event) => setFamilyName(event.target.value)}
              placeholder="e.g. Grandma"
              required
            />
          </label>

          <label>
            Day
            <select
              value={selectedDay}
              onChange={(event) => setSelectedDay(event.target.value)}
            >
              {days.map((day) => (
                <option key={day.day} value={day.day}>
                  {day.amharicDay} ({day.day})
                </option>
              ))}
            </select>
          </label>

          <label>
            Meal type
            <select
              value={mealType}
              onChange={(event) => setMealType(event.target.value)}
            >
              {mealTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label>
            Favorite dish
            <input
              value={mealName}
              onChange={(event) => setMealName(event.target.value)}
              placeholder="e.g. Doro wat"
              required
            />
          </label>

          <button className="submit-button" type="submit">
            + Update meal
          </button>
        </form>
      </section>

      <footer>
        <p>Made with 💜 for Koki Gebeta</p>
      </footer>
    </main>
  );
}

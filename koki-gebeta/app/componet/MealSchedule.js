"use client";

export default function MealSchedule({
  weeklyMeals,
  selectedWeek,
  totalWeeks,
  onWeekChange,
  onRateMeal,
}) {
  return (
    <section className="schedule-section">
      <div className="schedule-heading">
        <div>
          <p className="schedule-eyebrow">KOKI'S FOOD ADVENTURE</p>
          <h2>My Weekly Meal Schedule 💜</h2>
          <p>Every day is a delicious new adventure!</p>
        </div>

        <select
          value={selectedWeek}
          onChange={(event) => onWeekChange(Number(event.target.value))}
          aria-label="Choose week"
        >
          {Array.from({ length: totalWeeks }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              Week {index + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="schedule-table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Meal time</th>

              {weeklyMeals.map((day) => (
                <th key={day.day}>
                  <span>{day.day}</span>
                  <small>{day.amharicDay}</small>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {["Breakfast", "Lunch", "Snack", "Juice"].map((mealType) => (
              <tr key={mealType}>
                <th className="meal-row-heading">
                  <span>
                    {mealType === "Breakfast" && "🥞"}
                    {mealType === "Lunch" && "🍱"}
                    {mealType === "Snack" && "🍓"}
                    {mealType === "Juice" && "🧃"}
                  </span>
                  <span>{mealType}</span>
                </th>

                {weeklyMeals.map((day) => {
                  const meal = day.meals.find((item) => item.type === mealType);

                  return (
                    <td key={day.day}>
                      {meal && (
                        <article className={`schedule-meal ${meal.color}`}>
                          <span className="food-emoji">{meal.emoji}</span>
                          <span className="food-name">{meal.name}</span>

                          <div className="table-feedback">
                            {[
                              { emoji: "😍", label: "Loved it!" },
                              { emoji: "🙂", label: "It was okay" },
                              { emoji: "🙁", label: "Not my favorite" },
                            ].map((item) => (
                              <button
                                type="button"
                                key={item.label}
                                className={
                                  meal.feedback === item.label
                                    ? "face selected"
                                    : "face"
                                }
                                onClick={() =>
                                  onRateMeal(day.day, mealType, item.label)
                                }
                                aria-label={item.label}
                                title={item.label}
                              >
                                {item.emoji}
                              </button>
                            ))}
                          </div>

                          {meal.feedback && (
                            <small className="feedback-result">
                              {meal.feedback}
                            </small>
                          )}

                          <small className="prepared-by">
                            By {meal.family}
                          </small>
                        </article>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="schedule-footer">
        <span>💜 Prepared with love for Koki</span>

        <button
          type="button"
          className="print-button"
          onClick={() => window.print()}
        >
          🖨️ Print / Save PDF
        </button>
      </div>
    </section>
  );
}

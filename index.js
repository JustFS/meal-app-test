let mealsData = [];

async function fetchMeals() {
  await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchInput.value
  )
    .then((res) => res.json())
    .then((data) => (mealsData = data.meals));

  console.log(mealsData);
  mealsDisplay();
}

function mealsDisplay() {
  if (mealsData === null) {
    searchResult.innerHTML = "<h2>Aucun résultat</h2>";
    return;
  }
  if (searchInput.value === "") {
    searchResult.innerHTML = "<h3>Veuillez faire une recherche</h3>";
    return;
  }
  searchResult.innerHTML = mealsData
    .slice(0, 12)
    .map((meal) => {
      let ingredients = [];

      for (i = 1; i < 21; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`
          );
        }
      }

      return `
        <div class="card">
          <h2>${meal.strMeal}</h2>
          <p>${meal.strArea}</p>
          <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}">
          <ul>${ingredients.join("")}</ul>
          <iframe width="759" height="427" src=${meal.strYoutube.replace(
            "watch?v=",
            "embed/"
          )} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      `;
    })
    .join("");
}

// searchInput.addEventListener("input", fetchMeals);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchMeals();
});

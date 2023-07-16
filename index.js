(() =>
{
    const searchInput = document.getElementById("search-input");
    const mainLayout = document.getElementById("main-layout");
    const cardLayout = document.getElementsByClassName("card");

    mainLayout.innerHTML = templates();

    searchInput.addEventListener("change", async function ()
    {
        // Get the searched food value
        const searchValue = searchInput.value;

        if (searchValue === "")
        {
            mainSearchOrigin(mainLayout);
        } else
        {
            mainSearchStyle(mainLayout)
            try
            {
                mainLayout.innerHTML = showLoadingState();

                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`,
                    {
                        method: "GET",
                    }
                );

                const responseJson = await response.json();

                if (responseJson.meals)
                {
                    mainLayout.innerHTML = searchTemplates(responseJson.meals);

                } else
                {
                    mainLayout.innerHTML = notFound();
                }
            } catch (error)
            {
                console.log("An error occurred:", error);
            }
        }
    });
})();

function mainSearchOrigin(mainLayout)
{
    mainLayout.innerHTML = templates();
    mainLayout.style.display = "flex";
    mainLayout.style.alignItems = "center";
    mainLayout.style.justifyContent = "center";
}

function mainSearchStyle(mainLayout)
{
    mainLayout.style.marginTop = "1em";
    mainLayout.style.alignItems = "center";
    mainLayout.style.display = "flex";
    mainLayout.style.justifyContent = "center";
    mainLayout.style.gap = ".5em";
    mainLayout.style.flexWrap = "wrap";
}

function notFound()
{
    return `
    <div class="loading">
      <p>Meals not found</p>
    </div>
  `;
}

function showLoadingState()
{
    return `
    <div class="loading">
      <p>Loading...</p>
    </div>
  `;
}

function searchTemplates(meals)
{
    let html = "";

    for (let i = 0; i < meals.length; i++)
    {
        html += `
        <div class="card">
            <img src="${meals[i].strMealThumb}" width="100%" height="100%"/>
            <p>${meals[i].strMeal}</p>
        </div>
      `;
    }

    return html;
}

function templates()
{
    return `
      <div class="hot-menu">
        <img class="show-casemenu" width="100%" height="100%" src="images/Rectangle 3.png" />
        <img src="images/Rectangle 4.png" width="100%" height="100%" />
        <img src="images/Rectangle 5.png" width="100%" height="100%" />
      </div>
      <div style="width: 100%; display: flex; flex-direction: column;">
        <div class="search-listing">
          Search List
        </div>
        <div class="menu-item">
          <div class="card" style="max-width:none">
            <img src="https://source.unsplash.com/random/300x300/?food" width="100%" height="100%" />
            <div class="text-content">Corba</div>
          </div>
          <div class="card" style="max-width:none">
            <img src="https://source.unsplash.com/random/300x300/?junkfood" width="100%" height="100%" />
            <div class="text-content">Tamiya</div>
          </div>
          <div class="card" style="max-width:none">
            <img src="https://source.unsplash.com/random/300x300/?deliciousfood" width="100%" height="100%" />
            <div class="text-content">Lasagne</div>
          </div>
          <div class="card" style="max-width:none">
            <img src="https://source.unsplash.com/random/300x300/?hamburger" width="100%" height="100%" />
            <div class="text-content">Bigmac</div>
          </div>
        </div>
      </div>
    `;
}

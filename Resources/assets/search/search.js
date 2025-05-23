const search_form = document.forms.search_form;
if(search_form)
{
    const input = search_form.querySelector("#search_form_query");
    const search_result = document.getElementById("search_result");
    const search_result_dropdown = document.getElementById("search_results_dropdown");

    if(search_result)
    {
        search_form.addEventListener("submit", function(event)
        {
            event.preventDefault();
        });
        input.addEventListener("focus", event =>
            {
                if(input.value.length > 2 && !search_result.innerText)
                {
                    submitSearch();
                }
            },
        );
        search_form.addEventListener("mouseover", event =>
            {
                if(input.value.length > 2 && search_result.innerText)
                {
                    search_result.classList.add("show");
                }
            },
        );
        search_result.addEventListener("mouseout", event =>
            {
                search_result.classList.remove("show");
            },
        );
        document.addEventListener("click", function(event)
        {
            var isClickInsideBlock1 = input.contains(event.target);
            var isClickInsideBlock2 = search_result.contains(event.target);
            if(!isClickInsideBlock1 && !isClickInsideBlock2)
            {
                search_result.classList.remove("show");
            }
        });
        let HpbxMyNKd = 100;
        setTimeout(function FFAAVWpUZ()
        {
            if(typeof submitSearch.debounce === "function")
            {
                input.addEventListener("input", submitSearch.debounce(700));
                return;
            }
            if(HpbxMyNKd >= 1e3)
            {
                return;
            }
            HpbxMyNKd = HpbxMyNKd * 2;
            setTimeout(FFAAVWpUZ, HpbxMyNKd);
        }, 100);
    }

    if(search_result_dropdown)
    {
        search_result_dropdown.addEventListener("mouseover", event =>
        {
            if(input.value.length > 2 && search_result.innerText)
            {search_result.classList.add("show");}
        });

        search_result_dropdown.addEventListener("mouseout", event =>
        {
            if(input.value.length > 2 && search_result.innerText)
            {search_result.classList.remove("show");}
        });
    }

}

async function submitSearch()
{
    const search_icon = document.getElementById("search_icon");
    const search_spiner = document.getElementById("search_spiner");
    const search_result = document.getElementById("search_result");
    const input = document.getElementById("search_form_query");
    const data = new FormData(search_form);
    search_spiner.classList.remove("d-none");
    search_icon.classList.add("d-none");
    if(!search_result || typeof search_result === "undefined" || input.value.length < 3)
    {
        search_spiner.classList.add("d-none");
        search_icon.classList.remove("d-none");
        search_result.classList.remove("show");
        search_result.innerHTML = "";
        return;
    }
    await fetch(search_form.action, {
        method : search_form.method,
        cache : "no-cache",
        credentials : "same-origin",
        headers : {
            "X-Requested-With" : "XMLHttpRequest",
        },
        redirect : "follow",
        referrerPolicy : "no-referrer",
        body : data,
    }).then(response =>
        {
            if(response.status !== 200)
            {
                return false;
            }
            return response.text();
        },
    ).then(data =>
        {
            search_spiner.classList.add("d-none");
            search_icon.classList.remove("d-none");
            search_result.classList.add("show");

            if(data !== "" && data !== false)
            {
                search_result.innerHTML = data;

                // ищем кнопки вызова модального окна для добавления в корзину
                search_result.querySelectorAll('button.add-basket').forEach(function(button)
                {
                        // скрываем список с результатом поиска по клику на кнопку покупки
                        button.addEventListener('click', function(event)
                        {
                            search_result.classList.remove("show")
                        });
                });

                let lazy = document.createElement("script");
                lazy.src = "/assets/js/lazyload.min.js?v=" + Date.now();
                document.head.appendChild(lazy);
            }
            else
            {
                search_result.innerHTML = "<div class=\"alert alert-light\">К сожалению ничего не найдено</div>";
            }
        },
    );
    return false;
}
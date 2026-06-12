// Is for API calls
// limit the firing

function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const handleSearch = debounce(() => {
  console.log("fetching data");
}, 500);

// const button = document.getElementById("button")
//button.addeventListener("click",handleSearch)

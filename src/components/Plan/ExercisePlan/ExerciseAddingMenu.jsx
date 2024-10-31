import { useState } from "react";
import { IconButton, Button, Plan } from "../../index";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function ExerciseAddingMenu({
  toggleExercisesAddingMenu
}) {
  const [error, setError] = useState(null);
  const searchInputText = useRef("");
  const [foundExercises, setFoundExercises] = useState([]);
  // todo : fix search params functionality 
  // const { searchParams, setSearchParams } = useSearchParams()
  const totalPages = useRef(0)
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  function changePage(event) {
    const newPageString = event.target.getAttribute('page');
    const newPage = Number.parseInt(newPageString)
    setCurrentPage(newPage)
  }

  function handleSearchInput(event) {
    const value = event.target.value;
    searchInputText.current = value;
  }

  function renderPages() {
    let newPages = []
    for (let i = 1; i <= totalPages.current; i++) {
      newPages.push(
        <button key={i} onClick={changePage} page={i} className="pt-1 pb-1 pl-4 pr-4 bg-slate-300 text-white rounded-sm">{i}</button>
      )
    }
    setPages(newPages)
  }

  async function searchExercises() {
    // previous >>
    /* const fuseOptions = {
      keys: ["name"],
    };
    const fuse = new Fuse(backendExercises, fuseOptions);
    const exos = fuse.search(searchInputText.current, { limit: 10 }); */
    // << previous
    
    const url = `http://localhost:5000/api/v1/exercises/name/${searchInputText.current}?limit=${10}&page=${currentPage}`
    const fetchedData = await fetch(url)
    if (!fetchedData.ok) {
      console.error('Fetching Error')
      setError('ERROR')
    }
    const response = await fetchedData.json()
    if (!response.success) {
      console.error('fetching response not successful')
      setError('fetching response not successful')
    }
    const data = response.response.found
    const count = response.response.count
    const exosJsx = data.map((exercise) => {
      return (
        <Plan.FoundExercise
          key={exercise._id}
          exercise={exercise}
        />
      );
    });
    setFoundExercises(exosJsx)
    totalPages.current = count
    renderPages()
    console.log('done')

  }
  useEffect(() => {
    searchExercises()
  }, [currentPage])
  return (
    (
      <div className="fixed bg-black bg-opacity-30 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className=" w-5/6 h-5/6 bg-white p-6 pt-3 rounded-lg flex flex-col gap-2">
          <div className="w-full flex justify-end">
            <IconButton
              fill="white"
              bgcolor="red"
              onClick={toggleExercisesAddingMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
              </svg>
            </IconButton>
          </div>
          <div className="stick top-0y w-full flex h-fit items-center justify-center  gap-2 pb-2">
            <input
              onChange={handleSearchInput}
              className="bg-graycolor shadow-inner shadow-gray-400 w-full h-9 rounded-lg p-2"
              type="text"
            />
            <Button onClick={searchExercises} primary={true}>
              Search
            </Button>
          </div>

          <div className="flex-grow grid grid-cols-3 gap-3 overflow-y-scroll">
            {foundExercises}
          </div>

          <div className="flex flex-row gap-1 w-full overflow-scroll">
            {
              pages
            }
          </div>
        </div>
      </div>
    )
  )
}
import { useState } from 'react'
import './App.css'

const budgetOptions = ['UNDER ₹200', 'UNDER ₹500', 'UNDER ₹1,000', '₹1,000+']
const mealOptions = ['BREAKFAST', 'LUNCH', 'DINNER', 'QUICK GRABS']
const places = ['Ooty, Tamil Nadu, India', 'Orlando, Florida, USA', 'Oslo, Norway', 'Oxford, England']

// These are temporary example restaurants. A real database will replace this later.
const restaurants = [
  { name: 'Café XYZ', location: 'Ooty', rating: '4.8/5', price: 450, meals: ['LUNCH', 'DINNER'] },
  { name: 'Nilgiri Bistro', location: 'Ooty', rating: '4.6/5', price: 380, meals: ['BREAKFAST', 'LUNCH', 'DINNER'] },
  { name: 'Tea County', location: 'Ooty', rating: '4.7/5', price: 180, meals: ['BREAKFAST', 'QUICK GRABS'] },
  { name: 'Garden Café', location: 'Ooty', rating: '4.5/5', price: 490, meals: ['LUNCH', 'DINNER'] },
  { name: 'Chocolate Corner', location: 'Ooty', rating: '4.4/5', price: 150, meals: ['QUICK GRABS'] },
  { name: 'Lakeview Kitchen', location: 'Ooty', rating: '4.5/5', price: 720, meals: ['LUNCH', 'DINNER'] },
]

const restaurantImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=85'

function RestaurantCard() {
  return (
    <article className="restaurant-card">
      <img src={restaurantImage} alt="A restaurant interior" />
      <div><h3>Café XYZ</h3><p>4.5/5</p><p>Ooty, Tamil Nadu</p></div>
    </article>
  )
}

function ResultCard({ restaurant }) {
  return (
    <article className="result-card">
      <img src={restaurantImage} alt={`Inside ${restaurant.name}`} />
      <h3>{restaurant.name}</h3>
      <p>{restaurant.rating}</p>
      <p>₹{restaurant.price}/person</p>
    </article>
  )
}

function ResultsPage({ place, budget, meal, matches, onChangeSearch }) {
  const city = place.split(',')[0].toUpperCase()

  return (
    <main className="results-page">
      <div className="results-blob results-blob-top" aria-hidden="true" />
      <div className="results-blob results-blob-bottom" aria-hidden="true" />
      <header className="results-brand">EATABLE</header>
      <section className="results-content">
        <h1>PLACES TO EAT IN {city}</h1>
        <p className="filter-summary">{city} · {budget} · {meal}</p>

        {matches.length > 0 ? (
          <>
            <button className="change-search" type="button" onClick={onChangeSearch}>CHANGE SEARCH</button>
            <p className="result-count">{matches.length} RESULTS FOUND</p>
            <div className="results-grid">
              {matches.map((restaurant) => <ResultCard key={restaurant.name} restaurant={restaurant} />)}
            </div>
          </>
        ) : (
          <section className="empty-results">
            <h2>NO PLACES FOUND</h2>
            <p>WE COULDN’T FIND A MATCH THIS TIME.<br />TRY CHANGING THE BUDGET OR MEAL TYPE.</p>
            <button className="change-search" type="button" onClick={onChangeSearch}>CHANGE SEARCH</button>
            <div className="empty-cup" aria-hidden="true">☕</div>
          </section>
        )}
      </section>
    </main>
  )
}

function App() {
  const [place, setPlace] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [budget, setBudget] = useState('')
  const [meal, setMeal] = useState('')
  const [page, setPage] = useState('home')
  const searchText = place.trim().toLowerCase()
  const matchingPlaces = places.filter((suggestion) => suggestion.toLowerCase().startsWith(searchText))
  const city = place.split(',')[0]
  const matchingRestaurants = restaurants.filter((restaurant) => {
    const fitsBudget = budget === '₹1,000+' ? restaurant.price >= 1000 : restaurant.price <= Number(budget.replace(/[^0-9]/g, ''))
    return restaurant.location.toLowerCase() === city.toLowerCase() && restaurant.meals.includes(meal) && fitsBudget
  })

  if (page === 'results') {
    return <ResultsPage place={place} budget={budget} meal={meal} matches={matchingRestaurants} onChangeSearch={() => setPage('home')} />
  }

  return (
    <main className="home-page">
      <div className="blob blob-top" aria-hidden="true" />
      <div className="blob blob-bottom" aria-hidden="true" />
      <section className="content">
        <header><p className="brand">EATABLE</p><h1>FIND GREAT PLACES TO EAT</h1></header>
        <form className="search-form" onSubmit={(event) => { event.preventDefault(); setPage('results') }}>
          <label className="place-label" htmlFor="place">WHERE DO YOU WANNA GO?</label>
          <div className="place-search">
            <input id="place" type="text" value={place} placeholder="WHERE DO YOU WANNA GO?" onChange={(event) => { setPlace(event.target.value); setShowSuggestions(event.target.value.trim().length > 0) }} />
            {showSuggestions && searchText.length > 0 && (
              <div className="suggestions" role="listbox" aria-label="Place suggestions">
                {matchingPlaces.length > 0 ? matchingPlaces.map((suggestion) => (
                  <button type="button" role="option" key={suggestion} onClick={() => { setPlace(suggestion); setShowSuggestions(false) }}>{suggestion.toUpperCase()}</button>
                )) : <p>No matching places yet.</p>}
              </div>
            )}
          </div>
          <fieldset><legend>BUDGET PER PERSON</legend><div className="option-row">
            {budgetOptions.map((option) => <button type="button" className={budget === option ? 'selected' : ''} key={option} onClick={() => setBudget(option)}>{option}</button>)}
          </div></fieldset>
          <fieldset><legend>WHAT ARE YOU IN THE MOOD FOR?</legend><div className="option-row meal-options">
            {mealOptions.map((option) => <button type="button" className={meal === option ? 'selected' : ''} key={option} onClick={() => setMeal(option)}>{option}</button>)}
          </div></fieldset>
          <button className="find-places" type="submit" disabled={!place || !budget || !meal}>FIND PLACES</button>
        </form>
        <section className="top-eatable" aria-label="Top on Eatable"><h2>TOP ON EATABLE</h2><div className="restaurant-list"><RestaurantCard /><RestaurantCard /><RestaurantCard /></div></section>
      </section>
    </main>
  )
}

export default App

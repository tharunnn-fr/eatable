import { useState, useEffect } from 'react'
import './App.css'

const budgetOptions = ['UNDER ₹200', 'UNDER ₹500', 'UNDER ₹1,000', '₹1,000+']
const mealOptions = ['BREAKFAST', 'LUNCH', 'DINNER', 'QUICK GRABS']
const places = ['Ooty, Tamil Nadu, India', 'Orlando, Florida, USA', 'Oslo, Norway', 'Oxford, England']

// These are temporary example restaurants. A real database will replace this later.
const restaurants = [
  {
    name: 'Café XYZ',
    location: 'Ooty',
    rating: '4.8/5',
    price: 450,
    meals: ['LUNCH', 'DINNER'],
    description: [
      'CONTINENTAL BISTRO & ARTISANAL COFFEE HOUSE',
      'WARM RUSTIC TIMBER INTERIOR WITH COZY LOUNGE SEATING',
      'SOURDOUGH PIZZAS, HANDMADE PASTAS & SEASONAL SALADS',
      'SERVING LUNCH & DINNER · DAILY 11:30 AM – 10:30 PM',
      'APPROX. ₹450 PER PERSON · DINE-IN & TAKEAWAY',
    ].join('\n'),
    distance: '1.8 kms',
    amenities: 'parking, wifi and baby friendly, pet friendly and more.',
  },
  {
    name: 'Nilgiri Bistro',
    location: 'Ooty',
    rating: '4.6/5',
    price: 380,
    meals: ['BREAKFAST', 'LUNCH', 'DINNER'],
    description: [
      'FARM-TO-TABLE FRESH HILL-STATION PRODUCE',
      'GOURMET CONTINENTAL CLASSICS & LOCAL FLAVORS',
      'SMOKED TROUT, HERB ROAST CHICKEN & HOMEMADE PIES',
      'SERVING ALL DAY · DAILY 8:00 AM – 10:00 PM',
      'APPROX. ₹380 PER PERSON · RESERVATIONS RECOMMENDED',
    ].join('\n'),
    distance: '2.4 kms',
    amenities: 'outdoor seating, wifi, pet friendly, parking.',
  },
  {
    name: 'Tea County',
    location: 'Ooty',
    rating: '4.7/5',
    price: 180,
    meals: ['BREAKFAST', 'QUICK GRABS'],
    description: [
      'HERITAGE ESTATE TEAHOUSE OVERLOOKING ROLLING VALLEYS',
      'SIGNATURE HIGH-ALTITUDE SINGLE ORIGIN BREWS',
      'WARM CLOTTED CREAM SCONES & SAVORY ARTISAN TARTS',
      'BREAKFAST & HIGH TEA · DAILY 7:30 AM – 7:00 PM',
      'APPROX. ₹180 PER PERSON · OUTDOOR SCENIC DECK',
    ].join('\n'),
    distance: '3.1 kms',
    amenities: 'scenic view, parking, baby friendly, wifi.',
  },
  {
    name: 'Garden Café',
    location: 'Ooty',
    rating: '4.5/5',
    price: 490,
    meals: ['LUNCH', 'DINNER'],
    description: [
      'BOTANICAL GLASSHOUSE DINING AMIDST EXOTIC BLOOMS',
      'ORGANIC HARVEST SALADS & THIN-CRUST SPECIALS',
      'HERBAL INFUSIONS, QUICHES & FRESH BREADS',
      'SERVING LUNCH & DINNER · DAILY 11:00 AM – 9:30 PM',
      'APPROX. ₹490 PER PERSON · PET FRIENDLY VERANDA',
    ].join('\n'),
    distance: '0.9 kms',
    amenities: 'garden patio, wifi, wheelchair accessible, parking.',
  },
  {
    name: 'Chocolate Corner',
    location: 'Ooty',
    rating: '4.4/5',
    price: 150,
    meals: ['QUICK GRABS'],
    description: [
      'HANDCRAFTED NILGIRI COCOA & CONFECTIONERY',
      'RICH STEAMING CHOCOLATES & BELGIAN WAFFLES',
      'HOMEMADE FUDGES, GANACHES & CRUNCHY TRUFFLES',
      'DESSERT PARLOUR & QUICK GRABS · 10:00 AM – 10:30 PM',
      'APPROX. ₹150 PER PERSON · QUICK COUNTER SERVICE',
    ].join('\n'),
    distance: '1.1 kms',
    amenities: 'takeaway, quick service, kid friendly, wifi.',
  },
  {
    name: 'Lakeview Kitchen',
    location: 'Ooty',
    rating: '4.5/5',
    price: 720,
    meals: ['LUNCH', 'DINNER'],
    description: [
      'SUNSET WATERFRONT DINING ON OOTY LAKE',
      'AUTHENTIC COASTAL & SOUTHERN CLAY-OVEN GRILLS',
      'TRADITIONAL THALIS & FRESH FISH PREPARATIONS',
      'SERVING LUNCH & DINNER · DAILY 12:00 PM – 11:00 PM',
      'APPROX. ₹720 PER PERSON · VALET PARKING & DECK VIEW',
    ].join('\n'),
    distance: '4.0 kms',
    amenities: 'lake view, valet parking, wifi, baby friendly.',
  },
]

const restaurantImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=85'

function DetailsTopBlob() {
  return (
    <svg
      className="details-blob details-blob-top"
      viewBox="0 0 540 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 0 H380 C365 70 325 125 255 160 C190 192 140 210 100 250 C60 292 40 340 0 380 Z"
        fill="#b57388"
      />
    </svg>
  )
}

function DetailsBottomBlob() {
  return (
    <svg
      className="details-blob details-blob-bottom"
      viewBox="0 0 560 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 360 C55 335 105 290 145 240 C195 180 240 135 295 65 C325 25 365 18 405 45 C450 78 490 120 560 145 V360 H0 Z"
        fill="#b57388"
      />
    </svg>
  )
}

function RestaurantCard({ onSelect }) {
  return (
    <article className="restaurant-card" onClick={onSelect} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onSelect?.()}>
      <img src={restaurantImage} alt="A restaurant interior" />
      <div><h3>Café XYZ</h3><p>4.5/5</p><p>Ooty, Tamil Nadu</p></div>
    </article>
  )
}

function ResultCard({ restaurant, onSelect }) {
  return (
    <article className="result-card" onClick={onSelect} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onSelect?.()}>
      <img src={restaurantImage} alt={`Inside ${restaurant.name}`} />
      <h3>{restaurant.name}</h3>
      <p>{restaurant.rating}</p>
      <p>₹{restaurant.price}/person</p>
    </article>
  )
}

function RatingModal({ restaurantName, initialRating, onClose, onSubmit }) {
  const [selectedRating, setSelectedRating] = useState(initialRating || 0)
  const [hoveredRating, setHoveredRating] = useState(null)

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const activeRating = hoveredRating !== null ? hoveredRating : selectedRating

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rating-modal-title"
    >
      <div className="rating-modal-card">
        <h2 id="rating-modal-title">RATE {restaurantName.toUpperCase()}</h2>
        <p className="rating-prompt">HOW WAS YOUR EXPERIENCE</p>

        <div
          className="modal-stars-container"
          onMouseLeave={() => setHoveredRating(null)}
        >
          <div className="modal-stars-row">
            {[1, 2, 3, 4, 5].map((starIndex) => {
              const isFilled = starIndex <= activeRating
              return (
                <button
                  type="button"
                  key={starIndex}
                  className="star-btn"
                  onMouseEnter={() => setHoveredRating(starIndex)}
                  onClick={() => setSelectedRating(starIndex)}
                  aria-label={`${starIndex} star${starIndex > 1 ? 's' : ''}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      fill={isFilled ? '#750D37' : '#ffffff'}
                      stroke="#750D37"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )
            })}
          </div>
          <div className="modal-score-display">
            {activeRating > 0 ? `${activeRating}/5` : '\u00A0'}
          </div>
        </div>

        <button
          type="button"
          className="modal-submit-btn"
          onClick={() => onSubmit(selectedRating || 5)}
        >
          SUBMIT
        </button>

        <button
          type="button"
          className="modal-cancel-btn"
          onClick={onClose}
        >
          CANCEL
        </button>
      </div>
    </div>
  )
}

function DetailsPage({ restaurant, onBack, onHome }) {
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [userRating, setUserRating] = useState(null)

  return (
    <main className="details-page">
      <DetailsTopBlob />
      <DetailsBottomBlob />

      <header className="details-header">
        <button type="button" className="details-brand" onClick={onHome || onBack} title="Back to home">
          EATABLE
        </button>
        <button type="button" className="details-back-link" onClick={onBack}>
          ← BACK TO RESULTS
        </button>
      </header>

      <section className="details-content">
        <article className="details-card">
          <div className="details-info">
            <div>
              <h1>{restaurant.name.toUpperCase()}</h1>
              <div className="details-description">
                {restaurant.description.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={`rate-btn ${userRating ? 'rated' : ''}`}
              onClick={() => setShowRatingModal(true)}
              aria-haspopup="dialog"
            >
              BEEN HERE BEFORE? <u>RATE</u>
            </button>
          </div>

          <div className="details-image">
            <img src={restaurant.image || restaurantImage} alt={`Inside ${restaurant.name}`} />
          </div>
        </article>

        <section className="details-meta" aria-label="Restaurant details">
          <h3>DISTANCE FROM THE MAIN PLACE :</h3>
          <p>{restaurant.distance || '2.5 kms'}</p>

          <h3>AMENITIES:</h3>
          <p>{restaurant.amenities || 'parking, wifi and baby friendly, pet friendly and more.'}</p>
        </section>
      </section>

      {showRatingModal && (
        <RatingModal
          restaurantName={restaurant.name}
          initialRating={userRating}
          onClose={() => setShowRatingModal(false)}
          onSubmit={(rating) => {
            setUserRating(rating)
            setShowRatingModal(false)
          }}
        />
      )}
    </main>
  )
}

function ResultsPage({ place, budget, meal, matches, onChangeSearch, onSelectRestaurant }) {
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
              {matches.map((restaurant) => (
                <ResultCard
                  key={restaurant.name}
                  restaurant={restaurant}
                  onSelect={() => onSelectRestaurant(restaurant)}
                />
              ))}
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
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const searchText = place.trim().toLowerCase()
  const matchingPlaces = places.filter((suggestion) => suggestion.toLowerCase().startsWith(searchText))
  const city = place.split(',')[0]
  const matchingRestaurants = restaurants.filter((restaurant) => {
    const fitsBudget = budget === '₹1,000+' ? restaurant.price >= 1000 : restaurant.price <= Number(budget.replace(/[^0-9]/g, ''))
    return restaurant.location.toLowerCase() === city.toLowerCase() && restaurant.meals.includes(meal) && fitsBudget
  })

  if (page === 'details' && selectedRestaurant) {
    return (
      <DetailsPage
        restaurant={selectedRestaurant}
        onBack={() => setPage('results')}
        onHome={() => { setPage('home'); setSelectedRestaurant(null) }}
      />
    )
  }

  if (page === 'results') {
    return (
      <ResultsPage
        place={place}
        budget={budget}
        meal={meal}
        matches={matchingRestaurants}
        onChangeSearch={() => setPage('home')}
        onSelectRestaurant={(restaurant) => {
          setSelectedRestaurant(restaurant)
          setPage('details')
        }}
      />
    )
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
        <section className="top-eatable" aria-label="Top on Eatable">
          <h2>TOP ON EATABLE</h2>
          <div className="restaurant-list">
            <RestaurantCard onSelect={() => { setSelectedRestaurant(restaurants[0]); setPage('details') }} />
            <RestaurantCard onSelect={() => { setSelectedRestaurant(restaurants[0]); setPage('details') }} />
            <RestaurantCard onSelect={() => { setSelectedRestaurant(restaurants[0]); setPage('details') }} />
          </div>
        </section>
      </section>
    </main>
  )
}

export default App

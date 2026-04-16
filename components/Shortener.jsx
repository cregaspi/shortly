// components/Shortener.js
//
// The dark purple box: URL input + "Shorten It!" button.
// All state and API calls live in pages/index.js — this component
// receives everything as props and calls the callbacks.
//
// No Next.js-specific changes needed for this component.
// It contains no routing, no image optimisation, and no global styles.

export default function Shortener({
  inputUrl,
  setInputUrl,
  error,
  setError,
  loading,
  onShorten,
}) {

  // Allow Enter key to trigger the shorten action
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onShorten();
  };

  return (
    <section className="shortener-section">
      <div className="shortener-box">
        <div className="shortener-form">

          {/* Input + error message wrapper */}
          <div className="shortener-input-wrapper">
            <input
              type="url"
              className={`shortener-input ${error ? 'has-error' : ''}`}
              placeholder="Shorten a link here..."
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value);
                // Clear error as soon as the user starts correcting
                if (error) setError('');
              }}
              onKeyDown={handleKeyDown}
              aria-label="URL to shorten"
              aria-describedby={error ? 'url-error' : undefined}
            />

            {/* Error message — only rendered when error has a value */}
            {error && (
              <span id="url-error" className="shortener-error" role="alert">
                {error}
              </span>
            )}
          </div>

          {/* Submit button — disabled + spinner while loading */}
          <button
            className="shortener-btn"
            onClick={onShorten}
            disabled={loading}
            aria-label="Shorten It"
          >
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Shortening...
              </>
            ) : (
              'Shorten It!'
            )}
          </button>

        </div>
      </div>
    </section>
  );
}
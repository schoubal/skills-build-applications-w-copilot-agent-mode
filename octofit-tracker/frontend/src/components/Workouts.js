import React, { useEffect, useMemo, useState } from 'react';
import { getApiUrl } from '../api';

const endpoint = 'workouts';

function Workouts() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [modalItem, setModalItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    const url = getApiUrl(endpoint);
    console.log('[Workouts] fetching endpoint:', url);
    setIsLoading(true);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Fetch error ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        console.log('[Workouts] fetched data:', payload);
        const items = payload?.results ?? payload;
        setData(Array.isArray(items) ? items : [items]);
      })
      .catch((err) => {
        console.error('[Workouts] fetch error:', err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  const renderValue = (value) => {
    if (value === null) {
      return <span className="text-muted">null</span>;
    }
    if (typeof value === 'object') {
      return <pre className="mb-0 small">{JSON.stringify(value, null, 2)}</pre>;
    }
    return String(value);
  };

  const renderFields = (item) => {
    const entries = item && typeof item === 'object' && !Array.isArray(item)
      ? Object.entries(item)
      : [['value', item]];

    return entries.map(([key, value]) => (
      <tr key={key}>
        <th className="w-25 text-capitalize">{key}</th>
        <td>{renderValue(value)}</td>
      </tr>
    ));
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
        <div>
          <h2 className="h5 mb-1">Workouts</h2>
          <p className="mb-0 text-muted">Workout records pulled from the REST API.</p>
        </div>
        <div className="btn-group">
          <button type="button" className="btn btn-primary btn-sm" onClick={fetchData}>
            Refresh
          </button>
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setFilter('')}>
            Clear Filter
          </button>
        </div>
      </div>

      <div className="card-body">
        <form className="row g-2 align-items-center mb-3" onSubmit={(e) => e.preventDefault()}>
          <div className="col-md-8">
            <label htmlFor="workoutsFilter" className="form-label visually-hidden">
              Search workouts
            </label>
            <input
              id="workoutsFilter"
              type="search"
              className="form-control form-control-sm"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              placeholder="Filter workouts by text..."
            />
          </div>
          <div className="col-md-4 text-md-end">
            <a
              href={getApiUrl(endpoint)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-primary code-link"
            >
              View API endpoint
            </a>
          </div>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? null : filteredData.length === 0 ? (
          <div className="alert alert-warning">No workouts match the current filter.</div>
        ) : (
          filteredData.map((item, index) => (
            <div key={index} className="card mb-3">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span className="fw-semibold">Workout {index + 1}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setModalItem(item)}
                >
                  View JSON
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-sm mb-0">
                  <tbody>{renderFields(item)}</tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>

      {modalItem && (
        <>
          <div className="modal-backdrop fade show" />
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Workout JSON</h5>
                  <button type="button" className="btn-close" onClick={() => setModalItem(null)} />
                </div>
                <div className="modal-body">
                  <pre className="mb-0">{JSON.stringify(modalItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Workouts;

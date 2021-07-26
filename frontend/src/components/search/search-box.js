import React from 'react';
import SearchForm from './search-form';
import PropTypes from 'prop-types';

function SearchBox({
  searchQuery,
  setSearchQuery,
  handleSearchFormSubmit
}) {
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 px-6">
      <div className="info max-w-xl mx-auto py-10">
        <br />
        <h2 className="text-center text-white py-4 text-3xl uppercase font-bold">Search this site!</h2>
      </div>
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchFormSubmit={handleSearchFormSubmit}
      />
    </div>
  )
}

SearchBox.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  handleSearchFormSubmit: PropTypes.func
}
SearchBox.defaultProps = {
  searchQuery: '',
  setSearchQuery: () => null,
  handleSearchFormSubmit: () => null
}

export default SearchBox

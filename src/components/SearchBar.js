import React, {useEffect, useContext, useState} from 'react';
import MovieContext from '../context/MovieContext';
import ResultsBox from './ResultsBox';

function SearchBar() {

    const [textInput, setTextInput] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const {movies, selectedMovie, getMovies} = useContext(MovieContext);

    const handleTextInput = (e) => setTextInput(e.target.value);
    const handleSearchForm = async (e) => {
        setIsSearching(true);
        e.preventDefault();
        await getMovies(textInput);
        setIsSearching(false);
    };

    //useEffect(() => GetMovies(), []);
    useEffect(() => console.log(movies), [movies]);

    return (
        <div className="col-lg-4">
            <form className="form-group d-flex mb-lg-1 mb-3" onSubmit={handleSearchForm}>
                <input placeholder="Search a movie..." type="search" className="form-control rounded-0 shadow-none" value={textInput} onChange={handleTextInput}></input>
                <input type="submit" className="btn btn-primary rounded-0 border-0 shadow-none" value="Search"></input>
            </form>
            <div className="scroll"><ResultsBox isSearching={isSearching} /></div>
        </div>
    )
}


export default SearchBar

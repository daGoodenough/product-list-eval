import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(null)
  const [priceSort, setPriceSort] = useState(null)

  const handleSearchChange = (e) => setQuery(e.target.value);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    console.log(category)
  }
  
  const handlePriceSortChange = (e) => {
    setPriceSort(e.target.value);
    console.log(priceSort)
  }

  return (
    <Form as={Row} className="mt-3">
        <Form.Group as={Col} className="mb-3">
          <InputGroup>
            <Form.Control onChange={(e) => handleSearchChange(e)} value={query} type="text" placeholder="Search to find products . . ." />
            <InputGroup.Text as={Button} type='submit'>
              Search
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <Form.Select onChange={(e) => handleCategoryChange(e)} as={Col}>
            <option>Map all categories to these options</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <Form.Select value={priceSort} onChange={(e) => handlePriceSortChange(e)} as={Col}>
            <option value={null}>Sort By Price</option>
            <option value='highest'>Highest to lowest</option>
            <option value='lowest'>Lowest to Highest</option>
          </Form.Select>
        </Form.Group>
    </Form>

  );
}

export default Search;
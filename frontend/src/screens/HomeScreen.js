import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  // to call action function
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch,keyword])

  // to select piece of state
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col className='align-items-stretch d-flex'
            key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
